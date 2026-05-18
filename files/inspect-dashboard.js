const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ storageState: '.auth/admin.json' });
  const page = await context.newPage();
  
  await page.goto('https://qastaging.pushengage.com/wp-admin/admin.php?page=ledgerport');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2500);
  
  // Check "View report" button
  const viewReport = await page.getByRole('button', { name: /View report/i }).count();
  console.log('View report button count:', viewReport);
  
  // Check all buttons in the Orders card area
  const allButtons = await page.locator('#wpcontent button').allInnerTexts();
  console.log('All wpcontent buttons:', allButtons.filter(t => t).slice(0, 20));
  
  // Check orders card section
  const ordersCard = await page.locator('text=/Orders/i').allInnerTexts();
  console.log('Elements with Orders text:', ordersCard.slice(0, 5));
  
  // Check button with "report" anywhere
  const reportBtns = await page.locator('button').filter({ hasText: /report/i }).allInnerTexts();
  console.log('Buttons with report:', reportBtns);
  
  await browser.close();
})().catch(console.error);
