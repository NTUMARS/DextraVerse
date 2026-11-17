// Static hosts serve /page/ from page/index.html. The export writes page.html,
// so give every exported page a directory copy as well.
import { copyFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const out = 'dist/client';
for (const file of readdirSync(out)) {
  if (!file.endsWith('.html') || file === 'index.html' || file === '404.html') continue;
  const dir = join(out, file.slice(0, -'.html'.length));
  mkdirSync(dir, { recursive: true });
  copyFileSync(join(out, file), join(dir, 'index.html'));
}
