FROM docker.io/oven/bun:1-alpine AS builder
WORKDIR /build/

COPY . ./

RUN bun install --production --frozen-lockfile && \
    bun run build:bundle

FROM docker.io/oven/bun:1-distroless
WORKDIR /frontend/

COPY --chown=nonroot --from=builder /build/dist/prod/ ./
COPY --chown=nonroot --from=builder /build/LICENSE ./

LABEL org.opencontainers.image.url="https://jspaste.eu" \
      org.opencontainers.image.source="https://github.com/jspaste/frontend" \
      org.opencontainers.image.title="@jspaste/frontend" \
      org.opencontainers.image.description="The frontend for JSPaste" \
      org.opencontainers.image.documentation="https://docs.jspaste.eu" \
      org.opencontainers.image.licenses="EUPL-1.2"

EXPOSE 3000

CMD ["index.js"]