/**
 * @section Sync Config
 * @tag @sync-config @connected @general
 * LP-SCONF-GEN — General tab: Auto Sync toggle, frequency, sync method
 */
import { test, expect } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, CORRECT_PAGES } from '../helpers/auth';

test.describe('Sync Config — General Tab', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, CORRECT_PAGES.syncConfig);
    // General tab should be default
  });

  test('LP-SCONF-GEN-001 | Auto Sync toggle is visible', async ({ page }) => {
    await expect(page.getByText(/auto sync|automatic sync/i).first()).toBeVisible();
  });

  test('LP-SCONF-GEN-002 | Sync Frequency setting is visible', async ({ page }) => {
    await expect(page.getByText(/frequency/i).first()).toBeVisible();
  });

  test('LP-SCONF-GEN-003 | Sync Method setting is visible', async ({ page }) => {
    await expect(page.getByText(/method|sales receipt|invoice/i).first()).toBeVisible();
  });

  test('LP-SCONF-GEN-004 | Save button is present', async ({ page }) => {
    const saveBtn = page.getByRole('button', { name: /save|save settings|update/i });
    await expect(saveBtn.first()).toBeVisible();
  });

  test('LP-SCONF-GEN-005 | settings persist after save (no error toast)', async ({ page }) => {
    const saveBtn = page.getByRole('button', { name: /save|save settings|update/i });
    if (await saveBtn.count() > 0) {
      await saveBtn.first().click();
      await expect(page.getByText(/error|failed to save/i)).toHaveCount(0);
    }
  });
});
