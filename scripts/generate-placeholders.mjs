import fs from 'fs';
import path from 'path';

const dirs = [
  'public/images/products',
  'public/images/regions',
  'public/images/ingredients',
  'public/images/brand',
  'public/images/custom',
  'public/images/blog'
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
  }
});

// Create SVG generator for branded aesthetic placeholders
function createPlaceholderSVG(title, subtitle, bgColor = '#26372B', textColor = '#B9955A') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <radialGradient id="grad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:${bgColor};stop-opacity:0.85" />
      <stop offset="100%" style="stop-color:#152018;stop-opacity:1" />
    </radialGradient>
    <pattern id="grain" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="20" cy="20" r="1" fill="#B9955A" opacity="0.15"/>
    </pattern>
  </defs>
  <rect width="800" height="600" fill="url(#grad)" />
  <rect width="800" height="600" fill="url(#grain)" />
  <rect x="40" y="40" width="720" height="520" rx="16" fill="none" stroke="${textColor}" stroke-width="1.5" stroke-dasharray="8 8" opacity="0.4"/>
  <circle cx="400" cy="240" r="64" fill="${bgColor}" stroke="${textColor}" stroke-width="2"/>
  <text x="400" y="252" font-family="serif" font-size="36" fill="${textColor}" text-anchor="middle" font-weight="bold">✦</text>
  <text x="400" y="350" font-family="serif" font-size="28" fill="#FFFDF8" text-anchor="middle" font-weight="bold">${title}</text>
  <text x="400" y="390" font-family="sans-serif" font-size="14" fill="${textColor}" text-anchor="middle" letter-spacing="3" text-transform="uppercase">${subtitle}</text>
  <text x="400" y="440" font-family="serif" font-size="12" fill="#FFFDF8" opacity="0.5" text-anchor="middle">VÙNG QUÊ — GỬI TRỌN HƯƠNG VỊ VIỆT</text>
</svg>`;
}

const imagesToCreate = [
  { path: 'public/images/products/dalat-box.webp', title: 'Box Quà Đà Lạt An Yên', sub: 'Đặc Sản Cao Nguyên', bg: '#2F3D2C' },
  { path: 'public/images/products/tayninh-box.webp', title: 'Box Bánh Tráng Tây Ninh', sub: 'Đậm Vị Nắng Gió', bg: '#6B351C' },
  { path: 'public/images/products/taybac-box.webp', title: 'Box Tây Bắc Đậm Vị', sub: 'Thịt Trâu & Shan Tuyết', bg: '#221C18' },
  { path: 'public/images/products/mientay-box.webp', title: 'Box Miền Tây Ngọt Lành', sub: 'Bánh Phồng & Dừa Non', bg: '#39251A' },
  { path: 'public/images/products/hue-box.webp', title: 'Box Quà Huế Cố Đô', sub: 'Trà Sen Hoàng Cung', bg: '#351E33' },
  { path: 'public/images/products/phuquoc-box.webp', title: 'Box Phú Quốc Đảo Ngọc', sub: 'Tiêu Đỏ & Chou Chou', bg: '#122A34' },
  { path: 'public/images/products/snack-box.webp', title: 'Box Snack Việt Phố Thị', sub: 'Cơm Cháy & Da Heo', bg: '#582D16' },
  { path: 'public/images/products/tet-box.webp', title: 'Box Quà Tết Thịnh Vượng', sub: 'Sơn Mài Ép Kim 24K', bg: '#4F1212' },
  
  { path: 'public/images/regions/da-lat.webp', title: 'Đà Lạt', sub: 'Hương Cao Nguyên', bg: '#3D4D3A' },
  { path: 'public/images/regions/tay-ninh.webp', title: 'Tây Ninh', sub: 'Đậm Vị Nắng Gió', bg: '#8D4727' },
  { path: 'public/images/regions/tay-bac.webp', title: 'Tây Bắc', sub: 'Vị Núi Rừng', bg: '#4B4439' },
  { path: 'public/images/regions/mien-tay.webp', title: 'Miền Tây', sub: 'Ngọt Lành Phương Nam', bg: '#4E3629' },
  { path: 'public/images/regions/hue.webp', title: 'Huế', sub: 'Tinh Tế Cố Đô', bg: '#653C5F' },
  { path: 'public/images/regions/phu-quoc.webp', title: 'Phú Quốc', sub: 'Hương Vị Biển Xanh', bg: '#2A596E' },

  { path: 'public/images/custom/box-kraft.webp', title: 'Hộp Giấy Dó Thủ Công', sub: 'Vân Mộc Ép Kim', bg: '#4A3E34' },
  { path: 'public/images/custom/box-wood.webp', title: 'Hộp Gỗ Thông Mộc', sub: 'Khắc Laser Tên Riêng', bg: '#2F3B2C' },
  { path: 'public/images/custom/box-bamboo.webp', title: 'Hộp Mây Tre Đan Tay', sub: 'Làng Nghề Truyền Thống', bg: '#7D5836' },

  { path: 'public/images/blog/dalat-cover.webp', title: 'Đặc Sản Đà Lạt Có Gì?', sub: 'Góc Ký Sự Ẩm Thực', bg: '#26372B' },
  { path: 'public/images/blog/tayninh-cover.webp', title: 'Bánh Tráng Tây Ninh', sub: 'Cẩm Nang Ăn Vặt', bg: '#8D4727' },
  { path: 'public/images/blog/culture-cover.webp', title: 'Quà Quê Việt Nam', sub: 'Văn Hóa Ẩm Thực', bg: '#55634A' },
  { path: 'public/images/blog/tet-cover.webp', title: 'Quà Tết Nên Tặng Gì?', sub: 'Cẩm Nang Quà Tết', bg: '#6B1D1D' },
];

imagesToCreate.forEach(img => {
  const svgContent = createPlaceholderSVG(img.title, img.sub, img.bg);
  fs.writeFileSync(img.path, svgContent, 'utf-8');
});

console.log(`Generated ${imagesToCreate.length} placeholder assets successfully.`);
