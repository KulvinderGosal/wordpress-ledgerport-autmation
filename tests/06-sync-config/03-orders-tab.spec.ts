/**
 * @section Sync Config
 * @tag @sync-config @connected @orders
 * LP-SCONF-ORD — Orders tab settings
 */
import { test, expect } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, CORRECT_PAGES } from '../helpers/auth';

test.describe('Sync Config — Orders Tab', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, CORRECT_PAGES.syncConfig);
    await page.getByRole('tab', { name: 'Orders' }).click();
  });

  test('LP-SCONF-ORD-001 | Orders tab becomes selected', async ({ page }) => {
    await expect(page.getByRole('tab', { name: 'Orders' })).toHaveAttribute('aria-selected', 'true');
  });

  test('LP-SCONF-ORD-002 | Orders tab panel renders without error', async ({ page }) => {
    await expect(page.locator('[role="tabpanel"]')).toBeVisible();
  });

  test('LP-SCONF-ORD-003 | at least one orders setting control is present', async ({ page }) => {
    const controls = page.locator('[role="tabpanel"] input, [role="tabpanel"] select, [role="tabpanel"] [role="combobox"]');
    const count = await controls.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});
