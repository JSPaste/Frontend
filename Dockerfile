FROM docker.io/oven/bun:1-alpine AS builder
WORKDIR /build/

COPY . ./

RUN bun install --production --frozen-lockfile && \
    bun run build:standalone

FROM docker.io/oven/bun:1-distroless
WORKDIR /frontend/

COPY --chown=nonroot --from=builder /build/.next/standalone ./
COPY --chown=nonroot --from=builder /build/.next/static ./.next/static
COPY --chown=nonroot --from=builder /build/public ./public
COPY --chown=nonroot --from=builder /build/LICENSE ./

LABEL org.opencontainers.image.url="https://jspaste.eu" \
      org.opencontainers.image.source="https://github.com/jspaste/frontend" \
      org.opencontainers.image.title="@jspaste/frontend" \
      org.opencontainers.image.description="The frontend for JSPaste" \
      org.opencontainers.image.documentation="https://docs.jspaste.eu" \
      org.opencontainers.image.licenses="EUPL-1.2"

ENV HOSTNAME=127.0.0.1
ENV PORT=3000

EXPOSE 3000

CMD ["server.js"]