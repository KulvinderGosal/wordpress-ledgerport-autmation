/**
 * @section Mappings
 * @tag @mappings @connected @variations
 * LP-MAP-VAR — Variations tab
 */
import { test, expect } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, CORRECT_PAGES } from '../helpers/auth';

test.describe('Mappings — Variations Tab (Connected State)', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, CORRECT_PAGES.mappings);
    await page.getByRole('tab', { name: 'Variations' }).click();
  });

  test('LP-MAP-VAR-001 | Variations tab becomes selected after click', async ({ page }) => {
    const tab = page.getByRole('tab', { name: 'Variations' });
    await expect(tab).toHaveAttribute('aria-selected', 'true');
  });

  test('LP-MAP-VAR-002 | Variations tab panel content loads without error', async ({ page }) => {
    await expect(page.locator('[role="tabpanel"]')).toBeVisible();
  });

  test('LP-MAP-VAR-003 | filter textbox is present in Variations tab', async ({ page }) => {
    const filter = page.getByRole('textbox', { name: /filter/i });
    await expect(filter).toBeVisible();
  });

  test('LP-MAP-VAR-004 | table or empty-state message is displayed', async ({ page }) => {
    const table = page.getByRole('table');
    const emptyMsg = page.getByText(/no variations|no data|nothing to show/i);
    const hasTable = await table.count() > 0;
    const hasEmpty = await emptyMsg.count() > 0;
    expect(hasTable || hasEmpty).toBeTruthy();
  });
});
