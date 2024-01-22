# Builder
FROM docker.io/library/node:20-slim AS builder
WORKDIR /build/

COPY . ./

RUN corepack enable
RUN pnpm install --frozen-lockfile --ignore-scripts
RUN NEXT_OUTPUT=standalone pnpm run build

# Runner
FROM gcr.io/distroless/nodejs20-debian12:nonroot AS runner

COPY ./public ./public
COPY --from=builder /build/.next/standalone ./
COPY --from=builder /build/.next/static ./.next/static

EXPOSE 3000/tcp
CMD ["server.js"]