const { chromium } = require('C:/Users/ashik/AppData/Local/npm-cache/_npx/af752b90495482d7/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  console.log('1. First landing on site...');
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(400);

  // Check if session storage has flag
  let seen = await page.evaluate(() => sessionStorage.getItem('suffix_hero_intro_seen'));
  console.log('Session storage on first mount:', seen);

  // Wait 1.6s for intro to finish
  await page.waitForTimeout(1600);
  seen = await page.evaluate(() => sessionStorage.getItem('suffix_hero_intro_seen'));
  console.log('Session storage after intro finished:', seen);

  // 2. Navigate to About
  console.log('2. Navigating to About page...');
  await page.goto('http://localhost:3000/about', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(600);

  // 3. Return to Home page
  console.log('3. Returning to Home page...');
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  
  // Check immediately (50ms after load)
  await page.waitForTimeout(50);
  const heroHeading = await page.locator('h1').textContent();
  console.log('Immediate Hero H1 text on return:', heroHeading ? heroHeading.trim() : 'none');
  
  await page.screenshot({ path: 'scratch/test_return_home_instant.png' });
  console.log('Saved test_return_home_instant.png');

  await browser.close();
})();
