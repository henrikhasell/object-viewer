FROM node:latest AS build-env
WORKDIR /app
COPY gulpfile.js package.json ./
COPY ts ./ts
RUN npm install
RUN ./node_modules/.bin/gulp

FROM nginx:alpine
COPY index.html /usr/share/nginx/html
COPY models /usr/share/nginx/html/models
COPY --from=build-env /app/js /usr/share/nginx/html/js
