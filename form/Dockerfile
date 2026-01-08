FROM node:18-alpine AS build

WORKDIR /app

COPY form/package.json form/package-lock.json ./

RUN npm install

COPY form/src ./src
COPY form/public ./public

RUN npm run build

FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/build ./build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
