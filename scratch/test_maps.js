const { chromium } = require('E:/projects/Suffix_IT/practice/Suffix-IT/node_modules/playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1200, height: 600 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  const tests = [
    { id: '1_coords_clean', q: 'https://maps.google.com/maps?q=23.78411,90.42547&hl=en&z=16&output=embed' },
    { id: '2_coords_z17', q: 'https://maps.google.com/maps?q=23.78411,90.42547&hl=en&z=17&output=embed' },
    { id: '3_coords_suffix', q: 'https://maps.google.com/maps?q=23.78411,90.42547+(Suffix+IT+Limited)&hl=en&z=16&output=embed' },
    { id: '4_rupayan_badda', q: 'https://maps.google.com/maps?q=Rupayan+Millennium+Square,+North+Badda,+Dhaka&hl=en&z=16&output=embed' }
  ];

  for (const t of tests) {
    const html = `<!DOCTYPE html>
<html>
<head><style>body { margin:0; padding:0; background:#f0f0f0; }</style></head>
<body>
  <iframe id="mapFrame" src="${t.q}" width="1200" height="600" style="border:0;" allowfullscreen loading="eager"></iframe>
</body>
</html>`;
    const htmlPath = path.resolve('scratch', `map_${t.id}.html`);
    fs.writeFileSync(htmlPath, html);
    await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'load' });
    await page.waitForTimeout(4500);
    const shotPath = path.resolve('scratch', `result_${t.id}.png`);
    await page.screenshot({ path: shotPath });
    console.log('Saved screenshot for', t.id, 'size:', fs.statSync(shotPath).size);
  }

  await browser.close();
  console.log('Finished testing maps');
})();
