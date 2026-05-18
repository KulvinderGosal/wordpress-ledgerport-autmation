import { Page } from '@playwright/test';

export const TEST_CONFIG = {
  baseURL:  'https://qastaging.pushengage.com',
  username: 'kgosal',
  password: '!letmeIn@123=',
  loginURL: '/wp-login.php',
};

/**
 * Correct WP admin page slugs (verified against live staging site).
 * The slugs for Manual Sync, Audit Logs, and Sync Config differ from the
 * human-readable names shown in the sidebar.
 */
export const PLUGIN_PAGES = {
  dashboard:  '/wp-admin/admin.php?page=ledgerport',
  connection: '/wp-admin/admin.php?page=ledgerport-connection',
  mappings:   '/wp-admin/admin.php?page=ledgerport-mappings',
  manualSync: '/wp-admin/admin.php?page=ledgerport-push',
  auditLogs:  '/wp-admin/admin.php?page=ledgerport-logs',
  syncConfig: '/wp-admin/admin.php?page=ledgerport-settings',
  debugLogs:  '/wp-admin/admin.php?page=ledgerport-debug-logs',
};

export async function loginAsAdmin(page: Page): Promise<void> {
  // Navigate directly to wp-admin — session cookies (from storageState) mean
  // WP serves the admin page directly; if the session is invalid it redirects to login.
  await page.goto(TEST_CONFIG.baseURL + '/wp-admin/');
  await page.waitForLoadState('domcontentloaded');

  if (!page.url().includes('wp-login')) return; // already authenticated

  // Manual fallback: fill credentials and submit
  await page.waitForSelector('#user_login', { state: 'visible', timeout: 10000 });
  await page.locator('#user_login').click({ clickCount: 3 });
  await page.waitForTimeout(200);
  await page.locator('#user_login').fill(TEST_CONFIG.username);

  // Verify username was entered correctly
  const usernameVal = await page.locator('#user_login').inputValue();
  if (usernameVal !== TEST_CONFIG.username) {
    await page.locator('#user_login').click({ clickCount: 3 });
    await page.locator('#user_login').fill(TEST_CONFIG.username);
  }

  await page.locator('#user_pass').click({ clickCount: 3 });
  await page.locator('#user_pass').fill(TEST_CONFIG.password);
  await page.locator('#wp-submit').click();
  await page.waitForURL(/wp-admin/, { timeout: 30000 });
}

export async function goToPluginPage(page: Page, path: string): Promise<void> {
  await page.goto(TEST_CONFIG.baseURL + path);
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1500);
}
