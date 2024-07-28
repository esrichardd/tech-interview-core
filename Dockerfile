FROM node:21

WORKDIR /usr/src/tech-interview-core

COPY . .

RUN yarn install

EXPOSE 3000

#yarn start:dev
CMD ["yarn", "start:dev"]