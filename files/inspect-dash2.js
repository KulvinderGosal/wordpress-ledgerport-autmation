const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ storageState: '.auth/admin.json' });
  const page = await context.newPage();
  
  await page.goto('https://qastaging.pushengage.com/wp-admin/admin.php?page=ledgerport');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(5000);  // longer wait
  
  // Check ALL buttons in wpcontent
  const allBtns = await page.locator('#wpcontent button').all();
  console.log('Total buttons:', allBtns.length);
  for (const btn of allBtns) {
    const text = (await btn.innerText()).trim();
    const aria = await btn.getAttribute('aria-label') || '';
    if (text || aria) console.log(`BTN: "${text}" aria="${aria}"`);
  }
  
  // Get all text on the stat cards section
  const statArea = await page.locator('#wpcontent').innerText();
  const lines = statArea.split('\n').filter(l => l.trim()).slice(0, 60);
  lines.forEach((l, i) => console.log(`[${i}] ${l.trim()}`));
  
  await browser.close();
})().catch(console.error);
