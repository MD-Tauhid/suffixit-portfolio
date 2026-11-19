const { chromium } = require('E:/projects/Suffix_IT/practice/Suffix-IT/node_modules/playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  const options = [
    { name: 'opt_coords_16', url: 'https://maps.google.com/maps?q=23.78411,90.42547&t=&z=16&ie=UTF8&iwloc=&output=embed' },
    { name: 'opt_rupayan_badda_16', url: 'https://maps.google.com/maps?q=Rupayan+Millennium+Square,+North+Badda,+Dhaka&t=&z=16&ie=UTF8&iwloc=&output=embed' },
    { name: 'opt_coords_17', url: 'https://maps.google.com/maps?q=23.78411,90.42547&t=&z=17&ie=UTF8&iwloc=&output=embed' },
    { name: 'opt_rupayan_badda_17', url: 'https://maps.google.com/maps?q=Rupayan+Millennium+Square,+North+Badda,+Dhaka&t=&z=17&ie=UTF8&iwloc=&output=embed' },
    { name: 'opt_named_pin', url: 'https://maps.google.com/maps?q=23.78411,90.42547+(Suffix+IT+Limited+-+Rupayan+Millennium+Square)&t=&z=16&ie=UTF8&iwloc=&output=embed' },
  ];

  for (const opt of options) {
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { margin: 0; background: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; padding: 40px; }
    .card { width: 1100px; border-radius: 24px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
    .header { padding: 20px 28px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; font-weight: 700; font-size: 16px; color: #0f172a; }
    .map-wrap { position: relative; width: 100%; height: 420px; background: #e2e8f0; }
    iframe { width: 100%; height: 100%; border: 0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">Suffix IT Limited · Dhaka Campus (Test: ${opt.name})</div>
    <div class="map-wrap">
      <iframe src="${opt.url}" loading="eager"></iframe>
    </div>
  </div>
</body>
</html>`;
    const tempHtml = path.resolve('scratch', `${opt.name}.html`);
    fs.writeFileSync(tempHtml, html);

    await page.goto('file:///' + tempHtml.replace(/\\/g, '/'), { waitUntil: 'load' });
    await page.waitForTimeout(4000);
    const shotPath = path.resolve('scratch', `${opt.name}.png`);
    await page.screenshot({ path: shotPath });
    console.log('Saved', opt.name);
  }

  await browser.close();
  console.log('All options tested.');
})();
