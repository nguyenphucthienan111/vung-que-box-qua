# BỘ PROMPT CHUYÊN BIỆT TẠO ASSET CHO BANANA MODEL (AI IMAGE PIPELINE)
## VÙNG QUÊ — UNBOX VIETNAM: 3D PHOTOREALISTIC FOOD ASSET GENERATION

Tài liệu này cung cấp toàn bộ prompt chuẩn studio thương mại cho từng sản phẩm và hộp quà. Tất cả prompt được tối ưu hóa cho model **Banana / Midjourney / DALL-E 3** để tạo ra các asset tách nền trong suốt (`transparent PNG / WebP`), cùng góc nhìn, cùng ánh sáng và tỷ lệ thị giác.

---

## QUY CHUẨN ĐỒNG NHẤT HÌNH ẢNH (STUDIO CONSISTENCY GUIDELINES)

Tất cả asset bắt buộc phải tuân theo 6 tiêu chuẩn nghiêm ngặt sau:

1. **Góc máy (Camera Angle):** 
   * `3/4 elevated view (30-degree isometric perspective)`, hơi nhìn từ trên xuống để thấy rõ chiều sâu của món ăn và miệng hộp/hũ.
2. **Ánh sáng (Studio Lighting):**
   * Key light: Soft directional warm daylight từ góc trên bên trái (`top-left, 45 degrees, 5200K`).
   * Fill light: Soft ambient reflection từ bên phải giúp giữ lại chi tiết vùng tối (`fill light 0.4 intensity`).
   * Rim light: Subtle golden accent rim light từ phía sau tạo viền sáng tự nhiên, tách bạch chủ thể khỏi nền.
3. **Độ phân giải & Tách nền (Transparency):**
   * `Pure transparent alpha background`, viền cắt sắc nét (`crisp clean alpha edges, no halo, no fringing`).
   * Độ phân giải: `2048 x 2048px`, tỷ lệ `1:1`.
4. **Phong cách thị giác (Visual Style):**
   * Chụp ảnh món ăn thương mại cao cấp (`luxury commercial food photography, high-end catalog shot`).
   * Chân thực 100% (`photorealistic, realistic textures, glossy glaze, natural steam/oil reflections`), KHÔNG dùng phong cách 3D render hoạt hình hoặc tranh vẽ.
5. **Tiêu cự & Độ sâu trường ảnh (Optics):**
   * Ống kính macro chuyên dụng (`85mm / 100mm macro lens feeling, f/8 aperture`), toàn bộ món ăn đều nét sâu (`sharp focus throughout the subject`), không bị mờ nhòe viền.
6. **Negative Prompt chung (Bắt buộc):**
   * `no background, no shadows on floor, no text, no logo, no watermark, no human hands, no plates, no tableware, no blurred edges, no cartoon, no 3D polygon mesh, no composite items`.

---

## 1. BOX ĐÀ LẠT AN YÊN

### 1.1. Hộp Quà (Boxes)
* **`public/images/boxes/dalat/box-open.png`**
  ```text
  Commercial studio product photography of a luxury opened Vietnamese gift box, made of dark forest green matte rigid cardboard with fine silk paper grain texture, interior filled with natural shredded kraft paper cushioning and elegant bamboo dividers, open lid propped gracefully behind at a 65-degree angle displaying an embossed gold foil logo, isometric 30-degree elevated angle, soft warm studio lighting from top-left, subtle gold rim light, pure transparent background, crisp clean alpha edges, isolated object, 8k resolution, photorealistic, no text except embossed gold logo, no watermark, no floor shadow.
  ```

* **`public/images/boxes/dalat/box-closed.png`**
  ```text
  Commercial studio product photography of a closed luxury Vietnamese gift box, dark forest green matte textured cardboard wrapped with an antique gold satin ribbon and handcrafted bow, gold foil embossed seal in the center, isometric 30-degree elevated angle, soft studio lighting, transparent background, isolated, photorealistic, 8k.
  ```

### 1.2. Món Ăn Tách Lẻ (Food Items)
* **`public/images/foods/dalat/hong-say.png` (Hồng Sấy Dẻo Đơn Dương)**
  ```text
  Commercial food photography of traditional Vietnamese Da Lat dried persimmons (hồng treo gió), two whole plump translucent golden-orange dried persimmons with natural sugary white bloom on surface and soft glistening honeyed amber pulp visible inside, elevated 3/4 angle, soft warm studio lighting, glistening natural sweetness, isolated on transparent background, clean sharp edges, 8k resolution, macro food details, no background, no plate.
  ```

* **`public/images/foods/dalat/tra-atiso.png` (Trà Búp Atiso)**
  ```text
  Commercial product photography of a premium cylindrical forest green and gold metallic tea tin canister for Da Lat Artichoke Tea, embossed Vietnamese botanical motif on body, closed brass gold lid, 3/4 angle view, soft studio reflections, isolated on transparent background, clean alpha cut, photorealistic, 8k, no text.
  ```

* **`public/images/foods/dalat/mut-dau.png` (Mứt Dâu Tằm Phố Hoa)**
  ```text
  Commercial food photography of a small hexagonal luxury clear glass jar filled with rich deep ruby-red artisan strawberry and mulberry jam, showing visible glossy fruit seeds and chunks, sealed with craft paper and tied with twine ribbon, transparent glass reflections, isolated on transparent background, clean edges, 8k resolution, no label text.
  ```

* **`public/images/foods/dalat/hat-macca.png` (Hạt Macca Nứt Vỏ)**
  ```text
  Commercial food photography of a small stand-up matte kraft snack pouch containing cracked natural macadamia nuts, partially open showing roasted cream-colored buttery macadamia kernels with a small metal cracking lever leaning on it, 3/4 studio angle, warm lighting, isolated on transparent background, sharp focus, 8k.
  ```

---

## 2. BOX BÁNH TRÁNG TÂY NINH

### 2.1. Hộp Quà (Boxes)
* **`public/images/boxes/tay-ninh/box-open.png`**
  ```text
  Commercial studio photography of a premium open gift box, warm terracotta brick red matte finish with gold ribbon trim, inside lined with natural woven rush mat texture and dividers, open lid propped behind at 65 degrees with embossed gold emblem, isometric 30-degree angle, soft studio lighting, transparent background, clean alpha edges, photorealistic, 8k.
  ```

* **`public/images/boxes/tay-ninh/box-closed.png`**
  ```text
  Commercial studio photography of a closed terracotta brick red luxury gift box, antique copper ribbon wrap, clean minimalist Vietnamese aesthetics, isometric 30-degree angle, transparent background, isolated, 8k.
  ```

### 2.2. Món Ăn Tách Lẻ (Food Items)
* **`public/images/foods/tay-ninh/banh-trang.png` (Bánh Tráng Phơi Sương Trảng Bàng)**
  ```text
  Commercial food photography of a neat stack of traditional Vietnamese dew-soaked rice paper (bánh tráng phơi sương Trảng Bàng), flexible translucent rice paper sheets folded loosely with soft curved edges and delicate bubbles, authentic rice starch texture, 3/4 angle, warm studio lighting, isolated on transparent background, clean cut, 8k, photorealistic.
  ```

* **`public/images/foods/tay-ninh/muoi-tom.png` (Muối Tôm Thượng Hạng)**
  ```text
  Commercial product photography of a premium clear glass spice shaker jar filled with coarse granular orange-red Tay Ninh shrimp salt (muối tôm), visible dried shrimp flakes and roasted red chili bits, black matte lid, glistening salt granules, isolated on transparent background, sharp focus, clean alpha edges, 8k.
  ```

* **`public/images/foods/tay-ninh/sa-te.png` (Hũ Sa Tế Tắc Cay Ngọt)**
  ```text
  Commercial food photography of a round glass gourmet jar containing aromatic red chili lemongrass sate sauce with golden fried shallot flakes and glossy amber chili oil layer on top, golden screw cap, isolated on transparent background, crisp alpha cutout, 8k resolution.
  ```

* **`public/images/foods/tay-ninh/bo-kho.png` (Khô Bò Sợi Cay Giòn)**
  ```text
  Commercial food photography of a gourmet matte black and kraft stand-up pouch filled with glistening spiced Vietnamese shredded beef jerky (khô bò sợi), vibrant dark red beef shreds coated with roasted chili flakes, clear window showing texture, isolated on transparent background, clean edges, 8k.
  ```

---

## 3. BOX TÂY BẮC ĐẬM VỊ

### 3.1. Hộp Quà (Boxes)
* **`public/images/boxes/tay-bac/box-open.png`**
  ```text
  Commercial studio photography of a luxury opened Vietnamese mountain specialty gift box, deep charcoal dark walnut brown matte textured exterior with bronze gold accents, interior lined with natural hemp cloth and carved wood compartments, lid open behind, isometric 30-degree angle, dramatic soft warm lighting, transparent background, 8k.
  ```

* **`public/images/boxes/tay-bac/box-closed.png`**
  ```text
  Commercial studio photography of a closed dark walnut brown textured gift box, woven ethnic brocade bronze ribbon band, isometric angle, transparent background, isolated, 8k.
  ```

### 3.2. Món Ăn Tách Lẻ (Food Items)
* **`public/images/foods/tay-bac/thit-trau.png` (Thịt Trâu Gác Bếp)**
  ```text
  Commercial food photography of authentic Northwest Vietnamese smoked mountain buffalo jerky (thịt trâu gác bếp), thick slab with blackened exterior and rich deep-red shredded fibers visible where torn, spiced with wild mac khen peppercorns, natural rustic texture, 3/4 angle, isolated on transparent background, sharp focus, 8k.
  ```

* **`public/images/foods/tay-bac/tra-shan-tuyet.png` (Trà Shan Tuyết Cổ Thụ)**
  ```text
  Commercial product photography of an octagonal dark forest green and antique brass tea canister for ancient Shan Tuyet tea, with a small loose cluster of silver-haired dried tea buds resting next to the tin rim, isolated on transparent background, clean alpha cutout, 8k.
  ```

* **`public/images/foods/tay-bac/mac-khen.png` (Gia Vị Mắc Khén Hạt Dổi)**
  ```text
  Commercial food photography of a small ceramic stoneware spice pot filled with toasted wild Northwest Vietnamese forest peppercorns (mắc khén and hạt dổi), dark textured dried berries and fragrant crushed spice blend, isolated on transparent background, clean alpha edges, 8k.
  ```

* **`public/images/foods/tay-bac/mang-nua.png` (Măng Nứa Sấy Khô)**
  ```text
  Commercial food photography of a clear cellophane gift bundle tied with rustic hemp string containing golden-yellow tender dried bamboo shoot tips (măng nứa tép khô), natural wrinkled sun-dried texture, isolated on transparent background, clean edges, 8k.
  ```

---

## 4. BOX MIỀN TÂY NGỌT LÀNH

### 4.1. Hộp Quà (Boxes)
* **`public/images/boxes/mien-tay/box-open.png`**
  ```text
  Commercial studio photography of an open gift box in warm amber caramel brown, lined with woven coconut palm leaf pattern and kraft paper bed, lid propped open behind with gold foil emblem, isometric 30-degree angle, transparent background, 8k.
  ```

### 4.2. Món Ăn Tách Lẻ (Food Items)
* **`public/images/foods/mien-tay/banh-phong-tom.png` (Bánh Phồng Tôm Sa Giang)**
  ```text
  Commercial food photography of crispy puffed round golden Vietnamese shrimp crackers (bánh phồng tôm Sa Giang), three light, airy, translucent crackers with fine pepper specks stacked loosely, isolated on transparent background, clean edges, 8k.
  ```

* **`public/images/foods/mien-tay/kho-ca-loc.png` (Khô Cá Lóc Một Nắng)**
  ```text
  Commercial food photography of vacuum-sealed sun-dried snakehead fish fillets (khô cá lóc một nắng), golden amber sun-cured fish with red chili flakes and black pepper seasoning, isolated on transparent background, 8k.
  ```

* **`public/images/foods/mien-tay/mut-dua.png` (Mứt Dừa Non Bến Tre)**
  ```text
  Commercial food photography of a glass jar filled with tender ribbon-cut young coconut jam (mứt dừa non), soft ivory white and pale pandan green ribbons coated with thin sugar crystals, isolated on transparent background, clean alpha cut, 8k.
  ```

* **`public/images/foods/mien-tay/mang-cau.png` (Mãng Cầu Xiêm Sấy Muối Ớt)**
  ```text
  Commercial food photography of chewy dried soursop fruit candies dusted with fine chili salt, translucent golden chunks with seed contours, isolated on transparent background, 8k.
  ```

---

## 5. BOX HUẾ CỐ ĐÔ

### 5.1. Hộp Quà & Món Ăn (Boxes & Foods)
* **`public/images/boxes/hue/box-open.png`**: Hộp màu tím hoàng gia cung đình (`deep royal imperial purple #351E33`), ép kim hoa sen vàng, lót gấm.
* **`public/images/foods/hue/tra-sen.png` (Trà Sen Tịnh Tâm)**: Hộp thiếc hình trụ men lam dập nổi hoa sen chứa búp chè ướp sen trăm cánh.
* **`public/images/foods/hue/mut-sen.png` (Mứt Hạt Sen Tươi)**: Hũ thủy tinh hạt sen tròn mẩy ninh đường phèn vàng óng.
* **`public/images/foods/hue/me-xung.png` (Mè Xửng Giòn Cung Đình)**: Thanh kẹo mè xửng dẻo bọc mè vàng rang và đậu phộng bùi thơm.
* **`public/images/foods/hue/banh-phuc-linh.png` (Bánh Sen Tiến Vua)**: Bánh phục linh in hoa sen trắng ngà tan ngay đầu lưỡi.

---

## 6. BOX PHÚ QUỐC ĐẢO NGỌC

### 6.1. Hộp Quà & Món Ăn (Boxes & Foods)
* **`public/images/boxes/phu-quoc/box-open.png`**: Hộp màu xanh biển đảo ngọc (`deep ocean teal #143642`), viền bạc kim loại.
* **`public/images/foods/phu-quoc/tieu-chin-do.png` (Tiêu Đỏ Phú Quốc)**: Lọ cối xay tiêu thủy tinh nắp gỗ chứa hạt tiêu chín đỏ mọng nồng ấm.
* **`public/images/foods/phu-quoc/dau-phong-chou-chou.png` (Đậu Phộng Chou Chou)**: Hũ đậu phộng giòn rụm áo lớp caramel muối biển và phô mai vàng nâu.
* **`public/images/foods/phu-quoc/kho-muc.png` (Khô Mực Cán Mắm Nhĩ)**: Mực câu một nắng nướng cán mỏng tẩm sốt nước mắm cốt nhĩ óng ả.
* **`public/images/foods/phu-quoc/keo-sim.png` (Kẹo Sim Rừng Đảo Ngọc)**: Viên kẹo dẻo sim rừng tím thẫm chua ngọt thanh tao.
