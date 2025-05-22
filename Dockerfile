# builder stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
COPY . .
RUN npm i
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]