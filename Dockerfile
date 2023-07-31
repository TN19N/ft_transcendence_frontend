FROM node:18.17.0-alpine3.18

RUN apk ypdate && apk add --no-cache git

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build
CMD npm run prod

