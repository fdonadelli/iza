# Estágio de desenvolvimento
FROM node:18 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g @nestjs/cli
RUN npm install

COPY . .

# Estágio de construção
FROM development AS build

RUN npm run build

# Estágio de produção
FROM node:18-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=build /usr/src/app/dist ./dist

USER node

CMD ["node", "dist/main"]
