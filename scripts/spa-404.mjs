// GitHub Pages has no SPA rewrites: serving index.html as 404.html makes
// deep links like /blog/cnn work on refresh.
import { copyFileSync } from 'node:fs';
copyFileSync('dist/index.html', 'dist/404.html');
console.log('dist/404.html created');
