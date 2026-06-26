/**
 * @section Sync Config
 * @tag @sync-config @smoke
 * LP-SCONF-LOAD — Sync Config page load & tab bar
 */
import { test, expect } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, CORRECT_PAGES } from '../helpers/auth';

test.describe('Sync Config — Page Load & Tabs', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, CORRECT_PAGES.syncConfig);
  });

  test('LP-SCONF-LOAD-001 | page title contains "Sync Config"', async ({ page }) => {
    await expect(page).toHaveTitle(/Sync Config/);
  });

  test('LP-SCONF-LOAD-002 | URL resolves to ?page=ledgerport-sync-config', async ({ page }) => {
    expect(page.url()).toContain('page=ledgerport-sync-config');
  });

  test('LP-SCONF-LOAD-003 | LedgerPort logo is visible', async ({ page }) => {
    await expect(page.locator('img[alt="LedgerPort"]').first()).toBeVisible();
  });

  test('LP-SCONF-LOAD-004 | "Sync Config" heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /sync config/i, level: 1 })).toBeVisible();
  });

  test('LP-SCONF-LOAD-005 | tab bar shows General / Orders / Customers / Products tabs', async ({ page }) => {
    const tabs = ['General', 'Orders', 'Customers', 'Products'];
    for (const tab of tabs) {
      await expect(page.getByRole('tab', { name: tab })).toBeVisible();
    }
  });

  test('LP-SCONF-LOAD-006 | General tab is selected by default', async ({ page }) => {
    const general = page.getByRole('tab', { name: 'General' });
    await expect(general).toHaveAttribute('aria-selected', 'true');
  });
});
