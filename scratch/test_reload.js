const { chromium } = require('E:/projects/Suffix_IT/practice/Suffix-IT/node_modules/playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'commit' });

  // Take rapid screenshots during reload
  const times = [50, 150, 300, 600, 1000];
  for (const t of times) {
    await page.waitForTimeout(t === 50 ? 50 : (t - times[times.indexOf(t) - 1]));
    const out = path.resolve('scratch', `hero_reload_${t}ms.png`);
    await page.screenshot({ path: out });
    console.log(`Saved screenshot at ${t}ms`);
  }

  await browser.close();
})();
