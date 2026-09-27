export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  coverImage: string;
  tags: string[];
  content: {
    heading: string;
    paragraph: string;
  }[];
}

export const ARTICLES: Article[] = [
  {
    id: "art-1",
    slug: "dac-san-da-lat-co-gi-tinh-tuy-ngay-dong",
    title: "Đặc sản Đà Lạt có gì? Khám phá tinh hoa ẩm thực xứ sương mù",
    summary:
      "Vượt ra khỏi những món mứt công nghiệp ngọt lịm, Đà Lạt có một chiều sâu ẩm thực nông nghiệp với hồng treo gió tự nhiên, búp atiso mát lành và cà phê cao nguyên lộng gió.",
    category: "Khám Phá Vùng Đất",
    readTime: "5 phút đọc",
    date: "20/02/2026",
    author: "Lê Hoàng Yến",
    authorRole: "Food Curator tại Vùng Quê",
    coverImage: "/images/blog/dalat-cover.webp",
    tags: ["Đà Lạt", "Hồng sấy", "Trà Atiso", "Ẩm thực Việt"],
    content: [
      {
        heading: "1. Vị ngọt mật từ những trái hồng treo gió Đơn Dương",
        paragraph:
          "Khi cái lạnh chớm tràn về thung lũng, những quả hồng vuông trứng giòn rụm được hái tỉ mẩn, gọt vỏ rồi treo lơ lửng trong nhà kính gió lùa suốt 4-5 tuần. Không tẩm ướp đường, không sấy nhiệt vội vã, chính nắng và gió cao nguyên đã cô đọng lớp đường mật tự nhiên, tạo nên lớp vỏ dai dẻo còn bên trong mềm ươm như mật ong rừng.",
      },
      {
        heading: "2. Búp hoa Atiso - Món quà thanh lọc thuần khiết",
        paragraph:
          "Trồng ở độ cao hơn 1.500m so với mực nước biển, hoa atiso Đà Lạt tích tụ khoáng chất quý giá. Nước trà atiso sau khi hãm có màu nâu cánh gián trong vắt, vị đắng dịu ở đầu lưỡi nhưng để lại hậu vị ngọt thanh sâu lắng nơi cuống họng.",
      },
      {
        heading: "3. Triết lý đóng gói giữ trọn linh hồn cao nguyên",
        paragraph:
          "Tại Vùng Quê, chúng tôi không dùng túi nilon vô cảm. Từng hộp quà Đà Lạt An Yên được lót giấy rơm mộc, buộc dây đay và đính kèm cành hoa khô ép tay, như một lời chào bình an gửi từ phố núi đến bàn trà của bạn.",
      },
    ],
  },
  {
    id: "art-2",
    slug: "banh-trang-tay-ninh-an-sao-ngon-dung-dieu",
    title: "Bánh tráng Tây Ninh ăn sao cho ngon đúng điệu người sành ăn vặt?",
    summary:
      "Không chỉ là cuốn chấm thông thường, bánh tráng phơi sương kết hợp muối tôm rang củi và khô bò là một nghệ thuật cân bằng ngũ vị giòn - dẻo - cay - bùi - béo.",
    category: "Cẩm Nang Ăn Vặt",
    readTime: "4 phút đọc",
    date: "14/02/2026",
    author: "Trần Anh Khoa",
    authorRole: "Chuyên gia sáng tạo hương vị",
    coverImage: "/images/blog/tayninh-cover.webp",
    tags: ["Tây Ninh", "Bánh tráng", "Snack Việt", "Món ngon đường phố"],
    content: [
      {
        heading: "1. Bí mật của những đêm thức phơi sương Trảng Bàng",
        paragraph:
          "Chiếc bánh tráng ngon phải trải qua 2 lần nướng phồng rồi mang ra đón sương đêm từ 2 đến 4 giờ sáng. Hơi ẩm mát lành của trời đất làm lá bánh mềm lại, dẻo dai mà không hề dính tay, xé ra nghe tiếng sột soạt êm tai.",
      },
      {
        heading: "2. Muối tôm hạt to rang lửa củi - Linh hồn khó thay thế",
        paragraph:
          "Hạt muối chuẩn Tây Ninh không nhuyễn mịn mà có kích thước to, cắn vào nghe tanh tách giòn rụm. Thịt tôm khô biển hòa với ớt chỉ thiên và tỏi lý sơn tạo nên màu cam gạch tự nhiên không dùng phẩm màu công nghiệp.",
      },
      {
        heading: "3. Công thức mix bánh tráng đỉnh cao tại nhà",
        paragraph:
          "Xé nhỏ bánh tráng, rắc một muỗng muối tôm rang, thêm chút khô bò sợi cay, rưới 2 muỗng sa tế tắc hành phi và một thìa bơ trứng gà béo ngậy. Dùng tay bóp đều 30 giây để sốt thấm từng thớ bánh – bạn sẽ hiểu vì sao món ăn này gây nghiện đến vậy!",
      },
    ],
  },
  {
    id: "art-3",
    slug: "qua-que-viet-nam-nghe-thuat-tang-qua-tinh-te",
    title: "Quà quê Việt Nam: Khi thức quà mộc mạc trở thành nghệ thuật biếu tặng",
    summary:
      "Vì sao giữa thế giới ngập tràn bánh kẹo ngoại nhập, người ta lại xúc động hơn khi nhận được một hộp quà đặc sản đậm đà hồn quê hương xứ sở?",
    category: "Văn Hóa Ẩm Thực",
    readTime: "6 phút đọc",
    date: "05/01/2026",
    author: "Nguyễn Minh Châu",
    authorRole: "Đồng sáng lập Vùng Quê",
    coverImage: "/images/blog/culture-cover.webp",
    tags: ["Quà quê", "Văn hóa Việt", "Nghệ thuật tặng quà", "Storytelling"],
    content: [
      {
        heading: "1. Món quà mang linh hồn ký ức",
        paragraph:
          "Người Việt đi xa, ai mà không nhớ mùi khói bếp củi nhãn Tây Bắc, không thèm ngụm nước dừa non ngọt lịm Bến Tre, hay tách trà sen ngát hương thơm mùa hạ hồ Tây. Trao một món quà quê là trao đi cả một miền ký ức tuổi thơ ấm áp.",
      },
      {
        heading: "2. Sự chuyển mình của bao bì thủ công hiện đại",
        paragraph:
          "Quà quê ngày nay không còn là những bọc nilon xách tay tuềnh toàng. Khi được khoác lên mình chiếc áo thiết kế đương đại, với chất liệu giấy bồi mỹ thuật, gốm men lam hay hộp mây tre đan thủ công, giá trị của sản vật được nâng lên một tầm cao mới.",
      },
    ],
  },
  {
    id: "art-4",
    slug: "qua-tet-nen-tang-gi-y-nghia-gan-ket-tinh-than",
    title: "Quà Tết nên tặng gì? Gợi ý box quà tinh tế tri ân gia đình và đối tác",
    summary:
      "Tết Giáp Ngọ 2026, hãy để những thức quà đặc sản tuyển chọn thay lời chúc khởi sắc xuân hồng, gắn kết tình thân và chúc mừng sự thịnh vượng.",
    category: "Cẩm Nang Quà Tết",
    readTime: "5 phút đọc",
    date: "28/12/2025",
    author: "Phạm Thùy Linh",
    authorRole: "Tư vấn Quà Tặng Doanh Nghiệp",
    coverImage: "/images/blog/tet-cover.webp",
    tags: ["Quà Tết", "Tết 2026", "Tri ân đối tác", "Tết đoàn viên"],
    content: [
      {
        heading: "1. Xu hướng quà Tết tốt cho sức khỏe lên ngôi",
        paragraph:
          "Thay vì bánh kẹo nhiều đường tinh luyện hay rượu bia nồng độ cao, xu hướng chọn hộp quà Tết những năm gần đây ưu tiên tuyệt đối các loại hạt dinh dưỡng rang củi mộc, trà thảo mộc cổ thụ và trái cây sấy dẻo tự nhiên.",
      },
      {
        heading: "2. Hộp quà Tết Thịnh Vượng - Dấu ấn đẳng cấp",
        paragraph:
          "Được chế tác với sắc đỏ son truyền thống và hoa văn dập nổi kim ngân, Box Quà Tết Thịnh Vượng của Vùng Quê hội tụ tinh hoa 3 miền: hạt điều Bình Phước loại 1, lạp xưởng Mai Quế Lộ, trà Ô Long Bảo Lộc và mứt gừng cay ấm xứ Huế.",
      },
    ],
  },
];
