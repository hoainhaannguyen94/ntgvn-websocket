#! nodejs
FROM node:latest
WORKDIR /app
# COPY package.json .
# COPY package-lock.json .
# RUN npm i
COPY . .
EXPOSE 80
EXPOSE 443
CMD ["node", "index.mjs"]
