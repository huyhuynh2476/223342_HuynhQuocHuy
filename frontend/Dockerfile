# Giai đoạn 1: Build ứng dụng React (Vite)
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Giai đoạn 2: Sử dụng Nginx để phục vụ file tĩnh và cấu hình định tuyến SPA cho React
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Tạo cấu hình Nginx trực tiếp để tránh lỗi trắng trang khi load đường dẫn con
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]