import { chromium, FullConfig } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

const AUTH_FILE = path.join(__dirname, '.auth', 'admin.json');

async function globalSetup(_config: FullConfig) {
  fs.mkdirSync(path.join(__dirname, '.auth'), { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://qastaging.pushengage.com/wp-login.php');
  await page.waitForSelector('#user_login', { state: 'visible' });
  await page.locator('#user_login').click({ clickCount: 3 });
  await page.locator('#user_login').fill('kgosal');
  await page.locator('#user_pass').click();
  await page.locator('#user_pass').pressSequentially('!letmeIn@123=', { delay: 30 });
  await page.locator('#wp-submit').click();
  await page.waitForURL(/wp-admin/, { timeout: 30000 });

  await context.storageState({ path: AUTH_FILE });
  await browser.close();
}

export default globalSetup;
