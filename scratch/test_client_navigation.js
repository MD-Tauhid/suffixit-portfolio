const { chromium } = require('C:/Users/ashik/AppData/Local/npm-cache/_npx/af752b90495482d7/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  console.log('1. First landing on site...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1600); // wait for intro to finish

  // 2. Click About link in the header navbar (Client SPA navigation)
  console.log('2. Clicking About link in header navbar...');
  const aboutLink = page.locator('header a[href="/about"]').first();
  await aboutLink.click();
  await page.waitForURL('**/about');
  console.log('Navigated to About page successfully via client router.');
  await page.waitForTimeout(500);

  // 3. Click Home link in the header navbar
  console.log('3. Clicking Home link in header navbar...');
  const homeLink = page.locator('header a[href="/"]').first();
  await homeLink.click();
  await page.waitForURL('http://localhost:3000/');
  
  // Take screenshot 50ms after arriving back at Home
  await page.waitForTimeout(50);
  await page.screenshot({ path: 'scratch/test_real_click_return.png' });
  console.log('Saved test_real_click_return.png');

  // Check if H1 is visible
  const isH1Visible = await page.locator('h1').isVisible();
  console.log('Is Hero H1 visible immediately upon return?', isH1Visible);

  await browser.close();
})();
