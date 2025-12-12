# =========================
# Build stage
# =========================
FROM node:22-alpine AS build
WORKDIR /repo

# Native deps Strapi often needs (sharp/libvips etc.)
RUN apk add --no-cache \
  build-base gcc autoconf automake zlib-dev libpng-dev vips-dev \
  python3 git libc6-compat

# Use pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# ---- Cache-friendly installs (monorepo) ----
# Copy ONLY workspace manifests first
# (Dockerfile lives in apps/cms, but build context is repo root)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/cms/package.json ./apps/cms/
# If you have shared packages, also copy their package.json files for better caching:
# COPY packages/*/package.json ./packages/*/

# Install all workspace deps from lockfile
RUN pnpm install --frozen-lockfile

# Copy the whole repo
COPY . .

# Build ONLY the cms app
RUN pnpm --filter ./apps/cms build

# Create a pruned, production-only output for the cms app
# (code + dist + assets + production node_modules)
RUN pnpm --filter ./apps/cms deploy --prod /opt/app

# =========================
# Runtime stage
# =========================
FROM node:22-alpine AS runtime
WORKDIR /opt/app

# libvips for sharp at runtime
RUN apk add --no-cache vips-dev

ENV NODE_ENV=production

# Copy pruned app from build stage
COPY --from=build /opt/app ./

# Run as non-root
RUN addgroup -S strapi && adduser -S strapi -G strapi && chown -R strapi:strapi /opt/app
USER strapi

EXPOSE 1337

# Strapi v5: start via CLI (don’t point to a single dist/server.js)
CMD ["node", "node_modules/@strapi/strapi/bin/strapi.js", "start"]

