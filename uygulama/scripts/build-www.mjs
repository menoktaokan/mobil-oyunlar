// Oyunları uygulamaya gömülecek "www" klasörüne kopyalar.
// İnternete ihtiyaç kalmasın diye three.js ve yazı tipleri yerel dosyalara çevrilir.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const here = path.dirname(fileURLToPath(import.meta.url));
const APP = path.resolve(here, '..');
const ROOT = path.resolve(APP, '..');
const WWW = path.join(APP, 'www');
const NM = path.join(APP, 'node_modules');
const require = createRequire(path.join(APP, 'package.json'));

const SUBSETS = ['latin', 'latin-ext'];           // Türkçe karakterler latin-ext içinde
const slug = fam => fam.toLowerCase().replace(/\s+/g, '-');

fs.rmSync(WWW, { recursive: true, force: true });
fs.mkdirSync(path.join(WWW, 'fonts'), { recursive: true });
fs.mkdirSync(path.join(WWW, 'vendor'), { recursive: true });

// --- three.js r128
fs.copyFileSync(path.join(NM, 'three/build/three.min.js'), path.join(WWW, 'vendor/three.min.js'));

// --- yazı tipleri: Google Fonts bağlantılarındaki aile + kalınlıkları topla
const faces = new Map();                          // "Karla" -> Set(400,500)
function collectFonts(html) {
  for (const m of html.matchAll(/https:\/\/fonts\.googleapis\.com\/css2\?([^"']+)/g)) {
    const q = m[1].replace(/&amp;/g, '&');
    for (const part of q.split('&')) {
      if (!part.startsWith('family=')) continue;
      const [famRaw, spec] = decodeURIComponent(part.slice(7)).split(':');
      const fam = famRaw.replace(/\+/g, ' ');
      const weights = spec && spec.startsWith('wght@') ? spec.slice(5).split(';').map(Number) : [400];
      if (!faces.has(fam)) faces.set(fam, new Set());
      weights.forEach(w => faces.get(fam).add(w));
    }
  }
}

// --- oyun listesi: başlangıç sayfasındaki kartlardan
const launcher = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const games = [...launcher.matchAll(/href="([a-z0-9-]+)\/"/g)].map(m => m[1]);
if (!games.length) throw new Error('Oyun bağlantısı bulunamadı');

function localize(html, depth) {
  const up = depth ? '../' : '';
  collectFonts(html);
  html = html.replace(/<link rel="preconnect"[^>]*>\n?/g, '');
  html = html.replace(/<link[^>]+href="https:\/\/fonts\.googleapis\.com\/css2[^"]*"[^>]*>/g,
    `<link rel="stylesheet" href="${up}fonts/fonts.css">`);
  html = html.replace(/https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/three\.js\/r128\/three\.min\.js/g,
    `${up}vendor/three.min.js`);
  return html;
}

const leftovers = [];
function check(name, html) {
  const ext = [...html.matchAll(/(?:src|href)\s*=\s*["']?(https?:\/\/[^"' >]+)/g)].map(m => m[1]);
  if (ext.length) leftovers.push(`${name}: ${ext.join(', ')}`);
}

// başlangıç sayfası
let home = localize(launcher, 0);
home = home.replace(/href="([a-z0-9-]+)\/"/g, 'href="$1/index.html"');
home = home.replace(/<footer>[\s\S]*?<\/footer>/, '<footer>İnternet gerekmez; rekorlar telefonunda saklanır.</footer>');
check('index.html', home);
fs.writeFileSync(path.join(WWW, 'index.html'), home);

for (const g of games) {
  const src = path.join(ROOT, g, 'index.html');
  let html = localize(fs.readFileSync(src, 'utf8'), 1);
  // "Oyunlar" düğmesi klasör yerine dosyaya gitsin (uygulama sunucusu klasör adresini çözmez)
  html = html.replace(/location\.protocol === 'file:' \? '\.\.\/index\.html' : '\.\.\/'/g, "'../index.html'");
  check(`${g}/index.html`, html);
  fs.mkdirSync(path.join(WWW, g), { recursive: true });
  fs.writeFileSync(path.join(WWW, g, 'index.html'), html);
}

// @font-face kuralları + woff2 dosyaları
let css = '/* Uygulamaya gömülü yazı tipleri (Fontsource, SIL OFL) */\n';
const missing = [];
for (const [fam, ws] of faces) {
  const pkg = path.join(NM, '@fontsource', slug(fam));
  if (!fs.existsSync(pkg)) { missing.push(fam); continue; }
  const uni = JSON.parse(fs.readFileSync(path.join(pkg, 'unicode.json'), 'utf8'));
  for (const w of [...ws].sort()) {
    for (const sub of SUBSETS) {
      const file = `${slug(fam)}-${sub}-${w}-normal.woff2`;
      const from = path.join(pkg, 'files', file);
      if (!fs.existsSync(from)) { if (sub === 'latin') missing.push(`${fam} ${w}`); continue; }
      fs.copyFileSync(from, path.join(WWW, 'fonts', file));
      css += `@font-face{font-family:'${fam}';font-style:normal;font-display:swap;font-weight:${w};` +
             `src:url(./${file}) format('woff2');unicode-range:${uni[sub]}}\n`;
    }
  }
}
fs.writeFileSync(path.join(WWW, 'fonts', 'fonts.css'), css);

if (missing.length) throw new Error('Eksik yazı tipi paketi: ' + missing.join(', '));
if (leftovers.length) throw new Error('İnternete bağlı kalan adresler:\n' + leftovers.join('\n'));
const n = fs.readdirSync(path.join(WWW, 'fonts')).length - 1;
console.log(`www hazır: ${games.length} oyun, ${faces.size} yazı tipi ailesi, ${n} dosya`);
