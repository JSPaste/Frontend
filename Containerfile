# Builder
FROM docker.io/library/node:20-slim AS builder
WORKDIR /build/

COPY . ./

RUN corepack enable
RUN pnpm install -P --frozen-lockfile --ignore-scripts
RUN NEXT_OUTPUT=standalone pnpm run build

# Runner
FROM gcr.io/distroless/nodejs20-debian12:nonroot AS runner

COPY --from=builder /build/public ./public
COPY --from=builder /build/.next/standalone ./
COPY --from=builder /build/.next/static ./.next/static

LABEL org.opencontainers.image.version="experimental"
LABEL org.opencontainers.image.title="JSP-Frontend"
LABEL org.opencontainers.image.description="undefined"
LABEL org.opencontainers.image.url="https://jspaste.eu"
LABEL org.opencontainers.image.documentation="https://docs.jspaste.eu"
LABEL org.opencontainers.image.licenses="EUPL-1.2"
LABEL org.opencontainers.image.source="https://github.com/jspaste/jsp-frontend"

EXPOSE 3000/tcp

CMD ["server.js"]