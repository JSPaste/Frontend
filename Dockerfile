FROM --platform=$BUILDPLATFORM docker.io/oven/bun:1-alpine AS builder-www
WORKDIR /build/

COPY . ./

# Vite requires Node.js on build process
RUN apk add --no-cache go go-task nodejs
RUN go-task install-www build-www

FROM --platform=$BUILDPLATFORM docker.io/library/golang:1.24-alpine AS builder-server
WORKDIR /build/

# TODO: Uncomment when CI updates to buildah >=v1.38.0
#COPY --from=builder-www /build/www/dist/ ./www/dist/
#COPY --from=builder-www /build/www/bundle.go ./www/bundle.go
#COPY --from=builder-www --exclude=./www/ /build/. ./
COPY --from=builder-www /build/. ./

ARG TARGETOS
ARG TARGETARCH

RUN apk add --no-cache go-task
RUN GOOS=${TARGETOS} GOARCH=${TARGETARCH} go-task install-server build-server

FROM --platform=$BUILDPLATFORM docker.io/library/alpine:3.21
WORKDIR /frontend/

RUN addgroup jspaste && \
    adduser -G jspaste -u 7777 -s /bin/false -D jspaste && \
    chown jspaste:jspaste /frontend/

COPY --chown=jspaste:jspaste --from=builder-server /build/dist/server ./
COPY --chown=jspaste:jspaste --from=builder-server /build/LICENSE ./

LABEL org.opencontainers.image.url="https://jspaste.eu" \
      org.opencontainers.image.source="https://github.com/jspaste/frontend" \
      org.opencontainers.image.title="@jspaste/frontend" \
      org.opencontainers.image.description="The frontend for JSPaste" \
      org.opencontainers.image.licenses="EUPL-1.2"

USER jspaste:jspaste

EXPOSE 3000

ENV JSPF_BIND_ADDRESS=[::]

ENTRYPOINT ["/frontend/server"]