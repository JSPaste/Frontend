FROM --platform=$BUILDPLATFORM docker.io/oven/bun:1-alpine AS builder-www

RUN apk add --no-cache go go-task

WORKDIR /build/
COPY . ./

RUN go-task install-www build-www

FROM --platform=$BUILDPLATFORM docker.io/library/golang:1.24-alpine AS builder-server

RUN apk add --no-cache go-task

WORKDIR /build/
COPY --from=builder-www /build/. ./

ARG TARGETOS
ARG TARGETARCH

RUN GOOS=${TARGETOS} GOARCH=${TARGETARCH} go-task install-server build-server

RUN addgroup jspaste \
 && adduser -G jspaste -u 7777 -s /bin/false -D jspaste \
 && grep jspaste /etc/passwd > /tmp/.frontend.passwd

FROM --platform=$BUILDPLATFORM scratch

COPY --from=builder-server /tmp/.frontend.passwd /etc/passwd
COPY --from=builder-server /etc/group /etc/group

WORKDIR /frontend/
COPY --chown=jspaste:jspaste --from=builder-server /build/dist/server ./
COPY --chown=jspaste:jspaste --from=builder-server /build/LICENSE ./

LABEL org.opencontainers.image.created="0001-01-01T00:00:00Z" \
      org.opencontainers.image.description="The web based editor for JSPaste" \
      org.opencontainers.image.licenses="EUPL-1.2" \
      org.opencontainers.image.revision="unspecified" \
      org.opencontainers.image.source="https://github.com/jspaste/frontend" \
      org.opencontainers.image.title="jspaste-frontend" \
      org.opencontainers.image.url="https://github.com/jspaste/frontend" \
      org.opencontainers.image.version="unspecified"

EXPOSE 3000

USER jspaste:jspaste

ENTRYPOINT ["/frontend/server"]