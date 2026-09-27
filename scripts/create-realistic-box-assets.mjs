import fs from 'fs';
import path from 'path';

function createRealisticBoxSVG({ name, color, lidColor, accentColor, isOpen }) {
  const content = isOpen ? `
    <defs>
      <linearGradient id="boxOuter" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${color}"/>
        <stop offset="100%" stop-color="#152018"/>
      </linearGradient>
      <linearGradient id="kraftBed" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#D8C2A0"/>
        <stop offset="50%" stop-color="#EADBCE"/>
        <stop offset="100%" stop-color="#C2AB89"/>
      </linearGradient>
      <filter id="boxShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="8" dy="24" stdDeviation="16" flood-color="#152018" flood-opacity="0.5"/>
      </filter>
    </defs>
    <g filter="url(#boxShadow)">
      <!-- Open Lid Propped behind -->
      <polygon points="120,60 380,40 480,140 220,160" fill="${lidColor}" stroke="${accentColor}" stroke-width="2"/>
      <line x1="220" y1="160" x2="480" y2="140" stroke="${accentColor}" stroke-width="4"/>
      <!-- Inner tray / Shredded kraft paper bed -->
      <polygon points="100,160 360,140 470,230 210,250" fill="url(#kraftBed)"/>
      <!-- Outer Tray Front & Left walls -->
      <polygon points="90,170 210,260 210,340 90,250" fill="${color}" opacity="0.95"/>
      <polygon points="210,260 480,230 480,310 210,340" fill="${color}"/>
      <!-- Gold Ribbon Bands wrapping box -->
      <polygon points="140,207 160,222 160,302 140,287" fill="${accentColor}"/>
      <polygon points="330,247 350,245 350,325 330,327" fill="${accentColor}"/>
      <!-- Brand Seal Medallion in Front -->
      <circle cx="210" cy="300" r="22" fill="${accentColor}" stroke="#FFFDF8" stroke-width="2"/>
      <text x="210" y="305" font-family="serif" font-size="10" fill="#26372B" font-weight="bold" text-anchor="middle">VÙNG QUÊ</text>
    </g>
  ` : `
    <defs>
      <linearGradient id="boxClosedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${color}"/>
        <stop offset="100%" stop-color="#152018"/>
      </linearGradient>
      <filter id="boxClosedShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="8" dy="24" stdDeviation="16" flood-color="#152018" flood-opacity="0.5"/>
      </filter>
    </defs>
    <g filter="url(#boxClosedShadow)">
      <!-- Closed Top Lid -->
      <polygon points="110,120 370,100 480,190 220,210" fill="${lidColor}" stroke="${accentColor}" stroke-width="2"/>
      <!-- Sides -->
      <polygon points="110,120 220,210 220,310 110,220" fill="${color}" opacity="0.9"/>
      <polygon points="220,210 480,190 480,290 220,310" fill="${color}"/>
      <!-- Gold Ribbon Bow on top -->
      <ellipse cx="300" cy="155" rx="30" ry="14" fill="${accentColor}" transform="rotate(-15 300 155)"/>
      <ellipse cx="290" cy="155" rx="30" ry="14" fill="${accentColor}" transform="rotate(35 290 155)"/>
      <circle cx="295" cy="155" r="9" fill="#FFFDF8"/>
    </g>
  `;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="420" viewBox="0 0 600 420">
    ${content}
  </svg>`;
}

const boxAssets = [
  { region: 'dalat', name: 'Đà Lạt', color: '#2F3D2C', lidColor: '#1F291C', accent: '#D4AF37' },
  { region: 'tay-ninh', name: 'Tây Ninh', color: '#6B351C', lidColor: '#4A2312', accent: '#E28B5E' },
  { region: 'tay-bac', name: 'Tây Bắc', color: '#221C18', lidColor: '#171310', accent: '#A89279' },
  { region: 'mien-tay', name: 'Miền Tây', color: '#39251A', lidColor: '#261810', accent: '#D48B38' },
  { region: 'hue', name: 'Huế', color: '#351E33', lidColor: '#241423', accent: '#D4AF37' },
  { region: 'phu-quoc', name: 'Phú Quốc', color: '#122A34', lidColor: '#0C1C23', accent: '#5C94A6' },
];

boxAssets.forEach(b => {
  const dir = `public/images/boxes/${b.region}`;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const openSvg = createRealisticBoxSVG({ name: b.name, color: b.color, lidColor: b.lidColor, accentColor: b.accent, isOpen: true });
  fs.writeFileSync(`${dir}/box-open.png`, openSvg, 'utf-8');

  const closedSvg = createRealisticBoxSVG({ name: b.name, color: b.color, lidColor: b.lidColor, accentColor: b.accent, isOpen: false });
  fs.writeFileSync(`${dir}/box-closed.png`, closedSvg, 'utf-8');
});

console.log('Generated all open and closed realistic box assets.');
