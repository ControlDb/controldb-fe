FROM node:12.18.1-alpine3.9
RUN mkdir -p /usr/src/app && cd /usr/src/app
COPY ./client/ /usr/src/app
WORKDIR /usr/src/app
RUN npm install
RUN npm run build
CMD ["npm", "run", "dev"]