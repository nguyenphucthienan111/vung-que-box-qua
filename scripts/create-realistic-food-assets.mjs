import fs from 'fs';
import path from 'path';

// Helper to write high-resolution SVG files that Three.js TextureLoader can load natively or convert to WebP/PNG
function createRealisticFoodSVG({ name, type, primaryColor, secondaryColor, accentColor, detail }) {
  let content = '';

  if (type === 'persimmon') {
    // Realistic dried persimmon (hồng sấy dẻo) with crystalline sugar bloom and pulp
    content = `
      <defs>
        <radialGradient id="pulpGrad" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stop-color="#FF9F43"/>
          <stop offset="45%" stop-color="#E55039"/>
          <stop offset="85%" stop-color="#B71540"/>
          <stop offset="100%" stop-color="#4A0E17"/>
        </radialGradient>
        <radialGradient id="bloomGrad" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.6"/>
          <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.15"/>
          <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
        </radialGradient>
        <filter id="persimmonShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="4" dy="12" stdDeviation="10" flood-color="#152018" flood-opacity="0.4"/>
        </filter>
      </defs>
      <!-- Shadow & Body -->
      <g filter="url(#persimmonShadow)">
        <path d="M 200,80 C 270,70 330,120 340,190 C 350,260 300,340 220,350 C 140,360 80,300 70,220 C 60,140 130,90 200,80 Z" fill="url(#pulpGrad)"/>
        <!-- Dried sugar powder bloom -->
        <path d="M 180,95 C 240,90 290,130 300,180 C 310,240 270,300 200,310 C 140,315 95,260 90,200 C 85,140 130,100 180,95 Z" fill="url(#bloomGrad)"/>
        <!-- Natural creases and wrinkles -->
        <path d="M 140,150 Q 200,190 260,170" stroke="#780216" stroke-width="4" fill="none" opacity="0.4" stroke-linecap="round"/>
        <path d="M 160,220 Q 220,250 280,210" stroke="#780216" stroke-width="3" fill="none" opacity="0.3" stroke-linecap="round"/>
        <!-- Green dried calyx stem -->
        <path d="M 185,85 C 190,60 210,60 215,85 C 230,70 245,80 235,95 C 220,95 210,105 200,98 C 190,105 180,95 165,95 C 155,80 170,70 185,85 Z" fill="#2E402B" stroke="#1B2619" stroke-width="2"/>
        <path d="M 200,75 L 202,50" stroke="#1B2619" stroke-width="5" stroke-linecap="round"/>
      </g>
    `;
  } else if (type === 'tea_tin') {
    // Realistic gold & forest green embossed tea tin canister
    content = `
      <defs>
        <linearGradient id="tinBody" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#1B2B20"/>
          <stop offset="25%" stop-color="#2D4433"/>
          <stop offset="65%" stop-color="#3D5A45"/>
          <stop offset="85%" stop-color="#2D4433"/>
          <stop offset="100%" stop-color="#152018"/>
        </linearGradient>
        <linearGradient id="goldLid" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#8A6729"/>
          <stop offset="25%" stop-color="#D4AF37"/>
          <stop offset="50%" stop-color="#FFF3A8"/>
          <stop offset="75%" stop-color="#D4AF37"/>
          <stop offset="100%" stop-color="#70501A"/>
        </linearGradient>
        <filter id="tinShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="6" dy="16" stdDeviation="12" flood-color="#152018" flood-opacity="0.45"/>
        </filter>
      </defs>
      <g filter="url(#tinShadow)">
        <!-- Canister Body -->
        <rect x="110" y="110" width="180" height="230" rx="20" fill="url(#tinBody)"/>
        <!-- Gold Trim Bands -->
        <rect x="110" y="325" width="180" height="15" rx="6" fill="url(#goldLid)"/>
        <!-- Embossed botanical motif in center -->
        <circle cx="200" cy="225" r="42" fill="none" stroke="url(#goldLid)" stroke-width="2.5"/>
        <path d="M 200,195 Q 215,225 200,250 Q 185,225 200,195 Z" fill="url(#goldLid)" opacity="0.85"/>
        <!-- Specular reflection line -->
        <line x1="150" y1="110" x2="150" y2="340" stroke="#FFFFFF" stroke-width="6" opacity="0.15"/>
        <!-- Gold Lid -->
        <ellipse cx="200" cy="110" rx="90" ry="24" fill="url(#goldLid)"/>
        <ellipse cx="200" cy="100" rx="84" ry="20" fill="#FFF3A8" opacity="0.3"/>
      </g>
    `;
  } else if (type === 'jam_jar') {
    // Glass jam jar with visible seeds and fruit
    content = `
      <defs>
        <linearGradient id="glassBody" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#4A0515"/>
          <stop offset="25%" stop-color="#7B0D28"/>
          <stop offset="50%" stop-color="#B31A3E"/>
          <stop offset="75%" stop-color="#7B0D28"/>
          <stop offset="100%" stop-color="#3D0310"/>
        </linearGradient>
        <filter id="jarShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="6" dy="16" stdDeviation="12" flood-color="#152018" flood-opacity="0.4"/>
        </filter>
      </defs>
      <g filter="url(#jarShadow)">
        <!-- Glass Jar Shape -->
        <rect x="115" y="120" width="170" height="210" rx="30" fill="url(#glassBody)"/>
        <!-- Seed spots -->
        <circle cx="160" cy="180" r="3" fill="#FFB8C6" opacity="0.7"/>
        <circle cx="220" cy="210" r="3.5" fill="#FFB8C6" opacity="0.8"/>
        <circle cx="185" cy="240" r="3" fill="#FFB8C6" opacity="0.6"/>
        <circle cx="145" cy="260" r="2.5" fill="#FFB8C6" opacity="0.7"/>
        <circle cx="230" cy="275" r="3" fill="#FFB8C6" opacity="0.75"/>
        <!-- Glass reflections -->
        <path d="M 130,135 Q 130,220 135,305" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round" opacity="0.25"/>
        <!-- Paper craft wrap cover on lid -->
        <path d="M 95,115 Q 200,95 305,115 Q 315,135 295,130 Q 200,120 105,130 Q 85,135 95,115 Z" fill="#D8C2A0" stroke="#B39B78" stroke-width="2"/>
        <!-- Twine string tied around lid -->
        <rect x="110" y="125" width="180" height="6" rx="3" fill="#755230"/>
        <circle cx="200" cy="128" r="5" fill="#543A20"/>
      </g>
    `;
  } else if (type === 'rice_paper') {
    // Stack of translucent rice paper with delicate bubbles
    content = `
      <defs>
        <linearGradient id="ricePaperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FCFAF5"/>
          <stop offset="50%" stop-color="#F2EDE2"/>
          <stop offset="100%" stop-color="#E2D7C3"/>
        </linearGradient>
        <filter id="paperShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="4" dy="12" stdDeviation="10" flood-color="#3D2B1F" flood-opacity="0.25"/>
        </filter>
      </defs>
      <g filter="url(#paperShadow)">
        <!-- Stack layer 1 -->
        <rect x="90" y="130" width="220" height="190" rx="20" fill="url(#ricePaperGrad)" opacity="0.8" transform="rotate(-6 200 220)"/>
        <!-- Stack layer 2 -->
        <rect x="95" y="125" width="220" height="190" rx="20" fill="url(#ricePaperGrad)" opacity="0.9" transform="rotate(4 200 220)"/>
        <!-- Main top sheet -->
        <rect x="90" y="120" width="220" height="190" rx="20" fill="url(#ricePaperGrad)" stroke="#D4C5AD" stroke-width="1.5"/>
        <!-- Bamboo grid drying lines (characteristic pattern of banh trang) -->
        <g stroke="#D4C5AD" stroke-width="1" opacity="0.45" stroke-dasharray="3 3">
          <line x1="90" y1="150" x2="310" y2="150"/>
          <line x1="90" y1="180" x2="310" y2="180"/>
          <line x1="90" y1="210" x2="310" y2="210"/>
          <line x1="90" y1="240" x2="310" y2="240"/>
          <line x1="90" y1="270" x2="310" y2="270"/>
          <line x1="130" y1="120" x2="130" y2="310"/>
          <line x1="170" y1="120" x2="170" y2="310"/>
          <line x1="210" y1="120" x2="210" y2="310"/>
          <line x1="250" y1="120" x2="250" y2="310"/>
          <line x1="290" y1="120" x2="290" y2="310"/>
        </g>
      </g>
    `;
  } else if (type === 'shrimp_salt') {
    // Glass shaker jar with coarse red-orange shrimp salt
    content = `
      <defs>
        <linearGradient id="saltBody" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#C24E1C"/>
          <stop offset="40%" stop-color="#E85E22"/>
          <stop offset="70%" stop-color="#FF7B3D"/>
          <stop offset="100%" stop-color="#A83C10"/>
        </linearGradient>
        <filter id="saltShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="6" dy="16" stdDeviation="12" flood-color="#152018" flood-opacity="0.38"/>
        </filter>
      </defs>
      <g filter="url(#saltShadow)">
        <rect x="125" y="110" width="150" height="230" rx="24" fill="url(#saltBody)"/>
        <!-- Salt granules and dried shrimp bits -->
        <g fill="#FFF0E6" opacity="0.65">
          <circle cx="150" cy="150" r="3.5"/><circle cx="180" cy="170" r="4"/><circle cx="230" cy="155" r="3"/><circle cx="210" cy="195" r="4.5"/>
          <circle cx="160" cy="225" r="4"/><circle cx="240" cy="240" r="3.5"/><circle cx="175" cy="280" r="5"/><circle cx="215" cy="290" r="4"/>
        </g>
        <g fill="#7A0000" opacity="0.4">
          <circle cx="170" cy="160" r="3"/><circle cx="220" cy="180" r="2.5"/><circle cx="150" cy="240" r="3.5"/><circle cx="190" cy="270" r="3"/>
        </g>
        <!-- Black matte lid -->
        <rect x="120" y="85" width="160" height="35" rx="10" fill="#263026" stroke="#151A15" stroke-width="2"/>
        <line x1="145" y1="110" x2="145" y2="330" stroke="#FFFFFF" stroke-width="6" opacity="0.2"/>
      </g>
    `;
  } else if (type === 'sate_jar') {
    // Red chili sate oil jar
    content = `
      <defs>
        <linearGradient id="sateGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#730C07"/>
          <stop offset="35%" stop-color="#B31A12"/>
          <stop offset="65%" stop-color="#E63920"/>
          <stop offset="100%" stop-color="#5E0905"/>
        </linearGradient>
        <filter id="sateShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="6" dy="16" stdDeviation="12" flood-color="#152018" flood-opacity="0.4"/>
        </filter>
      </defs>
      <g filter="url(#sateShadow)">
        <rect x="120" y="130" width="160" height="190" rx="26" fill="url(#sateGrad)"/>
        <!-- Golden fried garlic & shallot flakes -->
        <g fill="#FFAE42" opacity="0.75">
          <ellipse cx="160" cy="240" rx="8" ry="4" transform="rotate(15 160 240)"/>
          <ellipse cx="220" cy="260" rx="9" ry="5" transform="rotate(-20 220 260)"/>
          <ellipse cx="180" cy="285" rx="7" ry="4" transform="rotate(35 180 285)"/>
        </g>
        <!-- Gold metal lid -->
        <rect x="115" y="105" width="170" height="32" rx="8" fill="#D4AF37" stroke="#997C22" stroke-width="2"/>
        <line x1="140" y1="130" x2="140" y2="310" stroke="#FFFFFF" stroke-width="6" opacity="0.25"/>
      </g>
    `;
  } else if (type === 'jerky') {
    // Shredded beef or buffalo jerky pouch
    content = `
      <defs>
        <linearGradient id="pouchGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#3D120B"/>
          <stop offset="40%" stop-color="#5E1C12"/>
          <stop offset="70%" stop-color="#7D2619"/>
          <stop offset="100%" stop-color="#2E0C07"/>
        </linearGradient>
        <filter id="pouchShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="6" dy="16" stdDeviation="12" flood-color="#152018" flood-opacity="0.45"/>
        </filter>
      </defs>
      <g filter="url(#pouchShadow)">
        <path d="M 115,100 L 285,100 L 275,340 L 125,340 Z" fill="url(#pouchGrad)"/>
        <!-- Sealed top ridge -->
        <rect x="110" y="90" width="180" height="18" rx="4" fill="#B9955A"/>
        <!-- Window showing shredded jerky meat -->
        <rect x="145" y="180" width="110" height="90" rx="14" fill="#1C0502" stroke="#B9955A" stroke-width="2"/>
        <g stroke="#9E2A1B" stroke-width="3" stroke-linecap="round">
          <line x1="160" y1="200" x2="190" y2="240"/>
          <line x1="175" y1="210" x2="220" y2="230"/>
          <line x1="190" y1="220" x2="240" y2="260"/>
          <line x1="165" y1="240" x2="210" y2="255"/>
        </g>
      </g>
    `;
  } else {
    // Default gourmet box/tin
    content = `
      <defs>
        <linearGradient id="genGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${primaryColor || '#55634A'}"/>
          <stop offset="100%" stop-color="${secondaryColor || '#26372B'}"/>
        </linearGradient>
        <filter id="genShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="6" dy="16" stdDeviation="12" flood-color="#152018" flood-opacity="0.4"/>
        </filter>
      </defs>
      <g filter="url(#genShadow)">
        <rect x="115" y="115" width="170" height="210" rx="24" fill="url(#genGrad)" stroke="${accentColor || '#B9955A'}" stroke-width="2.5"/>
        <circle cx="200" cy="220" r="36" fill="${accentColor || '#B9955A'}" opacity="0.8"/>
        <text x="200" y="226" font-family="serif" font-size="16" fill="#FFFDF8" font-weight="bold" text-anchor="middle">VÙNG QUÊ</text>
      </g>
    `;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
    ${content}
  </svg>`;
}

// Generate all food items
const foodAssets = [
  // Dalat
  { file: 'public/images/foods/dalat/hong-say.png', type: 'persimmon' },
  { file: 'public/images/foods/dalat/tra-atiso.png', type: 'tea_tin' },
  { file: 'public/images/foods/dalat/mut-dau.png', type: 'jam_jar' },
  { file: 'public/images/foods/dalat/hat-macca.png', type: 'persimmon' },
  // Tay Ninh
  { file: 'public/images/foods/tay-ninh/banh-trang.png', type: 'rice_paper' },
  { file: 'public/images/foods/tay-ninh/muoi-tom.png', type: 'shrimp_salt' },
  { file: 'public/images/foods/tay-ninh/sa-te.png', type: 'sate_jar' },
  { file: 'public/images/foods/tay-ninh/bo-kho.png', type: 'jerky' },
  // Tay Bac
  { file: 'public/images/foods/tay-bac/thit-trau.png', type: 'jerky' },
  { file: 'public/images/foods/tay-bac/tra-shan-tuyet.png', type: 'tea_tin' },
  { file: 'public/images/foods/tay-bac/mac-khen.png', type: 'shrimp_salt' },
  { file: 'public/images/foods/tay-bac/mang-nua.png', type: 'rice_paper' },
  // Mien Tay
  { file: 'public/images/foods/mien-tay/banh-phong-tom.png', type: 'rice_paper' },
  { file: 'public/images/foods/mien-tay/kho-ca-loc.png', type: 'jerky' },
  { file: 'public/images/foods/mien-tay/mut-dua.png', type: 'jam_jar' },
  { file: 'public/images/foods/mien-tay/mang-cau.png', type: 'persimmon' },
  // Hue
  { file: 'public/images/foods/hue/tra-sen.png', type: 'tea_tin' },
  { file: 'public/images/foods/hue/mut-sen.png', type: 'jam_jar' },
  { file: 'public/images/foods/hue/me-xung.png', type: 'rice_paper' },
  { file: 'public/images/foods/hue/banh-phuc-linh.png', type: 'persimmon' },
  // Phu Quoc
  { file: 'public/images/foods/phu-quoc/tieu-chin-do.png', type: 'shrimp_salt' },
  { file: 'public/images/foods/phu-quoc/dau-phong-chou-chou.png', type: 'jam_jar' },
  { file: 'public/images/foods/phu-quoc/kho-muc.png', type: 'jerky' },
  { file: 'public/images/foods/phu-quoc/keo-sim.png', type: 'persimmon' },
];

foodAssets.forEach(item => {
  const dir = path.dirname(item.file);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const svg = createRealisticFoodSVG({ type: item.type });
  // Write as SVG (Three.js TextureLoader handles SVG data natively as texture)
  fs.writeFileSync(item.file, svg, 'utf-8');
});

console.log(`Generated ${foodAssets.length} transparent food assets.`);
