FROM node:18 AS build

WORKDIR /app


COPY package*.json ./


RUN npm install


RUN npm install prisma --save-dev


COPY . .


RUN npx prisma generate


EXPOSE 3000


CMD ["npm", "run", "dev"]
