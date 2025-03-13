FROM --platform=$BUILDPLATFORM docker.io/oven/bun:1-alpine AS builder-www
WORKDIR /build/

COPY . ./

RUN apk add --no-cache go go-task
RUN go-task install-www build-www

FROM --platform=$BUILDPLATFORM docker.io/library/golang:1.24-alpine AS builder-server
WORKDIR /build/

COPY --from=builder-www /build/. ./

RUN apk add --no-cache go-task

ARG TARGETOS
ARG TARGETARCH

RUN GOOS=${TARGETOS} GOARCH=${TARGETARCH} go-task install-server build-server

RUN addgroup jspaste && \
    adduser -G jspaste -u 7777 -s /bin/false -D jspaste && \
    grep jspaste /etc/passwd > /tmp/.frontend.passwd

FROM --platform=$BUILDPLATFORM scratch
WORKDIR /frontend/

COPY --from=builder-server /tmp/.frontend.passwd /etc/passwd
COPY --from=builder-server /etc/group /etc/group

USER jspaste:jspaste

COPY --chown=jspaste:jspaste --from=builder-server /build/dist/server ./
COPY --chown=jspaste:jspaste --from=builder-server /build/LICENSE ./

LABEL org.opencontainers.image.url="https://jspaste.eu" \
      org.opencontainers.image.source="https://github.com/jspaste/frontend" \
      org.opencontainers.image.title="JSPaste Frontend" \
      org.opencontainers.image.description="The frontend for JSPaste" \
      org.opencontainers.image.licenses="EUPL-1.2"

EXPOSE 3000

ENTRYPOINT ["/frontend/server"]