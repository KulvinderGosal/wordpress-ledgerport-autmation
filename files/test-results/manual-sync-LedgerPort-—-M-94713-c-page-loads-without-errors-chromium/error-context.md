# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: manual-sync.spec.ts >> LedgerPort — Manual Sync (Send to QuickBooks) >> Manual Sync page loads without errors
- Location: tests/manual-sync.spec.ts:18:7

# Error details

```
Error: page.goto: net::ERR_INTERNET_DISCONNECTED at https://qastaging.pushengage.com/wp-admin/
Call log:
  - navigating to "https://qastaging.pushengage.com/wp-admin/", waiting until "load"

```

# Test source

```ts
  1  | import { Page } from '@playwright/test';
  2  | 
  3  | export const TEST_CONFIG = {
  4  |   baseURL:  'https://qastaging.pushengage.com',
  5  |   username: 'kgosal',
  6  |   password: '!letmeIn@123=',
  7  |   loginURL: '/wp-login.php',
  8  | };
  9  | 
  10 | /**
  11 |  * Correct WP admin page slugs (verified against live staging site).
  12 |  * The slugs for Manual Sync, Audit Logs, and Sync Config differ from the
  13 |  * human-readable names shown in the sidebar.
  14 |  */
  15 | export const PLUGIN_PAGES = {
  16 |   dashboard:  '/wp-admin/admin.php?page=ledgerport',
  17 |   connection: '/wp-admin/admin.php?page=ledgerport-connection',
  18 |   mappings:   '/wp-admin/admin.php?page=ledgerport-mappings',
  19 |   manualSync: '/wp-admin/admin.php?page=ledgerport-push',
  20 |   auditLogs:  '/wp-admin/admin.php?page=ledgerport-logs',
  21 |   syncConfig: '/wp-admin/admin.php?page=ledgerport-settings',
  22 |   debugLogs:  '/wp-admin/admin.php?page=ledgerport-debug-logs',
  23 | };
  24 | 
  25 | export async function loginAsAdmin(page: Page): Promise<void> {
  26 |   // Navigate directly to wp-admin — session cookies (from storageState) mean
  27 |   // WP serves the admin page directly; if the session is invalid it redirects to login.
> 28 |   await page.goto(TEST_CONFIG.baseURL + '/wp-admin/');
     |              ^ Error: page.goto: net::ERR_INTERNET_DISCONNECTED at https://qastaging.pushengage.com/wp-admin/
  29 |   await page.waitForLoadState('domcontentloaded');
  30 | 
  31 |   if (!page.url().includes('wp-login')) return; // already authenticated
  32 | 
  33 |   // Manual fallback: fill credentials and submit
  34 |   await page.waitForSelector('#user_login', { state: 'visible', timeout: 10000 });
  35 |   await page.locator('#user_login').click({ clickCount: 3 });
  36 |   await page.waitForTimeout(200);
  37 |   await page.locator('#user_login').fill(TEST_CONFIG.username);
  38 | 
  39 |   // Verify username was entered correctly
  40 |   const usernameVal = await page.locator('#user_login').inputValue();
  41 |   if (usernameVal !== TEST_CONFIG.username) {
  42 |     await page.locator('#user_login').click({ clickCount: 3 });
  43 |     await page.locator('#user_login').fill(TEST_CONFIG.username);
  44 |   }
  45 | 
  46 |   await page.locator('#user_pass').click({ clickCount: 3 });
  47 |   await page.locator('#user_pass').fill(TEST_CONFIG.password);
  48 |   await page.locator('#wp-submit').click();
  49 |   await page.waitForURL(/wp-admin/, { timeout: 30000 });
  50 | }
  51 | 
  52 | export async function goToPluginPage(page: Page, path: string): Promise<void> {
  53 |   await page.goto(TEST_CONFIG.baseURL + path);
  54 |   await page.waitForLoadState('domcontentloaded');
  55 |   await page.waitForTimeout(1500);
  56 | }
  57 | 
```