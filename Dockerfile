# Required to build the standalone locally before building the image container: "bun run build:standalone"
FROM docker.io/oven/bun:1-alpine AS builder
WORKDIR /build/

COPY . ./

RUN bun install --production --no-save vike

FROM docker.io/oven/bun:1-distroless
WORKDIR /frontend/

COPY --chown=nonroot --from=builder /build/dist ./
COPY --chown=nonroot --from=builder /build/node_modules ./node_modules
COPY --chown=nonroot --from=builder /build/bunfig.toml ./
COPY --chown=nonroot --from=builder /build/LICENSE ./

LABEL org.opencontainers.image.url="https://jspaste.eu" \
      org.opencontainers.image.source="https://github.com/jspaste/frontend" \
      org.opencontainers.image.title="@jspaste/frontend" \
      org.opencontainers.image.description="The frontend for JSPaste" \
      org.opencontainers.image.documentation="https://docs.jspaste.eu" \
      org.opencontainers.image.licenses="EUPL-1.2"

EXPOSE 3000

CMD ["server.js"]