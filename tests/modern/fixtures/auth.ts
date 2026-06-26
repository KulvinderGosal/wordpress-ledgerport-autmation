import { test as base, Page, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

// Cache the admin storage state in a sibling .auth/ folder so the very first
// test does the login and subsequent tests reuse cookies.
const STORAGE_DIR = path.resolve(__dirname, '../.auth');
const STORAGE_PATH = path.join(STORAGE_DIR, 'wp-admin.json');

export function adminCredsAvailable(): boolean {
  return Boolean(process.env.WP_ADMIN_USER && process.env.WP_ADMIN_PASS);
}

export function skipUnlessLoggedIn(testHandle: typeof base): void {
  testHandle.skip(
    !adminCredsAvailable(),
    'WP_ADMIN_USER / WP_ADMIN_PASS not set — admin-side tests need them.',
  );
}

export async function wpLogin(page: Page): Promise<void> {
  if (!adminCredsAvailable()) {
    throw new Error('WP admin creds missing — check envs/staging.env');
  }
  await page.goto('/wp-login.php');
  await page.fill('#user_login', process.env.WP_ADMIN_USER!);
  await page.fill('#user_pass',  process.env.WP_ADMIN_PASS!);
  await page.click('#wp-submit');
  await expect(page).toHaveURL(/wp-admin/);
}

export const test = base.extend<{ adminPage: Page }>({
  adminPage: async ({ browser }, use, testInfo) => {
    if (!adminCredsAvailable()) {
      testInfo.skip(true, 'WP admin creds not available — skipping admin test');
      return;
    }
    if (!fs.existsSync(STORAGE_DIR)) fs.mkdirSync(STORAGE_DIR, { recursive: true });

    let context;
    if (fs.existsSync(STORAGE_PATH)) {
      context = await browser.newContext({ storageState: STORAGE_PATH });
    } else {
      context = await browser.newContext();
      const page = await context.newPage();
      await wpLogin(page);
      await context.storageState({ path: STORAGE_PATH });
      await page.close();
    }
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});

export { expect } from '@playwright/test';
