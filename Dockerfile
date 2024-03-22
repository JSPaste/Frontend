# Builder
FROM cgr.dev/chainguard/bun:latest-dev AS builder

COPY . ./

RUN bun install --production --frozen-lockfile && \
    NEXT_OUTPUT=standalone bun run build

# Runner
FROM cgr.dev/chainguard/bun:latest

COPY --chown=nonroot --from=builder /src/public ./public
COPY --chown=nonroot --from=builder /src/.next/standalone ./
COPY --chown=nonroot --from=builder /src/.next/static ./.next/static

LABEL org.opencontainers.image.url="https://jspaste.eu" \
      org.opencontainers.image.source="https://github.com/jspaste/frontend" \
      org.opencontainers.image.title="jspaste-frontend" \
      org.opencontainers.image.description="The frontend for JSPaste, built with Bun and Next.js" \
      org.opencontainers.image.documentation="https://docs.jspaste.eu" \
      org.opencontainers.image.licenses="EUPL-1.2"

EXPOSE 3000/tcp

CMD ["server.js"]