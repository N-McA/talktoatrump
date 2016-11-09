FROM node:argon
RUN mkdir /app
WORKDIR /app
COPY app/package.json .
RUN npm install
COPY app/src src
CMD node src/app.js 
