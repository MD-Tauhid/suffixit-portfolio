const { chromium } = require('E:/projects/Suffix_IT/practice/Suffix-IT/node_modules/playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  const url = 'https://maps.google.com/maps?q=Rupayan+Millennium+Square,+North+Badda,+Dhaka&t=&z=15&ie=UTF8&iwloc=&output=embed';
  const html = `<!DOCTYPE html><html><body style="margin:0"><iframe src="${url}" width="1200" height="420" style="border:0"></iframe></body></html>`;
  fs.writeFileSync('scratch/test_z15.html', html);

  await page.goto('file:///' + path.resolve('scratch/test_z15.html').replace(/\\/g, '/'), { waitUntil: 'load' });
  await page.waitForTimeout(4000);
  await page.screenshot({ path: 'scratch/test_z15.png' });
  await browser.close();
  console.log('Saved test_z15.png');
})();
