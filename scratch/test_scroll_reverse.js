const { chromium } = require('C:/Users/ashik/AppData/Local/npm-cache/_npx/af752b90495482d7/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3500);

  const products = await page.locator('#products');
  const box = await products.boundingBox();
  const scrollDistance = box.height - 900;

  // Scroll down to industries
  const yHandoff = box.y + scrollDistance;
  await page.evaluate((y) => window.scrollTo(0, y), yHandoff);
  await page.waitForTimeout(500);

  // Now scroll BACK UP to midway (progress = 0.85)
  const yReverseMid = box.y + scrollDistance * 0.85;
  await page.evaluate((y) => window.scrollTo(0, y), yReverseMid);
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'scratch/stage_reverse_mid.png' });
  console.log('Saved stage_reverse_mid.png');

  // Now scroll BACK UP to horizontal end (progress = 0.70)
  const yReverseEnd = box.y + scrollDistance * 0.70;
  await page.evaluate((y) => window.scrollTo(0, y), yReverseEnd);
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'scratch/stage_reverse_end.png' });
  console.log('Saved stage_reverse_end.png');

  await browser.close();
})();
