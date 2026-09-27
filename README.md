# VÙNG QUÊ — GỬI TRỌN HƯƠNG VỊ VIỆT (UNBOX VIETNAM)

> **Website E-commerce Quà Tặng & Đặc Sản Vùng Miền Thế Hệ Mới**  
> Kết hợp công nghệ **WebGL 3D (Three.js / React Three Fiber / Drei / GSAP)**, phong cách thiết kế **Vietnamese Contemporary Premium** và trải nghiệm thương mại điện tử mượt mà.

---

## 1. TỔNG QUAN DỰ ÁN

* **Thương hiệu:** Vùng Quê (Gửi trọn hương vị Việt)
* **Concept:** *"Unbox Vietnam"* — Mỗi hộp quà không chỉ là đặc sản, mà là cả một hành trình khám phá câu chuyện thổ nhưỡng, văn hóa bản địa và tình người sâu nặng của non sông Việt Nam.
* **Tech Stack:**
  * **Framework:** Next.js 14 (App Router, Server Components & Dynamic Client Modules)
  * **Ngôn ngữ:** TypeScript 5.7+
  * **UI Styling:** Tailwind CSS 3.4 (Hệ màu độc quyền: Dark Forest Green `#26372B`, Sage Green `#55634A`, Warm Cream `#F6F1E7`, Terracotta `#C97955`, Antique Gold `#B9955A`)
  * **Typography:** `Playfair Display` (Serif Editorial) kết hợp `Be Vietnam Pro` (Sans-serif tiếng Việt chuẩn mực)
  * **3D & WebGL Engine:** `Three.js`, `@react-three/fiber`, `@react-three/drei`
  * **Animation & Motion:** GSAP 3.12, RequestAnimationFrame Easing Engine, Canvas Confetti
  * **Icons:** `lucide-react`

---

## 2. KIẾN TRÚC THƯ MỤC CHUẨN MỰC

```text
vung-que-box-qua/
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # Root layout (Google Fonts, CartProvider, Header, Footer)
│   ├── page.tsx                   # Homepage với 9 cinematic sections
│   ├── shop/                      # Cửa hàng lọc đa tiêu chí (Vùng miền, Phân loại, Giá, Search)
│   ├── products/[slug]/           # Chi tiết sản phẩm với 3D Unboxing Box Viewer
│   ├── regions/                   # Khám phá 6 vùng đất (Đà Lạt, Tây Ninh, Tây Bắc, Miền Tây, Huế, Phú Quốc)
│   │   └── [slug]/                # Chi tiết vùng miền kèm danh mục box thuộc vùng
│   ├── build-your-box/            # Configurator: Tự tay tạo box (Chọn hộp, chọn món, viết thiệp)
│   ├── cart/                      # Trang giỏ hàng đầy đủ & tính phí ship
│   ├── checkout/                  # Trang thanh toán (COD, VietQR, Thẻ quốc tế)
│   ├── order-success/             # Trang chúc mừng với hiệu ứng mở hộp quà & pháo hoa confetti
│   ├── about/                     # Câu chuyện thương hiệu, nguồn nguyên liệu, 4 cam kết
│   ├── blog/                      # Tạp chí ẩm thực & cẩm nang quà quê
│   │   └── [slug]/                # Chi tiết bài ký sự
│   ├── not-found.tsx              # Trang 404 tùy biến
│   ├── sitemap.ts                 # Dynamic SEO Sitemap generator
│   └── robots.ts                  # Robots.txt
├── components/
│   ├── 3d/                        # WebGL 3D System (R3F)
│   │   ├── BoxScene.tsx           # Canvas container, responsive FOV & tooltip hover
│   │   ├── DynamicBoxScene.tsx    # Dynamic import ssr: false với Skeleton Fallback
│   │   ├── BoxScene25D.tsx        # 2.5D CSS Perspective fallback cho thiết bị nhẹ
│   │   ├── BoxModel.tsx           # Mô hình 3D hộp quà nắp mở, khay gỗ, ruy băng vàng
│   │   ├── FoodItem3D.tsx         # Object 3D từng món ăn (Pouch, Jar, Tin, Fruit) + quỹ đạo bay
│   │   ├── FoodItems3D.tsx        # Nhóm quản lý món ăn với timing thác nước (stagger)
│   │   ├── CameraRig.tsx          # Parallax camera theo con trỏ chuột mượt mà (lerp)
│   │   ├── SceneLighting.tsx      # Ánh sáng studio, bóng đổ mềm & rim light kim ngân
│   │   └── FloatingParticles3D.tsx# Hạt bụi phấn vàng & lá thảo mộc lơ lửng 3 chiều
│   ├── cart/                      # Cart slide-over drawer
│   ├── common/                    # Floating contact (Hotline, Zalo, Messenger)
│   ├── layout/                    # Sticky Header, Footer
│   └── product/                   # ProductDetailClient
├── sections/                      # Các section trang chủ
│   ├── HeroSection.tsx            # Hero 3D tương tác + "Đồ ăn bay vào box"
│   ├── RegionExplorerSection.tsx  # Bản đồ 6 vùng miền tương tác
│   ├── ProductShowcaseSection.tsx # 1 box lớn + 3 box nhỏ + Quick View modal
│   ├── BuildYourBoxTeaser.tsx     # Teaser quy trình 3 bước tự tạo box
│   ├── BrandStorySection.tsx      # Timeline hành trình từ đồi chè đến bàn trà
│   ├── WhyChooseUsSection.tsx     # 4 giá trị đặc sản
│   ├── CinematicVideoSection.tsx  # Teaser video unboxing
│   ├── SocialProofSection.tsx     # Khách hàng mở hộp (UGC)
│   └── JournalPreviewSection.tsx  # Ký sự mới nhất
├── hooks/
│   └── useProduct3DTransition.ts  # Bộ điều khiển 6 giai đoạn animation sản phẩm
├── lib/
│   ├── cartContext.tsx            # Giỏ hàng lưu trữ LocalStorage, mã giảm giá, Freeship
│   └── utils.ts                   # Định dạng tiền tệ VND, class merger
├── data/
│   ├── products.ts                # Dữ liệu 8+ sản phẩm mẫu đầy đủ thông số 3D
│   ├── customBoxItems.ts          # Mẫu hộp, món lẻ, mẫu thiệp cho Configurator
│   └── articles.ts                # Bài viết tạp chí văn hóa & cẩm nang
└── public/images/                 # Cấu trúc thư mục asset chuẩn bị sẵn cho Banana AI
```

---

## 3. HƯỚNG DẪN KHỞI CHẠY DỰ ÁN

### Yêu cầu môi trường:
* Node.js v18.18 trở lên (khuyến nghị v20+)
* npm v9+

### Các lệnh thực thi:

```bash
# Cài đặt các gói phụ thuộc (nếu chưa cài)
npm install

# Chạy môi trường phát triển (Development)
npm run dev

# Mở trình duyệt tại:
http://localhost:3000

# Kiểm tra chất lượng mã nguồn
npm run lint

# Biên dịch sản phẩm (Production Build)
npm run build

# Chạy bản đã biên dịch
npm run start
```

---

## 4. QUY TRÌNH TẠO ẢNH BẰNG BANANA MODEL & TRANSPARENT PNG PIPELINE

Dự án đã chuẩn bị sẵn bộ prompt studio photography chi tiết và chuyên sâu trong tài liệu:
👉 **[`BANANA-ASSET-PROMPTS.md`](./BANANA-ASSET-PROMPTS.md)**

### Cấu trúc Asset trong thư mục `/public/images/`:
* **Hộp quà:**
  * `/public/images/boxes/{region}/box-open.png`: Hộp mở góc 45°, bên trong có khay rơm kraft lót sẵn.
  * `/public/images/boxes/{region}/box-closed.png`: Hộp đóng nắp thắt ruy băng trang trọng.
* **Từng món đặc sản đơn lẻ (Isolated Transparent PNG):**
  * `/public/images/foods/da-lat/hong-say.png`
  * `/public/images/foods/da-lat/tra-atiso.png`
  * `/public/images/foods/da-lat/mut-dau.png`
  * `/public/images/foods/da-lat/cafe.png`
  * *(và tương tự cho Tây Ninh, Tây Bắc, Miền Tây, Cố Đô Huế, Phú Quốc)*

### Pipeline hoạt động:
```text
BANANA MODEL PROMPT
       ↓
ẢNH CHỤP STUDIO CHÂN THẬT
       ↓
TÁCH NỀN TRONG SUỐT (PNG / WebP)
       ↓
LƯU VÀO /public/images/foods/[vung]/[ten-mon].png
       ↓
REACT THREE FIBER DYNAMIC TEXTURE & 3D TRAJECTORY
("Đồ ăn bay vào box" theo đường cong Bezier, xoay lật & đổ bóng tiếp xúc)
```

Bạn chỉ cần lưu ảnh đúng tên file vào thư mục tương ứng là web sẽ tự động render hiệu ứng 3D chân thực ngay lập tức!

---

## 5. HƯỚNG DẪN THAY THẾ 3D MODEL (GLB/GLTF) THẬT

Hệ thống 3D được thiết kế theo nguyên tắc **Plug-and-Play**:
* Hiện tại hệ thống tự động sinh ra procedural 3D meshes chất lượng cao (Hộp nắp mở gập, hũ thủy tinh có nắp vàng, gói snack bế mép, khay gỗ, quả sấy dẻo) với đầy đủ vật liệu PBR, độ nhám (roughness), ánh kim (metalness) và bóng đổ mềm.
* Khi bạn có mô hình `.glb` thật (tạo từ Blender / Spline / 3D scan):

1. Đặt file `.glb` vào thư mục `/public/models/` (ví dụ: `/public/models/dalat-box.glb`, `/public/models/hong-say.glb`).
2. Trong `data/products.ts`, chỉ định thuộc tính `modelPath`:
```typescript
{
  id: "prod-dalat-01",
  // ...
  items3D: [
    {
      id: "item-hong-say",
      name: "Hồng Sấy Dẻo Cao Cấp",
      modelPath: "/models/hong-say.glb", // <-- Thêm đường dẫn tại đây
      // Toàn bộ quỹ đạo bay, easing và tương tác giữ nguyên hoàn hảo!
    }
  ]
}
```

---

## 6. HƯỚNG DẪN THÊM SẢN PHẨM MỚI

Mở file `data/products.ts` và thêm một đối tượng `Product`:

```typescript
{
  id: "prod-moi-09",
  slug: "box-qua-moi",
  name: "Box Quà Mới",
  subName: "Đặc sản tuyển chọn",
  shortDescription: "Mô tả ngắn gọn về hương vị và trải nghiệm...",
  description: "Mô tả chi tiết...",
  story: "Câu chuyện vùng đất...",
  price: 550000,
  region: "da-lat", // "da-lat" | "tay-ninh" | "tay-bac" | "mien-tay" | "hue" | "phu-quoc"
  regionName: "Đà Lạt",
  category: "dac-san",
  theme: {
    boxColor: "#2F3D2C",
    lidColor: "#222B20",
    ribbonColor: "#B9955A",
    accentColor: "#C97955",
    atmosphereColor: "#374635",
    bgGradient: "radial-gradient(ellipse at center, rgba(85,99,74,0.3) 0%, rgba(38,55,43,0.95) 100%)",
    textColor: "#FFFDF8",
  },
  items3D: [
    {
      id: "item-1",
      name: "Tên Món Ăn",
      entryDirection: "left", // "left" | "right" | "top" | "bottom" | "behind"
      position: [-0.65, 0.25, 0.2],
      rotation: [-0.1, 0.4, -0.2],
      scale: 0.75,
      shape: "jar", // "pouch" | "jar" | "fruit_slice" | "tea_tin"
      color: "#C96839",
      shortNote: "Ghi chú ngắn khi rê chuột",
    }
  ],
  ingredients: ["Món 1 (200g)", "Món 2 (150g)"],
  weight: "1.1 kg",
  shelfLife: "6 tháng",
  dimensions: "28cm x 22cm x 10cm",
  stock: 50,
  rating: 5.0,
  reviewCount: 20,
  heroImage: "/images/products/new-box.webp",
  gallery: ["/images/products/new-box.webp"],
}
```
Ngay lập tức:
* Trang chủ, Hero 3D scene, Bộ lọc Cửa hàng, Trang chi tiết sản phẩm và Sitemap sẽ tự động nhận diện và cập nhật đầy đủ.

---

## 7. ĐIỂM SÁNG TRẢI NGHIỆM ĐÃ HOÀN TẤT
1. **TRUE 3D Product Experience:** Canvas WebGL thực thụ với camera rig phản ứng theo con trỏ chuột, ánh sáng studio và hạt lơ lửng.
2. **Signature Animation "Đồ ăn bay vào box":** Quỹ đạo cong bezier 3 chiều mô phỏng đóng gói hộp quà sống động khi chuyển đổi sản phẩm.
3. **Chế độ kép 3D & 2.5D Fallback:** Nút chuyển đổi linh hoạt giúp tương thích mọi thiết bị từ di động cấu hình yếu đến máy tính cao cấp.
4. **Tự tay tạo chiếc box của bạn (Build Your Box):** Tùy chọn 3 loại hộp, gắp món ăn tự do, chọn thiệp viết tay, tính giá realtime và thêm cả Custom Box vào giỏ.
5. **E-commerce trọn vẹn:** Giỏ hàng slide-over drawer, thanh đo Freeship tự động, mã giảm giá `VUNGQUE10`, trang Checkout đầy đủ thông tin giao hàng & hình thức thanh toán COD / VietQR, trang Order Success chúc mừng với pháo hoa.
6. **SEO & Hiệu Năng Vượt Trội:** Tự động tạo `sitemap.xml`, `robots.txt`, hỗ trợ Schema Structured Data và toàn bộ 32 trang được biên dịch tĩnh (SSG) với tốc độ tức thì.
