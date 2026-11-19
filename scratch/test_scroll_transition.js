const { chromium } = require('C:/Users/ashik/AppData/Local/npm-cache/_npx/af752b90495482d7/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Wait for hero reveal to settle
  await page.waitForTimeout(3500);

  // Get products element
  const products = await page.locator('#products');
  const box = await products.boundingBox();
  console.log('Products box settled:', box);
  const scrollDistance = box.height - 900;

  // 1. Horizontal scroll end (progress ~ 0.70)
  const yEnd = box.y + scrollDistance * 0.70;
  await page.evaluate((y) => window.scrollTo(0, y), yEnd);
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'scratch/stage1_horizontal_end.png' });

  // 2. Early expand (progress ~ 0.78)
  const yEarly = box.y + scrollDistance * 0.78;
  await page.evaluate((y) => window.scrollTo(0, y), yEarly);
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'scratch/stage2_early_expand.png' });

  // 3. Mid expand (progress ~ 0.88)
  const yMid = box.y + scrollDistance * 0.88;
  await page.evaluate((y) => window.scrollTo(0, y), yMid);
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'scratch/stage3_mid_expand.png' });

  // 4. Almost full expand (progress ~ 0.96)
  const yFull = box.y + scrollDistance * 0.96;
  await page.evaluate((y) => window.scrollTo(0, y), yFull);
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'scratch/stage4_almost_full.png' });

  // 5. Normal Industries Section (progress >= 1.0)
  const yNormal = box.y + scrollDistance + 100;
  await page.evaluate((y) => window.scrollTo(0, y), yNormal);
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'scratch/stage5_normal_industries.png' });

  // 6. Scrolling down into cards of Industries
  const yCards = box.y + scrollDistance + 500;
  await page.evaluate((y) => window.scrollTo(0, y), yCards);
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'scratch/stage6_scrolling_down_industries.png' });

  console.log('All 6 stages captured successfully!');
  await browser.close();
})();
