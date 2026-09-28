# 5W1H — AI & Tương Lai Việc Làm

Dự án học tập trực quan hóa khung tư duy **5W1H** (What – Why – Who – When – Where – How) nhằm mổ xẻ và phân tích nhận định:

> *“Hiện nay với sự phát triển AI, tôi nghĩ vài năm tới nhiều cơ hội việc làm sẽ mất.”*

Dự án được chuẩn hóa cho **GitHub Pages** không cần build step, đồng thời hỗ trợ **chạy trực tiếp offline** bằng cách double-click file HTML (`file://`).

---

## 🌟 Hai Phiên Bản Sơ Đồ Tư Duy Tương Tác

Repo tích hợp 2 trang sơ đồ tư duy độc lập với 2 phong cách tiếp cận và công nghệ khác nhau:

### 1. Bản Phân Tích Đa Chiều & Trình Chiếu (`interactive_5w1h_ai_mindmap.html`)
- **Công nghệ:** Tailwind CSS (CDN), Vanilla JavaScript.
- **Tính năng nổi bật:**
  - **Không gian Mindmap 2D:** Canvas tự do hỗ trợ Kéo (Pan), Cuộn (Zoom) và đường kết nối Bezier SVG tự động thích ứng vị trí các thẻ.
  - **3 Chế độ hiển thị:**
    - `Mindmap`: Khám phá sơ đồ tư duy phân nhánh trực quan.
    - `Ma trận 6 Nhánh`: Lưới thẻ tổng hợp theo 6 chiều 5W1H.
    - `Cây phân cấp`: Dạng danh mục accordion đóng/mở đa tầng.
  - **Chế độ Thuyết trình (Slide Mode):** Tự động điều hướng và phóng to từng nhánh theo trình tự logic giúp trình bày bài thuyết trình/slide mượt mà.
  - **Tìm kiếm thời gian thực:** Tra cứu nhanh từ khóa (clerical, upskilling, WEF...) với hiệu ứng phát sáng highlight.
  - **Trích xuất nhanh:** Sao chép toàn bộ tóm tắt luận điểm hoặc từng nhánh cụ thể vào clipboard.

### 2. Bản Dữ Liệu Thống Kê & Biểu Đồ (`interactive_5w1h_ai_mindmap_1.html`)
- **Công nghệ:** CSS thuần hiện đại (CSS Variables), Chart.js 4.4.3 (CDN), Font Be Vietnam Pro.
- **Tính năng nổi bật:**
  - **Sơ đồ SVG thu gọn/mở rộng:** Cấu trúc nhánh cây SVG phân bố 2 bên với nút bấm `＋ / −` linh hoạt, hiệu ứng chuyển động entry animation đẹp mắt.
  - **Bảng KPI động:** Hoạt ảnh số liệu tăng dần (`requestAnimationFrame`) từ các báo cáo quốc tế.
  - **4 Biểu đồ phân tích dữ liệu chuyên sâu (Chart.js):**
    1. *Việc làm toàn cầu đến 2030:* Mất đi (92M) vs Tạo mới (170M) vs Tăng ròng (+78M).
    2. *Mức độ phơi nhiễm theo nhóm nền kinh tế:* Phát triển (60%), Toàn cầu (40%), Mới nổi (40%), Thu nhập thấp (26%), Việt Nam (20.8%).
    3. *Tốc độ phổ cập người dùng:* Số tháng đạt 100 triệu người dùng (ChatGPT: 2 tháng vs TikTok: 9 tháng, Instagram: 30 tháng).
    4. *Tỷ lệ lao động cần đào tạo lại:* Doughnut chart 59% cần reskilling trước 2030.
  - **Danh mục nghề suy giảm nhanh nhất** theo WEF và 3 kết luận tổng hợp vĩ mô.

---

## 🚀 Hướng Dẫn Chạy Cục Bộ (Local Setup)

Dự án là trang tĩnh 100% (Pure Static Site), không yêu cầu cài đặt `npm`, `node_modules` hay bất kỳ build step nào.

### Cách 1: Mở trực tiếp (Double-click `file://`)
Chỉ cần nhấp đúp trực tiếp vào file bất kỳ từ trình quản lý file:
- Mở [index.html](file:///c:/Users/Hoang%20Nam/Downloads/Antigravity%20Code/5W1H/index.html) để truy cập cổng điều hướng.
- Hoặc mở trực tiếp [interactive_5w1h_ai_mindmap.html](file:///c:/Users/Hoang%20Nam/Downloads/Antigravity%20Code/5W1H/interactive_5w1h_ai_mindmap.html) / [interactive_5w1h_ai_mindmap_1.html](file:///c:/Users/Hoang%20Nam/Downloads/Antigravity%20Code/5W1H/interactive_5w1h_ai_mindmap_1.html).

> **Lưu ý kỹ thuật:** Mọi dữ liệu đã được đóng gói dưới dạng file JavaScript `.js` truyền thống nạp qua thẻ `<script>`, tuyệt đối không dùng `fetch()` cục bộ nên không bị chặn bởi chính sách CORS khi mở từ ổ đĩa.

### Cách 2: Chạy qua Local Web Server
Nếu muốn chạy qua HTTP server:
```bash
# Sử dụng Python 3 tích hợp sẵn
python -m http.server 8000

# Hoặc sử dụng Node.js (nếu có npx)
npx serve .
```
Sau đó truy cập trình duyệt tại địa chỉ `http://localhost:8000`.

---

## 📂 Cấu Trúc Thư Mục

```text
5W1H/
├── .editorconfig                          # Chuẩn hóa format: UTF-8, LF, 2 spaces
├── .gitignore                             # Danh sách loại trừ file tạm
├── README.md                              # Tài liệu dự án tiếng Việt
│
├── index.html                             # Cổng chào điều hướng trung tâm (Landing Hub)
├── interactive_5w1h_ai_mindmap.html       # Trang 1: Mindmap trực quan & Trình chiếu
├── interactive_5w1h_ai_mindmap_1.html     # Trang 2: Sơ đồ tư duy & Phân tích số liệu
│
├── css/
│   ├── mindmap-tailwind-custom.css        # CSS tùy biến thanh cuộn & hiệu ứng cho Trang 1
│   └── mindmap-charts.css                 # CSS giao diện tối ưu độc lập cho Trang 2
│
└── js/
    ├── data-mindmap-overview.js           # Dữ liệu học thuật 5W1H Trang 1 (window.MINDMAP_DATA)
    ├── mindmap-overview.js                # Logic tương tác Canvas, Pan/Zoom, Search, Slide Trang 1
    ├── data-mindmap-charts.js             # Dữ liệu & Nguồn trích dẫn Trang 2 (SRC, ROOT, BRANCHES)
    └── mindmap-charts.js                  # Logic vẽ SVG, Chart.js, KPI Counter, Drawer Trang 2
```

---

## 📊 Nguồn Số Liệu & Báo Cáo Học Thuật

Tất cả số liệu trong dự án được trích dẫn nguyên văn từ các ấn phẩm chính thống:

| Tổ chức / Báo cáo | Năm | Nội dung trích dẫn chính |
| :--- | :---: | :--- |
| **WEF** (World Economic Forum) — *Future of Jobs Report* | 2025 | 92M việc làm bị thay thế vs 170M việc làm mới (+78M việc làm ròng); 22% xáo trộn thị trường; 59% lao động cần đào tạo lại trước 2030; 77% doanh nghiệp ưu tiên reskilling nội bộ. |
| **IMF** (International Monetary Fund) — *Gen-AI Report* | 2024 | ~40% việc làm toàn cầu chịu ảnh hưởng; ~60% ở các nền kinh tế phát triển; 40% ở nền kinh tế mới nổi; 26% ở các nước thu nhập thấp. |
| **ILO** (International Labour Organization) — *GenAI Update* | 2025 | 1/4 lao động toàn cầu phơi nhiễm GenAI (chủ yếu là biến đổi cách làm việc); 3.3% ở mức phơi nhiễm cực cao. Tại Việt Nam: 20.8% việc làm phơi nhiễm (~11.5 triệu người; Nữ 24.1% vs Nam 17.8%); ~1.8% có nguy cơ thay thế trực tiếp. |
| **Goldman Sachs** — *Research Insights* | 2023 | 300 triệu việc làm toàn thời gian toàn cầu phơi nhiễm tự động hóa; GenAI có thể nâng GDP toàn cầu thêm 7%. |
| **McKinsey Global Institute** | 2023 | GenAI đóng góp 2.6 – 4.4 nghìn tỷ USD hàng năm; 60–70% thời gian làm việc có thể tự động hóa; tới 30% giờ làm việc tại Mỹ có thể tự động hóa vào 2030. |
| **Challenger, Gray & Christmas** | 2024–2025 | Báo cáo sa thải tại Mỹ; >27.000 ca cắt giảm việc làm viện dẫn lý do AI. |
| **UBS / Visual Capitalist** | 2023 | Tốc độ tăng trưởng: ChatGPT đạt 100 triệu người dùng chỉ sau 2 tháng (so với TikTok 9 tháng, Instagram 30 tháng). |

---

## 🤝 Đóng Góp (Contributing)

1. Fork repository và tạo nhánh mới: `git checkout -b feature/cap-nhat-so-lieu`
2. Đảm bảo tuân thủ `.editorconfig` (sử dụng LF, UTF-8).
3. **Quy tắc bảo toàn dữ liệu:** Mọi cập nhật số liệu cần đính kèm link báo cáo chính thức và trích dẫn trang tài liệu cụ thể.
4. Kiểm tra trang chạy bình thường trên cả `file://` và web server trước khi tạo Pull Request.
