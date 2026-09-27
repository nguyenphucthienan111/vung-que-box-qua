export interface CustomBoxOption {
  id: string;
  name: string;
  material: string;
  description: string;
  price: number;
  color: string;
  lidColor: string;
  capacity: string;
  image: string;
  boxOpenAsset?: string;
}

export interface CustomFoodItem {
  id: string;
  name: string;
  category: "tra" | "snack" | "mut" | "kho" | "gia-vi";
  region: string;
  price: number;
  weight: string;
  color: string;
  shape: "pouch" | "jar" | "fruit_slice" | "tea_tin" | "cylinder_box";
  shortNote: string;
  image: string;
  imageAsset: string;
}

export interface GreetingCardOption {
  id: string;
  name: string;
  description: string;
  color: string;
  textColor: string;
}

export const BOX_OPTIONS: CustomBoxOption[] = [
  {
    id: "box-kraft",
    name: "Hộp Giấy Dó Thủ Công Vân Mộc",
    material: "Giấy Dó & Bồi Carton Dày 3mm",
    description: "Phong cách mộc mạc, thân thiện môi trường, ép kim nhũ vàng tinh tế.",
    price: 80000,
    color: "#4A3E34",
    lidColor: "#382D25",
    capacity: "Chứa được 4 - 6 món",
    image: "/images/boxes/dalat/box-open.png",
    boxOpenAsset: "/images/boxes/dalat/box-open.png",
  },
  {
    id: "box-wood",
    name: "Hộp Gỗ Thông Mộc Khắc Laser",
    material: "Gỗ Thông Đà Lạt Nguyên Khối",
    description: "Sang trọng, bền bỉ, có khóa gài đồng cổ và khắc tên riêng theo yêu cầu.",
    price: 140000,
    color: "#2F3B2C",
    lidColor: "#222B20",
    capacity: "Chứa được 5 - 7 món",
    image: "/images/boxes/tay-bac/box-open.png",
    boxOpenAsset: "/images/boxes/tay-bac/box-open.png",
  },
  {
    id: "box-bamboo",
    name: "Hộp Mây Tre Đan Tay Truyền Thống",
    material: "Mây Tre Đan Thủ Công Làng Nghề",
    description: "Đậm hồn quê Việt Nam, lót vải lanh dệt tay, tái sử dụng đa năng.",
    price: 160000,
    color: "#7D5836",
    lidColor: "#5E4226",
    capacity: "Chứa được 4 - 6 món",
    image: "/images/boxes/mien-tay/box-open.png",
    boxOpenAsset: "/images/boxes/mien-tay/box-open.png",
  },
];

export const CUSTOM_FOOD_ITEMS: CustomFoodItem[] = [
  {
    id: "cf-hong-say",
    name: "Hồng Giòn Sấy Dẻo Đơn Dương",
    category: "mut",
    region: "Đà Lạt",
    price: 95000,
    weight: "200g",
    color: "#C96839",
    shape: "fruit_slice",
    shortNote: "Hồng treo gió dẻo thơm mật ngọt tự nhiên",
    image: "/images/foods/dalat/hong-say.png",
    imageAsset: "/images/foods/dalat/hong-say.png",
  },
  {
    id: "cf-tra-atiso",
    name: "Trà Búp Atiso Hộp Thiếc Vàng",
    category: "tra",
    region: "Đà Lạt",
    price: 85000,
    weight: "150g",
    color: "#2C4030",
    shape: "tea_tin",
    shortNote: "Thanh nhiệt, mát gan, thơm dịu",
    image: "/images/foods/dalat/tra-atiso.png",
    imageAsset: "/images/foods/dalat/tra-atiso.png",
  },
  {
    id: "cf-banh-trang",
    name: "Bánh Tráng Phơi Sương Trảng Bàng",
    category: "snack",
    region: "Tây Ninh",
    price: 45000,
    weight: "250g",
    color: "#F4ECE1",
    shape: "pouch",
    shortNote: "Mềm dẻo thơm mùi gạo phơi sương đêm",
    image: "/images/foods/tay-ninh/banh-trang.png",
    imageAsset: "/images/foods/tay-ninh/banh-trang.png",
  },
  {
    id: "cf-muoi-tom",
    name: "Muối Tôm Hạt To Hảo Hạng",
    category: "gia-vi",
    region: "Tây Ninh",
    price: 55000,
    weight: "180g",
    color: "#C85A32",
    shape: "jar",
    shortNote: "Vị tôm rang thơm lừng giòn rụm",
    image: "/images/foods/tay-ninh/muoi-tom.png",
    imageAsset: "/images/foods/tay-ninh/muoi-tom.png",
  },
  {
    id: "cf-kho-bo",
    name: "Khô Bò Sợi Ớt Hiểm Giòn Cay",
    category: "kho",
    region: "Tây Ninh",
    price: 110000,
    weight: "150g",
    color: "#5C2618",
    shape: "pouch",
    shortNote: "Thịt bò tươi tẩm ớt thơm đậm đà",
    image: "/images/foods/tay-ninh/bo-kho.png",
    imageAsset: "/images/foods/tay-ninh/bo-kho.png",
  },
  {
    id: "cf-thit-trau",
    name: "Thịt Trâu Gác Bếp Tây Bắc Chuẩn Vị",
    category: "kho",
    region: "Tây Bắc",
    price: 165000,
    weight: "200g",
    color: "#4A1A12",
    shape: "pouch",
    shortNote: "Đượm khói củi nhãn đỏ hồng từng thớ",
    image: "/images/foods/tay-bac/thit-trau.png",
    imageAsset: "/images/foods/tay-bac/thit-trau.png",
  },
  {
    id: "cf-tra-shan",
    name: "Trà Shan Tuyết Cổ Thụ Đỉnh Mây",
    category: "tra",
    region: "Tây Bắc",
    price: 135000,
    weight: "100g",
    color: "#2B382C",
    shape: "tea_tin",
    shortNote: "Búp chè ngậm tuyết trắng trăm năm tuổi",
    image: "/images/foods/tay-bac/tra-shan-tuyet.png",
    imageAsset: "/images/foods/tay-bac/tra-shan-tuyet.png",
  },
  {
    id: "cf-mut-dua",
    name: "Mứt Dừa Non Lá Dứa Bến Tre",
    category: "mut",
    region: "Miền Tây",
    price: 65000,
    weight: "200g",
    color: "#F6F1E7",
    shape: "jar",
    shortNote: "Dừa non ngào đường mía dẻo bùi",
    image: "/images/foods/mien-tay/mut-dua.png",
    imageAsset: "/images/foods/mien-tay/mut-dua.png",
  },
  {
    id: "cf-phong-tom",
    name: "Bánh Phồng Tôm Sa Giang Đậm Tôm",
    category: "snack",
    region: "Miền Tây",
    price: 55000,
    weight: "200g",
    color: "#E8CBB3",
    shape: "pouch",
    shortNote: "Phồng rộp giòn xốp 75% tôm biển",
    image: "/images/foods/mien-tay/banh-phong-tom.png",
    imageAsset: "/images/foods/mien-tay/banh-phong-tom.png",
  },
  {
    id: "cf-tra-sen",
    name: "Trà Búp Sen Hồ Tịnh Tâm Cố Đô",
    category: "tra",
    region: "Huế",
    price: 145000,
    weight: "100g",
    color: "#2A3A2C",
    shape: "tea_tin",
    shortNote: "Hương sen thanh tao vương vấn cố đô",
    image: "/images/foods/hue/tra-sen.png",
    imageAsset: "/images/foods/hue/tra-sen.png",
  },
  {
    id: "cf-mut-sen",
    name: "Mứt Hạt Sen Tươi Nấu Đường Phèn",
    category: "mut",
    region: "Huế",
    price: 95000,
    weight: "200g",
    color: "#DBC796",
    shape: "jar",
    shortNote: "Hạt bở bùi ngọt dịu thanh nhẹ",
    image: "/images/foods/hue/mut-sen.png",
    imageAsset: "/images/foods/hue/mut-sen.png",
  },
  {
    id: "cf-tieu-phuquoc",
    name: "Tiêu Chín Đỏ Hạt Cối Xay Phú Quốc",
    category: "gia-vi",
    region: "Phú Quốc",
    price: 90000,
    weight: "180g",
    color: "#6A221E",
    shape: "jar",
    shortNote: "Hạt tiêu mọng đỏ thơm lừng cay nồng",
    image: "/images/foods/phu-quoc/tieu-chin-do.png",
    imageAsset: "/images/foods/phu-quoc/tieu-chin-do.png",
  },
];

export const GREETING_CARDS: GreetingCardOption[] = [
  {
    id: "card-dong-son",
    name: "Thiệp Họa Tiết Trống Đồng Ép Kim",
    description: "Họa tiết chim Lạc truyền thống mang phúc lộc bình an.",
    color: "#26372B",
    textColor: "#FFFDF8",
  },
  {
    id: "card-doi-che",
    name: "Thiệp Đồi Chè & Sương Sớm Mộc Mạc",
    description: "Nét vẽ màu nước cao nguyên thanh bình, thư thái.",
    color: "#55634A",
    textColor: "#FFFDF8",
  },
  {
    id: "card-sen-trang",
    name: "Thiệp Hoa Sen Trắng Cung Đình",
    description: "Tao nhã, tri ấn chân thành tới người nhận.",
    color: "#F6F1E7",
    textColor: "#263026",
  },
  {
    id: "card-xuan-do",
    name: "Thiệp Đỏ Son Khởi Sắc May Mắn",
    description: "Rực rỡ ngày Tết, sinh nhật và dịp kỷ niệm.",
    color: "#8D3427",
    textColor: "#FFFDF8",
  },
];
