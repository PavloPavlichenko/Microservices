FROM node:19.0.0-alpine as build
WORKDIR /app

COPY package.json /app/package.json

RUN npm install --only=prod

COPY . /app

RUN npm run build

FROM nginx:1.23.2-alpine
COPY --from=build /app/build /usr/share/nginx/html/car-client