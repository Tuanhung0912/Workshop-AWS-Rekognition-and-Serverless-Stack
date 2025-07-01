# AI Vision Lab - Frontend

Đây là giao diện frontend cho dự án AI Vision Lab, cho phép người dùng upload ảnh và xem kết quả phân tích AI.

## 🚀 Hướng dẫn cài đặt & khởi chạy

### 1. Cài đặt Node.js (nên dùng Node.js >= 16)
Bạn cần tải và cài đặt Node.js trực tiếp từ trang chủ:
- Truy cập: [https://nodejs.org/](https://nodejs.org/)
- Tải bản LTS phù hợp với hệ điều hành của bạn và tiến hành cài đặt.

Kiểm tra phiên bản sau khi cài đặt:
```bash
node -v
npm -v
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Cài đặt và cập nhật Vite
- Nếu bạn chưa có Vite toàn cục, cài đặt bằng lệnh:
```bash
npm install -g vite
```
- Để cập nhật Vite lên phiên bản mới nhất trong project:
```bash
npm install vite@latest --save-dev
```
Hoặc nếu dùng yarn:
```bash
yarn add vite@latest --dev
```

### 4. Cập nhật Node.js khi clone code về (nếu cần)
Nếu gặp lỗi do phiên bản Node.js quá thấp, hãy cập nhật Node.js lên bản mới nhất từ [https://nodejs.org/](https://nodejs.org/), sau đó kiểm tra lại:
```bash
node -v
npm -v
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
