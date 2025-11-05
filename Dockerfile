FROM --platform=$BUILDPLATFORM docker.io/library/alpine:latest AS builder

RUN set -euxo pipefail; \
  apk add --no-cache curl libstdc++; \
  curl https://mise.run | sh; \
  ln -s $HOME/.local/bin/mise /usr/bin/mise

WORKDIR /build/
COPY . ./

RUN set -euxo pipefail; \
  mise trust; \
  mise run build:frontend:compress

ARG TARGETOS
ARG TARGETARCH

RUN set -euxo pipefail; \
  GOOS=${TARGETOS} GOARCH=${TARGETARCH} mise run build:server

FROM --platform=$BUILDPLATFORM scratch AS frontend

COPY <<EOF /etc/group
root:*:0:
nobody:*:65534:
EOF

COPY <<EOF /etc/passwd
root:*:0:0:root:/frontend/:
nobody:*:65534:65534:nobody:/frontend/:
EOF

WORKDIR /frontend/
COPY --chown=65534:65534 --from=builder /build/dist/server ./
COPY --chown=65534:65534 --from=builder /build/LICENSE ./

LABEL org.opencontainers.image.created="0001-01-01T00:00:00Z" \
  org.opencontainers.image.description="The web based editor for JSPaste" \
  org.opencontainers.image.licenses="EUPL-1.2" \
  org.opencontainers.image.revision="unspecified" \
  org.opencontainers.image.source="https://github.com/jspaste/frontend" \
  org.opencontainers.image.title="jspaste-frontend" \
  org.opencontainers.image.url="https://github.com/jspaste/frontend" \
  org.opencontainers.image.version="unspecified"

EXPOSE 3000

USER 65534:65534

ENTRYPOINT ["/frontend/server"]
