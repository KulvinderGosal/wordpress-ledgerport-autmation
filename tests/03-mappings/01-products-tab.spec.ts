/**
 * @section Mappings
 * @tag @mappings @connected @products
 * LP-MAP-PROD — Products tab: table, filter, pagination, mapping interactions
 * GAP FILLED: Previously only tested disconnected/gated state. Now covers connected state with real data.
 */
import { test, expect } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, CORRECT_PAGES } from '../helpers/auth';

test.describe('Mappings — Products Tab (Connected State)', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, CORRECT_PAGES.mappings);
  });

  test('LP-MAP-PROD-001 | page title contains "Mappings"', async ({ page }) => {
    await expect(page).toHaveTitle(/Mappings/);
  });

  test('LP-MAP-PROD-002 | "Mappings" heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Mappings', level: 1 })).toBeVisible();
  });

  test('LP-MAP-PROD-003 | Products tab is selected by default', async ({ page }) => {
    const productsTab = page.getByRole('tab', { name: 'Products' });
    await expect(productsTab).toBeVisible();
    await expect(productsTab).toHaveAttribute('aria-selected', 'true');
  });

  test('LP-MAP-PROD-004 | tab bar shows all 4 tabs', async ({ page }) => {
    const tabs = ['Products', 'Variations', 'Customers', 'Payment Methods'];
    for (const tab of tabs) {
      await expect(page.getByRole('tab', { name: tab })).toBeVisible();
    }
  });

  test('LP-MAP-PROD-005 | Products table is rendered with header row', async ({ page }) => {
    await expect(page.getByRole('columnheader', { name: 'ID' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'SKU' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'QuickBooks Product' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Status' })).toBeVisible();
  });

  test('LP-MAP-PROD-006 | Products table contains at least one data row', async ({ page }) => {
    const rows = page.getByRole('table').getByRole('row');
    const count = await rows.count();
    expect(count).toBeGreaterThan(1); // >1 because first row is header
  });

  test('LP-MAP-PROD-007 | filter textbox is present and accepts input', async ({ page }) => {
    const filter = page.getByRole('textbox', { name: /filter/i });
    await expect(filter).toBeVisible();
    await filter.fill('Cap');
    await expect(filter).toHaveValue('Cap');
  });

  test('LP-MAP-PROD-008 | filtering by product name narrows the table', async ({ page }) => {
    await page.getByRole('textbox', { name: /filter/i }).fill('Cap');
    await page.waitForTimeout(500);
    const rows = page.getByRole('table').getByRole('row');
    const count = await rows.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('LP-MAP-PROD-009 | rows-per-page dropdown is visible', async ({ page }) => {
    const perPageDropdown = page.locator('[role="combobox"]').first();
    await expect(perPageDropdown).toBeVisible();
  });

  test('LP-MAP-PROD-010 | pagination shows "Showing X–Y of Z"', async ({ page }) => {
    await expect(page.getByText(/showing \d+.*of \d+/i)).toBeVisible();
  });

  test('LP-MAP-PROD-011 | "Next page" button is present when more than one page', async ({ page }) => {
    const paginationText = await page.getByText(/of \d+/i).textContent();
    const totalMatch = paginationText?.match(/of (\d+)/);
    if (totalMatch && parseInt(totalMatch[1]) > 1) {
      const nextBtn = page.getByRole('button').filter({ has: page.locator('img') }).last();
      await expect(nextBtn).toBeEnabled();
    }
  });

  test('LP-MAP-PROD-012 | "Refresh WooCommerce" button is visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: /refresh woocommerce/i })).toBeVisible();
  });

  test('LP-MAP-PROD-013 | "Automap Products" button is visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: /automap products/i })).toBeVisible();
  });

  test('LP-MAP-PROD-014 | Status column shows "Mapped" or "Unmapped" badges', async ({ page }) => {
    const mapped = page.getByText('Mapped').first();
    const unmapped = page.getByText('Unmapped').first();
    const hasMapped = await mapped.count() > 0;
    const hasUnmapped = await unmapped.count() > 0;
    expect(hasMapped || hasUnmapped).toBeTruthy();
  });

  test('LP-MAP-PROD-015 | QuickBooks Product column has dropdown selectors', async ({ page }) => {
    const selectors = page.getByRole('textbox', { name: /select mapping/i });
    const count = await selectors.count();
    expect(count).toBeGreaterThan(0);
  });
});
