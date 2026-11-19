const { chromium } = require('C:/Users/ashik/AppData/Local/npm-cache/_npx/af752b90495482d7/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  const products = await page.locator('#products');
  const box = await products.boundingBox();
  const scrollDistance = box.height - 900;
  const START_EXPAND = 0.70;
  const END_EXPAND = 0.985;

  console.log(`Products box height: ${box.height}, scrollDistance: ${scrollDistance}`);

  // 1. Scroll forward to just at 62% ratio (rawProgress = 0.70 + 0.62 * 0.285 = 0.8767)
  const y62 = box.y + scrollDistance * (START_EXPAND + 0.62 * (END_EXPAND - START_EXPAND));
  console.log(`Scrolling down to trigger forward auto-snap at y: ${y62}`);
  
  // Simulate user scrolling down
  await page.evaluate((y) => {
    window.scrollTo(0, y - 50);
  }, y62);
  await page.waitForTimeout(100);
  await page.evaluate((y) => {
    window.scrollTo(0, y);
  }, y62);
  
  // Wait for smooth scroll to glide down to 100%
  await page.waitForTimeout(1500);
  
  const scrollYAfterForward = await page.evaluate(() => window.scrollY);
  console.log(`ScrollY after forward auto-snap: ${scrollYAfterForward} (Target full: ${box.y + scrollDistance})`);
  await page.screenshot({ path: 'scratch/test_snap_down_result.png' });

  // 2. Now simulate scrolling back UP:
  // First scroll into transition zone, around 75% ratio (above 58%)
  const y75 = box.y + scrollDistance * (START_EXPAND + 0.75 * (END_EXPAND - START_EXPAND));
  await page.evaluate((y) => {
    window.scrollTo(0, y);
  }, y75);
  await page.waitForTimeout(300);

  // Now scroll UP past 58% threshold to 52% ratio (triggering reverse auto-snap)
  const y52 = box.y + scrollDistance * (START_EXPAND + 0.52 * (END_EXPAND - START_EXPAND));
  console.log(`Scrolling UP to trigger reverse auto-snap at y: ${y52}`);
  
  // Simulate upward scroll action
  await page.evaluate((y) => {
    window.scrollTo(0, y + 40);
  }, y52);
  await page.waitForTimeout(100);
  await page.evaluate((y) => {
    window.scrollTo(0, y);
  }, y52);

  // Wait for smooth scroll to glide all the way back to Products
  await page.waitForTimeout(1500);

  const scrollYAfterReverse = await page.evaluate(() => window.scrollY);
  const targetReverseY = box.y + scrollDistance * (START_EXPAND - 0.002);
  console.log(`ScrollY after reverse auto-snap: ${scrollYAfterReverse} (Target Products: ~${targetReverseY})`);
  await page.screenshot({ path: 'scratch/test_snap_up_result.png' });

  await browser.close();
  console.log('Bidirectional auto-snap test completed successfully!');
})();
