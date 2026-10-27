# Giai đoạn 1: Build ứng dụng React (Vite)
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY index.html ./
COPY vite.config.js ./
COPY src ./src
COPY public ./public
RUN npm run build

# Giai đoạn 2: Sử dụng Nginx để phục vụ tĩnh file build
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]