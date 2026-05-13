# =========================
# Etapa 1: build (vite)
# =========================
FROM node:22-alpine AS build
WORKDIR /usr/src/app

RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

COPY tsconfig.json tsconfig.base.json tsconfig.app.json tsconfig.node.json tsconfig.vitest.json ./
COPY vite.config.ts index.html ./
COPY src/ ./src

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

ARG VITE_MF_NAME=mf-template
ENV VITE_MF_NAME=${VITE_MF_NAME}

RUN pnpm run build

# =========================
# Etapa 2: runtime (nginx)
# =========================
FROM nginx:1.29-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN chown -R nginx:nginx \
      /usr/share/nginx/html \
      /var/cache/nginx \
      /var/run \
      /var/log/nginx \
      /etc/nginx/conf.d \
      /run \
    && touch /run/nginx.pid \
    && chown nginx:nginx /run/nginx.pid

EXPOSE 8081

USER nginx
STOPSIGNAL SIGQUIT
CMD ["nginx", "-g", "daemon off;"]
