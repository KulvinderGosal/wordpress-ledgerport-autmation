/**
 * @section Sync Config
 * @tag @sync-config @connected @customers @products
 * LP-SCONF-CUST, LP-SCONF-PROD — Customers & Products tabs
 */
import { test, expect } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, CORRECT_PAGES } from '../helpers/auth';

test.describe('Sync Config — Customers Tab', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, CORRECT_PAGES.syncConfig);
    await page.getByRole('tab', { name: 'Customers' }).click();
  });

  test('LP-SCONF-CUST-001 | Customers tab becomes selected', async ({ page }) => {
    await expect(page.getByRole('tab', { name: 'Customers' })).toHaveAttribute('aria-selected', 'true');
  });

  test('LP-SCONF-CUST-002 | Customers tab panel renders without error', async ({ page }) => {
    await expect(page.locator('[role="tabpanel"]')).toBeVisible();
  });
});

test.describe('Sync Config — Products Tab', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, CORRECT_PAGES.syncConfig);
    await page.getByRole('tab', { name: 'Products' }).click();
  });

  test('LP-SCONF-PROD-001 | Products tab becomes selected', async ({ page }) => {
    await expect(page.getByRole('tab', { name: 'Products' })).toHaveAttribute('aria-selected', 'true');
  });

  test('LP-SCONF-PROD-002 | Products tab panel renders without error', async ({ page }) => {
    await expect(page.locator('[role="tabpanel"]')).toBeVisible();
  });
});
