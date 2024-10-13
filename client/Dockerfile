###################
# BUILD FOR PRODUCTION
###################
FROM node:20 AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

###################
# PRODUCTION
###################
FROM nginx:1.26.2-alpine-slim AS production

COPY nginx.conf /etc/nginx/nginx.conf
COPY /ssl /usr/src/app/ssl

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]