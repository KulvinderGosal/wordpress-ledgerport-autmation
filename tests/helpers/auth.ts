import { Page } from '@playwright/test';

export const TEST_CONFIG = {
  baseURL: 'https://qastaging.pushengage.com',
  username: 'kgosal',
  password: '!letmeIn@123=',
  loginURL: '/wp-login.php',
};

const BASE = 'https://qastaging.pushengage.com';

// Verified working slugs on staging (confirmed via test runs 2026-06-01)
// ledgerport-settings / ledgerport-push / ledgerport-logs return WP Error on staging
export const CORRECT_PAGES = {
  dashboard:  `${BASE}/wp-admin/admin.php?page=ledgerport`,
  connection: `${BASE}/wp-admin/admin.php?page=ledgerport-connection`,
  mappings:   `${BASE}/wp-admin/admin.php?page=ledgerport-mappings`,
  manualSync: `${BASE}/wp-admin/admin.php?page=ledgerport-manual-sync`,
  auditLogs:  `${BASE}/wp-admin/admin.php?page=ledgerport-audit-logs`,
  syncConfig: `${BASE}/wp-admin/admin.php?page=ledgerport-sync-config`,
  debugLogs:  `${BASE}/wp-admin/admin.php?page=ledgerport-debug-logs`,
};

// Legacy aliases kept for backward-compat tests
export const PLUGIN_PAGES = {
  dashboard:  `${BASE}/wp-admin/admin.php?page=ledgerport`,
  connection: `${BASE}/wp-admin/admin.php?page=ledgerport-connection`,
  mappings:   `${BASE}/wp-admin/admin.php?page=ledgerport-mappings`,
  manualSync: `${BASE}/wp-admin/admin.php?page=ledgerport-manual-sync`,
  auditLogs:  `${BASE}/wp-admin/admin.php?page=ledgerport-audit-logs`,
  syncConfig: `${BASE}/wp-admin/admin.php?page=ledgerport-sync-config`,
  debugLogs:  `${BASE}/wp-admin/admin.php?page=ledgerport-debug-logs`,
};

// WooCommerce admin URLs (supports both HPOS and legacy post-type storage)
export const WOO_PAGES = {
  orders:       `${BASE}/wp-admin/admin.php?page=wc-orders`,
  ordersNew:    `${BASE}/wp-admin/admin.php?page=wc-orders&action=new`,
  products:     `${BASE}/wp-admin/edit.php?post_type=product`,
  productsNew:  `${BASE}/wp-admin/post-new.php?post_type=product`,
  userNew:      `${BASE}/wp-admin/user-new.php`,
  customers:    `${BASE}/wp-admin/users.php?role=customer`,
};

// QuickBooks Online sandbox
export const QB_BASE = 'https://sandbox.qbo.intuit.com';
export const QB_PAGES = {
  home:          `${QB_BASE}/app/homepage`,
  salesReceipts: `${QB_BASE}/app/sales`,           // active session URL provided by user
  customers:     `${QB_BASE}/app/customerlist`,
  items:         `${QB_BASE}/app/items`,
  invoices:      `${QB_BASE}/app/invoices`,
  auditLog:      `${QB_BASE}/app/auditlog`,
};

/**
 * Ensures the page is authenticated as WP admin.
 * With global-setup + storageState the session is already active, so this
 * just navigates to wp-admin and returns immediately.
 * Falls back to a full login if the session has expired or the cookie is missing.
 */
export async function loginAsAdmin(page: Page): Promise<void> {
  await page.goto(`${BASE}/wp-admin/`, { waitUntil: 'domcontentloaded' });
  // Already logged in — stay here
  if (page.url().includes('wp-admin') && !page.url().includes('wp-login')) return;
  // Session expired — re-authenticate
  await page.goto(`${BASE}/wp-login.php`, { waitUntil: 'domcontentloaded' });
  await page.locator('#user_login').fill(TEST_CONFIG.username);
  await page.locator('#user_pass').fill(TEST_CONFIG.password);
  await Promise.all([
    page.waitForURL(/wp-admin/, { timeout: 30_000 }),
    page.locator('#wp-submit').click(),
  ]);
}

export async function goToPluginPage(page: Page, url: string): Promise<void> {
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle').catch(() => {});
}

/**
 * Navigate to QB sandbox.
 * If redirected to Intuit login, waits up to 90 s for the user to log in manually
 * in the headed browser before proceeding.
 * Returns true when the browser lands on a sandbox.qbo.intuit.com/app/ page.
 */
export async function goToQB(page: Page, url = QB_PAGES.home): Promise<boolean> {
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  // If already on QB app, we're done
  if (page.url().includes('sandbox.qbo.intuit.com/app/')) return true;
  // Otherwise wait up to 90 s for manual QB login in the headed browser
  await page.waitForURL(/sandbox\.qbo\.intuit\.com\/app\//, { timeout: 90_000 }).catch(() => {});
  return page.url().includes('sandbox.qbo.intuit.com/app/');
}

/** Unique suffix to stamp test data so runs don't collide */
export function testSuffix(): string {
  return `AUTO-${Date.now()}`;
}
