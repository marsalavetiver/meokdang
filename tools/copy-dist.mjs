// 앱인토스 번들용 dist 폴더를 만든다. 원본 사이트 파일은 건드리지 않는다.
import { rmSync, mkdirSync, cpSync, readFileSync, writeFileSync } from 'node:fs';
import { build } from 'esbuild';

const out = 'dist';
rmSync(out, { recursive: true, force: true });
mkdirSync(out);
for (const f of ['styles.css', 'app.js']) cpSync(f, `${out}/${f}`);
for (const d of ['data', 'assets']) cpSync(d, `${out}/${d}`, { recursive: true });

await build({
  entryPoints: ['tools/ait-bridge.js'],
  bundle: true,
  format: 'iife',
  target: ['es2018', 'safari13'],
  minify: true,
  outfile: `${out}/ait-bridge.js`,
});

let html = readFileSync('index.html', 'utf8');
html = html.replace('<script src="data/foods.js"></script>', '<script src="ait-bridge.js"></script>\n<script src="data/foods.js"></script>');
if (!html.includes('ait-bridge.js')) throw new Error('index.html에 스크립트 자리를 찾지 못했어요');
writeFileSync(`${out}/index.html`, html);
console.log('dist 준비 완료');
