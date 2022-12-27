

// FROM node:18-alpine
// WORKDIR /app
// COPY ./package.json . 
// COPY ./yarn.lock . 
// RUN yarn install 
// COPY . .
// RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/community' >> /etc/apk/repositories
// RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.8/main' >> /etc/apk/repositories
// RUN apk update
// RUN apk add mongodb=4.0.5-r0
// VOLUME ["/data/db"]
// CMD  [ "./exec.sh" ]
// EXPOSE 5000 27017


