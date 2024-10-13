###################
# BUILD FOR PRODUCTION
###################
FROM node:20-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run prisma-generate

RUN npm run prod:build

USER node

###################
# PRODUCTION
###################
FROM node:20-alpine AS production

WORKDIR /usr/src/app

COPY --chown=node:node package*.json .

RUN npm ci

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/ssl ./ssl
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/waitdb.js ./waitdb.js

COPY --chown=node:node --from=build /usr/src/app/prisma ./prisma
# RUN npm install -g prisma
# Generate Prisma Client code
# RUN npx prisma generate

# CMD [ "npm", "run", "prod:start" ]
# CMD [ "npm", "run", "prod:migrate:start" ]
CMD [ "npm", "run", "docker:prod:migrate:start" ]