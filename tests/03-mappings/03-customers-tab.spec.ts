/**
 * @section Mappings
 * @tag @mappings @connected @customers
 * LP-MAP-CUST — Customers tab
 */
import { test, expect } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, CORRECT_PAGES } from '../helpers/auth';

test.describe('Mappings — Customers Tab (Connected State)', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, CORRECT_PAGES.mappings);
    await page.getByRole('tab', { name: 'Customers' }).click();
  });

  test('LP-MAP-CUST-001 | Customers tab becomes selected after click', async ({ page }) => {
    await expect(page.getByRole('tab', { name: 'Customers' })).toHaveAttribute('aria-selected', 'true');
  });

  test('LP-MAP-CUST-002 | Customers tab panel content loads without error', async ({ page }) => {
    await expect(page.locator('[role="tabpanel"]')).toBeVisible();
  });

  test('LP-MAP-CUST-003 | filter textbox is present in Customers tab', async ({ page }) => {
    await expect(page.getByRole('textbox', { name: /filter/i })).toBeVisible();
  });

  test('LP-MAP-CUST-004 | table or empty-state message is displayed', async ({ page }) => {
    const table = page.getByRole('table');
    const emptyMsg = page.getByText(/no customers|no data/i);
    const hasTable = await table.count() > 0;
    const hasEmpty = await emptyMsg.count() > 0;
    expect(hasTable || hasEmpty).toBeTruthy();
  });
});
