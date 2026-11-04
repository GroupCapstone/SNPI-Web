FROM node:22-alpine AS base
WORKDIR /app
ARG BACKEND_INTERNAL_URL=http://localhost:4000/api/v1
ENV BACKEND_INTERNAL_URL=${BACKEND_INTERNAL_URL}
COPY package.json package-lock.json ./

FROM base AS development
ENV NODE_ENV=development
ENV APP_ENV=development
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]

FROM development AS build
ARG APP_ENV=production
ARG BACKEND_INTERNAL_URL
ENV NODE_ENV=production
ENV APP_ENV=${APP_ENV}
ENV BACKEND_INTERNAL_URL=${BACKEND_INTERNAL_URL}
ENV DOCKER_BUILD=true
RUN npm run build

FROM node:22-alpine AS production
WORKDIR /app
ARG APP_ENV=production
ARG BACKEND_INTERNAL_URL
ENV NODE_ENV=production
ENV APP_ENV=${APP_ENV}
ENV BACKEND_INTERNAL_URL=${BACKEND_INTERNAL_URL}
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
USER node
EXPOSE 3000
CMD ["node", "server.js"]
