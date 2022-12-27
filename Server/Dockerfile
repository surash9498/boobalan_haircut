FROM ubuntu:latest
WORKDIR /app
RUN apt-get update
RUN apt-get upgrade
RUN curl-sL https://deb.nodesource.com/setup_18.x  | bash -
RUN apt-get -y install nodejs
RUN apt-get install mongodb
RUN npm install yarn
COPY ./ package.json.
COPY ./ yarn.lock. 
RUN yarn install
COPY . .
VOLUME ["/data/db"]
CMD ["./exec.sh"]
EXPOSE 5000 27017

