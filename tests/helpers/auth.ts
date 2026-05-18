import { Page } from '@playwright/test';

export const TEST_CONFIG = {
  baseURL: 'https://qastaging.pushengage.com',
  username: 'kgosal',
  password: '!letmeIn@123=',
  loginURL: '/wp-login.php',
};

export const PLUGIN_PAGES = {
  dashboard:  'https://qastaging.pushengage.com/wp-admin/admin.php?page=ledgerport',
  connection: 'https://qastaging.pushengage.com/wp-admin/admin.php?page=ledgerport-connection',
  mappings:   'https://qastaging.pushengage.com/wp-admin/admin.php?page=ledgerport-mappings',
  manualSync: 'https://qastaging.pushengage.com/wp-admin/admin.php?page=ledgerport-manual-sync',
  auditLogs:  'https://qastaging.pushengage.com/wp-admin/admin.php?page=ledgerport-audit-logs',
  syncConfig: 'https://qastaging.pushengage.com/wp-admin/admin.php?page=ledgerport-sync-config',
  debugLogs:  'https://qastaging.pushengage.com/wp-admin/admin.php?page=ledgerport-debug-logs',
};

export async function loginAsAdmin(page: Page): Promise<void> {
  await page.goto('https://qastaging.pushengage.com/wp-login.php');
  await page.locator('#user_login').fill(TEST_CONFIG.username);
  await page.locator('#user_pass').fill(TEST_CONFIG.password);
  await page.locator('#wp-submit').click();
  await page.waitForLoadState('networkidle');
}

export async function goToPluginPage(page: Page, url: string): Promise<void> {
  await page.goto(url);
  await page.waitForLoadState('networkidle');
}
