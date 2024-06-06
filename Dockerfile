FROM docker.io/oven/bun:1-alpine AS builder
WORKDIR /build/

COPY . ./

RUN bun install --production --frozen-lockfile && \
    bun install --global serve@14 && \
    bun run build:static

FROM docker.io/oven/bun:1-distroless
WORKDIR /frontend/

COPY --chown=nonroot --from=builder /root/.bun/install/global/node_modules/ ./node_modules/
COPY --chown=nonroot --from=builder /build/out/ ./out/
COPY --chown=nonroot --from=builder /build/LICENSE ./
COPY --chown=nonroot --from=builder /build/serve.json ./

LABEL org.opencontainers.image.url="https://jspaste.eu" \
      org.opencontainers.image.source="https://github.com/jspaste/frontend" \
      org.opencontainers.image.title="@jspaste/frontend" \
      org.opencontainers.image.description="The frontend for JSPaste" \
      org.opencontainers.image.documentation="https://docs.jspaste.eu" \
      org.opencontainers.image.licenses="EUPL-1.2"

EXPOSE 3000

CMD ["node_modules/serve/build/main.js", "-L", "-u", "-n", "-l", "tcp://0.0.0.0:3000"]