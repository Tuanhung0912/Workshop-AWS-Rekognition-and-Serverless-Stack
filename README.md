# AI Vision Lab - Frontend

Đây là giao diện frontend cho dự án AI Vision Lab, cho phép người dùng upload ảnh và xem kết quả phân tích AI.

## 🚀 Hướng dẫn cài đặt & khởi chạy

### 1. Clone project về máy
Sử dụng terminal và chạy các lệnh sau:
```bash
git clone https://github.com/<your-username>/rekognition-frontend.git
cd rekognition-frontend
```

### 2. Cài đặt Node.js (nên dùng Node.js >= 16)
Bạn có thể tải trực tiếp từ [Node.js](https://nodejs.org/) hoặc cài qua terminal:

#### a. Dùng nvm (khuyên dùng)
- **Trên Windows:**
  - Tải [nvm-windows](https://github.com/coreybutler/nvm-windows/releases), cài đặt và mở terminal:
    ```bash
    nvm install 18
    nvm use 18
    ```
- **Trên macOS/Linux:**
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    # Đóng/mở lại terminal, sau đó:
    nvm install 18
    nvm use 18
    ```

Kiểm tra phiên bản:
```bash
node -v
npm -v
```

### 3. Cài đặt dependencies
```bash
npm install
```

### 4. Cập nhật Vite (nếu cần)
Bạn có thể cập nhật Vite lên phiên bản mới nhất bằng lệnh:
```bash
npm install vite@latest --save-dev
```
Hoặc nếu dùng yarn:
```bash
yarn add vite@latest --dev
```

### 5. Khởi chạy project
```bash
npm run dev
```

Sau đó, mở trình duyệt và truy cập địa chỉ được in ra (thường là http://localhost:5173).

---

## 📝 Một số lệnh hữu ích
- **Build production:**
  ```bash
  npm run build
  ```
- **Preview production build:**
  ```bash
  npm run preview
  ```

## 📦 Công nghệ sử dụng
- React + Vite
- Material UI

## 📄 Thông tin thêm
- Nếu gặp lỗi về cổng (port) hoặc quyền truy cập, hãy kiểm tra lại firewall hoặc thử đổi port.
- Nếu muốn kết nối với backend, hãy chỉnh sửa endpoint API trong file `src/App.jsx`.

---

> © 2024 AI Vision Lab. All rights reserved.
