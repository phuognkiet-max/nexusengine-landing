# NexusEngine Website

Website giới thiệu NexusEngine, được viết bằng HTML, CSS và JavaScript tĩnh. Mã website nằm riêng tại `D:\App\NexusEngineWebsite`; không cần chạy hoặc thay đổi engine VietDubStudio / NPK Auto Sub.

## Nội dung và phạm vi

- Liên hệ qua `founder@nexusengine.id.vn` bằng liên kết email.
- Sản phẩm hiện tại là prototype desktop Windows; tích hợp Claude và xử lý video công khai trên web là kế hoạch phát triển.
- Hình minh họa workflow diễn tả các bước sản phẩm. Nó không phải dashboard xử lý video trực tiếp hoặc ảnh chụp giao diện prototype.
- Website không có form đăng ký, upload video hoặc dịch vụ gọi AI ở phía trình duyệt.
- Chỉ triển khai mã website và tài nguyên công khai. Không đưa `data/`, runtime, model, video riêng tư, khóa API hoặc bản sao lưu của engine vào deployment.

## Xem thử trên máy

Mở PowerShell tại thư mục website và chạy bằng Python đã cài:

```powershell
Set-Location -LiteralPath 'D:\App\NexusEngineWebsite'
python -m http.server 8080 --bind 127.0.0.1
```

Sau đó mở `http://127.0.0.1:8080` trong trình duyệt. Dùng `Ctrl+C` để dừng server. Nếu lệnh `python` không có trong PATH, dùng đường dẫn đến Python đang có trên máy.

## Triển khai

Có thể dùng lại repository và dự án Vercel của landing hiện tại. Sao chép mã website vào thư mục deployment của landing, kiểm tra bản preview, rồi cập nhật production theo cấu hình hiện có. Không gộp thư mục engine vào repository landing.

Bản đầu tiên đã triển khai trên `nexusengine.id.vn`. Bản mở rộng được chuẩn bị trên nhánh `nexusengine-product-hub` để kiểm tra preview trước khi cập nhật production.

## Bản mở rộng: product hub và field guide

- Demo minh họa tương tác bằng phụ đề viết sẵn (English, Vietnamese, Spanish), thanh timeline và SRT mẫu tải được. Demo không gọi AI, không upload và không phải kết quả chạy engine.
- Ba ảnh giao diện thật của desktop prototype dùng video test tổng hợp: nguồn, tách phụ đề và editor timeline. Ảnh không chứa khóa API hay media khách hàng.
- Ba trang kiến thức: `guide-localization.html`, `guide-subtitles.html`, `guide-voiceover.html`. Có mục lục, checklist sao chép và CSS cho in/lưu PDF.
- Thư viện bài viết có bộ lọc Strategy / Production; trang chủ bổ sung use cases, checklist chất lượng và liên hệ early access.
- `experience.css` và `experience.js` chứa phần mở rộng, tách khỏi mã landing ban đầu. `review/` là tài nguyên kiểm tra local và không được deploy.

Thông tin founder, khách hàng, tài trợ và trạng thái tích hợp cần phản ánh dữ kiện thực tế khi cập nhật website. Nội dung quyền riêng tư đề xuất được lưu tại `PRIVACY-COPY.md` và phải được đối chiếu lại nếu sau này thêm form, upload, analytics hoặc dịch vụ khác.
