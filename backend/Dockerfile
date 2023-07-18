FROM node:14.5.0-alpine

WORKDIR "/usr/app"

COPY ./package*.json ./
RUN npm install

COPY ./ ./

EXPOSE 5000

CMD ["npm","run","server"]