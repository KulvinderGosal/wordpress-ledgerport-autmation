/**
 * @section Mappings
 * @tag @mappings @connected @payment-methods
 * LP-MAP-PAY — Payment Methods tab (GAP: was completely absent before)
 */
import { test, expect } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, CORRECT_PAGES } from '../helpers/auth';

test.describe('Mappings — Payment Methods Tab (Connected State)', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, CORRECT_PAGES.mappings);
    await page.getByRole('tab', { name: 'Payment Methods' }).click();
  });

  test('LP-MAP-PAY-001 | Payment Methods tab becomes selected after click', async ({ page }) => {
    await expect(page.getByRole('tab', { name: 'Payment Methods' })).toHaveAttribute('aria-selected', 'true');
  });

  test('LP-MAP-PAY-002 | Payment Methods tab panel content loads without error', async ({ page }) => {
    await expect(page.locator('[role="tabpanel"]')).toBeVisible();
  });

  test('LP-MAP-PAY-003 | Payment Methods tab does not show a crash error', async ({ page }) => {
    await expect(page.getByText(/something went wrong|error|fatal/i)).toHaveCount(0);
  });

  test('LP-MAP-PAY-004 | table or empty-state message is displayed', async ({ page }) => {
    const table = page.getByRole('table');
    const emptyMsg = page.getByText(/no payment|no data/i);
    const hasTable = await table.count() > 0;
    const hasEmpty = await emptyMsg.count() > 0;
    expect(hasTable || hasEmpty).toBeTruthy();
  });
});
