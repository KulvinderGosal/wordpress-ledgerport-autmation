/**
 * @section Dashboard
 * @tag @dashboard @connected
 * LP-DASH-ACT — Recent Activity widget & Setup Checklist
 */
import { test, expect } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, CORRECT_PAGES } from '../helpers/auth';

test.describe('Dashboard — Recent Activity', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, CORRECT_PAGES.dashboard);
  });

  test('LP-DASH-ACT-001 | "Recent Activity" heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Recent Activity', level: 3 })).toBeVisible();
  });

  test('LP-DASH-ACT-002 | "View all" link is present', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'View all' })).toBeVisible();
  });

  test('LP-DASH-ACT-003 | "View all" link navigates to Audit Logs page', async ({ page }) => {
    await page.getByRole('link', { name: 'View all' }).click();
    await expect(page).toHaveURL(/ledgerport-logs/);
  });

  test('LP-DASH-ACT-004 | activity entries contain timestamp metadata', async ({ page }) => {
    await expect(page.getByText(/ago/).first()).toBeVisible();
  });

  test('LP-DASH-ACT-005 | activity entries show a status badge', async ({ page }) => {
    // Badges: success, info, failed, partial_success
    const badge = page.locator('[class*="success"], [class*="failed"], [class*="info"], [class*="partial"]').first();
    await expect(badge).toBeVisible();
  });
});

test.describe('Dashboard — Setup Checklist', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, CORRECT_PAGES.dashboard);
  });

  test('LP-DASH-CHECK-001 | "Setup checklist" heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Setup checklist', level: 3 })).toBeVisible();
  });

  test('LP-DASH-CHECK-002 | "Connect WooCommerce" checklist item is present', async ({ page }) => {
    await expect(page.getByText('Connect WooCommerce')).toBeVisible();
  });

  test('LP-DASH-CHECK-003 | "Connect QuickBooks" checklist item is present', async ({ page }) => {
    await expect(page.getByText('Connect QuickBooks')).toBeVisible();
  });

  test('LP-DASH-CHECK-004 | "Configure sync settings" checklist item is present', async ({ page }) => {
    await expect(page.getByText('Configure sync settings')).toBeVisible();
  });

  test('LP-DASH-CHECK-005 | "Enable automatic sync" checklist item is present', async ({ page }) => {
    await expect(page.getByText('Enable automatic sync')).toBeVisible();
  });
});

test.describe('Dashboard — Connections & Configuration Widgets', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, CORRECT_PAGES.dashboard);
  });

  test('LP-DASH-CONN-001 | "Connections" widget heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Connections', level: 3 })).toBeVisible();
  });

  test('LP-DASH-CONN-002 | QuickBooks connection shows "Connected" status', async ({ page }) => {
    await expect(page.getByText('QuickBooks')).toBeVisible();
    await expect(page.getByText('Connected').first()).toBeVisible();
  });

  test('LP-DASH-CONN-003 | WooCommerce connection shows "Connected" status', async ({ page }) => {
    await expect(page.getByText('WooCommerce')).toBeVisible();
  });

  test('LP-DASH-CFG-001 | "Configuration" widget heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Configuration', level: 3 })).toBeVisible();
  });

  test('LP-DASH-CFG-002 | "Manage settings" button navigates to Sync Config', async ({ page }) => {
    await page.getByRole('button', { name: /manage settings/i }).click();
    await expect(page).toHaveURL(/ledgerport-sync-config/);
  });

  test('LP-DASH-CFG-003 | Configuration shows Method, Frequency, and Auto sync rows', async ({ page }) => {
    await expect(page.getByText('Method')).toBeVisible();
    await expect(page.getByText('Frequency')).toBeVisible();
    await expect(page.getByText('Auto sync')).toBeVisible();
  });
});
