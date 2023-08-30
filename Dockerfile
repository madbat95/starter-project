# https://wkrzywiec.medium.com/build-and-run-angular-application-in-a-docker-container-b65dbbc50be8

### STAGE 1: Build ###
FROM node:18.10.0-bullseye AS build
WORKDIR /app
RUN node --version
RUN npm --version
COPY package.json package-lock.json ./
# RUN npm install
RUN npm ci 
COPY . .
RUN npm link @angular/cli
RUN npm run build 

### STAGE 2: Run ###
FROM nginx:1.23.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/seo /usr/share/nginx/html

#commands
#0 change url in environments file
#1 docker build -t rankwin/seo_tool_frontend:dev .

#2 docker push rankwin/seo_tool_frontend:dev
#3 docker pull rankwin/seo_tool_frontend:dev
#4 docker run --name angular -d -p 4200:80 rankwin/seo_tool_frontend:dev

