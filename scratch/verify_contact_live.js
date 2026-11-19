const { chromium } = require('E:/projects/Suffix_IT/practice/Suffix-IT/node_modules/playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  console.log('Navigating to http://localhost:3000/contact...');
  await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Scroll to map iframe
  await page.evaluate(() => {
    const iframe = document.querySelector('iframe');
    if (iframe) iframe.scrollIntoView({ behavior: 'instant', block: 'center' });
  });

  await page.waitForTimeout(4000);

  const shotPath = path.resolve('scratch', 'live_contact_map.png');
  await page.screenshot({ path: shotPath });
  console.log('Screenshot saved to', shotPath);

  await browser.close();
})();
