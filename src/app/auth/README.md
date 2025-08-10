# Auth Component

Component xử lý đăng nhập và đăng ký cho ứng dụng WebGuardian Security Scanner.

## Tính năng

- **Đăng nhập**: Form đăng nhập với email và mật khẩu
- **Đăng ký**: Form đăng ký với tên người dùng, email, mật khẩu và xác nhận mật khẩu
- **Giao diện**: Thiết kế tương đồng với chủ đề bảo mật của ứng dụng
- **Responsive**: Tương thích với mọi kích thước màn hình
- **Validation**: Kiểm tra dữ liệu đầu vào cơ bản
- **Loading states**: Hiển thị trạng thái đang xử lý

## Sử dụng

```typescript
import { AuthComponent } from './auth';

// Thêm vào component cần thiết
@Component({
  imports: [AuthComponent],
  template: '<app-auth></app-auth>'
})
```

## Thiết kế

- Màu chủ đạo: Blue (#3b82f6)
- Nền: Dark gradient (#0f172a to #1e293b)
- Font: Segoe UI
- Icon: 🛡️ (Shield icon)
- Hiệu ứng: Blur backdrop, shadows, smooth transitions

## Tính năng an toàn

- Mã hóa dữ liệu form
- Validation mật khẩu tối thiểu 6 ký tự
- Xác nhận mật khẩu khi đăng ký
- Thông báo bảo mật cho người dùng
