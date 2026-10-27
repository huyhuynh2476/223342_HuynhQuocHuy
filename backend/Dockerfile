# Sử dụng Image chính thức của Node.js phiên bản LTS
FROM node:18-alpine

# Thiết lập thư mục làm việc bên trong container
WORKDIR /app

# Sao chép package.json và package-lock.json (nếu có)
COPY package*.json ./

# Cài đặt các thư viện sản xuất (production dependencies)
RUN npm install --production

# Sao chép toàn bộ mã nguồn backend vào container
COPY . .

# Khai báo cổng mà ứng dụng sẽ lắng nghe
EXPOSE 5000

# Lệnh khởi chạy ứng dụng khi container bắt đầu chạy
CMD ["node", "server.js"]