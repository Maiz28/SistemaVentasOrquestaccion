
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build -- --configuration production --base-href /

FROM nginx:stable-alpine

COPY --from=build /app/dist/sistema-centas-app/browser /usr/share/nginx/html

#COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]  