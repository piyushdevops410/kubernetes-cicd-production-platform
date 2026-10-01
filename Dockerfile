FROM node:22-alpine

WORKDIR /app

COPY app/package*.json ./

RUN npm ci --omit=dev

COPY app/ .

ENV PORT=3000
ENV APP_VERSION=1.0.0
ENV ENVIRONMENT=production

EXPOSE 3000

USER node

CMD ["node", "server.js"]

