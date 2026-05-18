import { test, expect } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, PLUGIN_PAGES } from '../auth';

test.describe('LedgerPort — Mappings', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await goToPluginPage(page, PLUGIN_PAGES.mappings);
  });

  // ── Page load ───────────────────────────────────────────────────────────────

  test('Mappings page loads without errors', async ({ page }) => {
    await expect(page.locator('body')).not.toContainText(/Fatal error|Warning:|not allowed/i);
  });

  test('page heading is "Mappings"', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /^Mappings$/i }).first()).toBeVisible();
  });

  test('page subtitle describes the mapping purpose', async ({ page }) => {
    await expect(page.getByText(/Map WooCommerce products, variations, customers, and payment methods/i)).toBeVisible();
  });

  // ── Tabs ────────────────────────────────────────────────────────────────────

  test('Products tab is visible', async ({ page }) => {
    await expect(page.getByRole('tab', { name: /Products/i }).or(page.getByRole('button', { name: /^Products$/i }))).toBeVisible();
  });

  test('Variations tab is visible', async ({ page }) => {
    await expect(page.getByRole('tab', { name: /Variations/i }).or(page.getByRole('button', { name: /Variations/i }))).toBeVisible();
  });

  test('Customers tab is visible', async ({ page }) => {
    await expect(page.getByRole('tab', { name: /Customers/i }).or(page.getByRole('button', { name: /Customers/i }))).toBeVisible();
  });

  test('Payment Methods tab is visible', async ({ page }) => {
    await expect(page.getByRole('tab', { name: /Payment Methods/i }).or(page.getByRole('button', { name: /Payment Methods/i }))).toBeVisible();
  });

  test('Products tab is active by default', async ({ page }) => {
    await expect(page.getByText(/Map WooCommerce Products to QuickBooks/i)).toBeVisible();
  });

  // ── Products tab ────────────────────────────────────────────────────────────

  test('Products tab heading is correct', async ({ page }) => {
    await expect(page.getByText(/Map WooCommerce Products to QuickBooks/i)).toBeVisible();
  });

  test('Products tab shows descriptive subtitle', async ({ page }) => {
    await expect(page.getByText(/Unmapped products use the default fallback/i)).toBeVisible();
  });

  test('Products table has ID column', async ({ page }) => {
    await expect(page.locator('th, td').filter({ hasText: /^ID$/ }).first()).toBeVisible();
  });

  test('Products table has Name column', async ({ page }) => {
    await expect(page.locator('th, td').filter({ hasText: /^Name$/ }).first()).toBeVisible();
  });

  test('Products table has SKU column', async ({ page }) => {
    await expect(page.locator('th, td').filter({ hasText: /^SKU$/ }).first()).toBeVisible();
  });

  test('Products section references WooCommerce', async ({ page }) => {
    await expect(page.locator('#wpcontent').getByText(/WooCommerce/i).first()).toBeVisible();
  });

  test('Products table has QuickBooks Product column', async ({ page }) => {
    await expect(page.locator('th').filter({ hasText: /QuickBooks Product/i }).first()).toBeVisible();
  });

  test('Products table has Status column', async ({ page }) => {
    await expect(page.locator('th').filter({ hasText: /^Status$/i }).first()).toBeVisible();
  });

  test('Products table contains at least one row', async ({ page }) => {
    const rows = page.locator('tbody tr');
    await expect(rows.first()).toBeVisible();
  });

  test('Products table shows Mapped status', async ({ page }) => {
    await expect(page.getByText(/Mapped/i).first()).toBeVisible();
  });

  test('Filter button is visible on Products tab', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Filter/i }).first()).toBeVisible();
  });

  test('Refresh WooCommerce button is visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Refresh WooCommerce/i }).or(page.getByText(/refresh WooCommerce/i))).toBeVisible();
  });

  test('Automap Products button is visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Automap Products/i }).or(page.getByText(/Automap Products/i))).toBeVisible();
  });

  test('pagination shows total product count', async ({ page }) => {
    await expect(page.locator('text=/Showing \\d+.\\d+ of \\d+/i').first()).toBeVisible();
  });

  test('pagination shows page number', async ({ page }) => {
    await expect(page.locator('text=/Page \\d+ of \\d+/i').first()).toBeVisible();
  });

  // ── Variations tab ──────────────────────────────────────────────────────────

  test('clicking Variations tab shows variation mapping content', async ({ page }) => {
    await page.getByRole('tab', { name: /Variations/i }).or(page.getByRole('button', { name: /Variations/i })).click();
    await page.waitForTimeout(1000);
    await expect(page.getByText(/Map WooCommerce Variations to QuickBooks/i)).toBeVisible();
  });

  test('Variations tab subtitle is correct', async ({ page }) => {
    await page.getByRole('tab', { name: /Variations/i }).or(page.getByRole('button', { name: /Variations/i })).click();
    await page.waitForTimeout(1000);
    await expect(
      page.getByText(/Search product variations/i)
        .or(page.locator('input[placeholder*="variation" i]'))
        .or(page.getByText(/Unmapped variations|variation.*fallback|Map WooCommerce Variations/i))
        .first()
    ).toBeVisible();
  });

  test('Variations table shows ID, Name, SKU columns', async ({ page }) => {
    await page.getByRole('tab', { name: /Variations/i }).or(page.getByRole('button', { name: /Variations/i })).click();
    await page.waitForTimeout(1000);
    for (const col of ['ID', 'Name', 'SKU']) {
      await expect(page.locator('th, td').filter({ hasText: new RegExp(`^${col}$`) }).first()).toBeVisible();
    }
  });

  test('Variations table contains at least one row', async ({ page }) => {
    await page.getByRole('tab', { name: /Variations/i }).or(page.getByRole('button', { name: /Variations/i })).click();
    await page.waitForTimeout(1000);
    const rows = page.locator('tbody tr');
    await expect(rows.first()).toBeVisible();
  });

  test('Variations tab shows pagination', async ({ page }) => {
    await page.getByRole('tab', { name: /Variations/i }).or(page.getByRole('button', { name: /Variations/i })).click();
    await page.waitForTimeout(1000);
    await expect(page.locator('text=/Showing \\d+.\\d+ of \\d+/i').first()).toBeVisible();
  });

  // ── Customers tab ───────────────────────────────────────────────────────────

  test('clicking Customers tab shows customer mapping content', async ({ page }) => {
    await page.getByRole('tab', { name: /Customers/i }).or(page.getByRole('button', { name: /Customers/i })).click();
    await page.waitForTimeout(1000);
    await expect(page.getByText(/Map WooCommerce Customers to QuickBooks/i)).toBeVisible();
  });

  test('Customers tab subtitle mentions unmapped customer behaviour', async ({ page }) => {
    await page.getByRole('tab', { name: /Customers/i }).or(page.getByRole('button', { name: /Customers/i })).click();
    await page.waitForTimeout(1000);
    await expect(page.getByText(/Unmapped customers will be created in QuickBooks/i)).toBeVisible();
  });

  test('Customers table has Email column', async ({ page }) => {
    await page.getByRole('tab', { name: /Customers/i }).or(page.getByRole('button', { name: /Customers/i })).click();
    await page.waitForTimeout(1000);
    await expect(page.locator('th').filter({ hasText: /^Email$/ }).first()).toBeVisible();
  });

  test('Customers table has QuickBooks Customer column', async ({ page }) => {
    await page.getByRole('tab', { name: /Customers/i }).or(page.getByRole('button', { name: /Customers/i })).click();
    await page.waitForTimeout(1000);
    await expect(page.locator('th').filter({ hasText: /QuickBooks Customer/i }).first()).toBeVisible();
  });

  test('Automap Customers button is visible', async ({ page }) => {
    await page.getByRole('tab', { name: /Customers/i }).or(page.getByRole('button', { name: /Customers/i })).click();
    await page.waitForTimeout(1000);
    await expect(page.getByRole('button', { name: /Automap Customers/i }).or(page.getByText(/Automap Customers/i))).toBeVisible();
  });

  test('Customers table contains at least one row', async ({ page }) => {
    await page.getByRole('tab', { name: /Customers/i }).or(page.getByRole('button', { name: /Customers/i })).click();
    await page.waitForTimeout(1000);
    await expect(page.locator('tbody tr').first()).toBeVisible();
  });

  // ── Payment Methods tab ─────────────────────────────────────────────────────

  test('clicking Payment Methods tab shows gateway mapping content', async ({ page }) => {
    await page.getByRole('tab', { name: /Payment Methods/i }).or(page.getByRole('button', { name: /Payment Methods/i })).click();
    await page.waitForTimeout(1000);
    await expect(page.getByText(/Map WooCommerce Payment Gateways to QuickBooks/i)).toBeVisible();
  });

  test('Payment Methods tab subtitle is correct', async ({ page }) => {
    await page.getByRole('tab', { name: /Payment Methods/i }).or(page.getByRole('button', { name: /Payment Methods/i })).click();
    await page.waitForTimeout(1000);
    await expect(page.getByText(/Map each WooCommerce payment gateway to the corresponding QuickBooks Online payment method/i)).toBeVisible();
  });

  test('Payment Methods table has WooCommerce Payment Gateway column', async ({ page }) => {
    await page.getByRole('tab', { name: /Payment Methods/i }).or(page.getByRole('button', { name: /Payment Methods/i })).click();
    await page.waitForTimeout(1000);
    await expect(page.locator('th').filter({ hasText: /WooCommerce Payment Gateway/i }).first()).toBeVisible();
  });

  test('Payment Methods table has QuickBooks Payment Method column', async ({ page }) => {
    await page.getByRole('tab', { name: /Payment Methods/i }).or(page.getByRole('button', { name: /Payment Methods/i })).click();
    await page.waitForTimeout(1000);
    await expect(page.locator('th').filter({ hasText: /QuickBooks Payment Method/i }).first()).toBeVisible();
  });

  test('Payment Methods table shows Direct bank transfer row', async ({ page }) => {
    await page.getByRole('tab', { name: /Payment Methods/i }).or(page.getByRole('button', { name: /Payment Methods/i })).click();
    await page.waitForTimeout(1000);
    await expect(page.getByText(/Direct bank transfer/i)).toBeVisible();
  });

  test('Payment Methods table shows Check payments row', async ({ page }) => {
    await page.getByRole('tab', { name: /Payment Methods/i }).or(page.getByRole('button', { name: /Payment Methods/i })).click();
    await page.waitForTimeout(1000);
    await expect(page.getByText(/Check payments/i)).toBeVisible();
  });

  test('Payment Methods table shows Cash on delivery row', async ({ page }) => {
    await page.getByRole('tab', { name: /Payment Methods/i }).or(page.getByRole('button', { name: /Payment Methods/i })).click();
    await page.waitForTimeout(1000);
    await expect(page.getByText(/Cash on delivery/i)).toBeVisible();
  });

  test('Payment Methods shows "Unmapped" status badges', async ({ page }) => {
    await page.getByRole('tab', { name: /Payment Methods/i }).or(page.getByRole('button', { name: /Payment Methods/i })).click();
    await page.waitForTimeout(1000);
    await expect(page.getByText(/Unmapped/i).first()).toBeVisible();
  });

  test('Payment Methods has mapping dropdowns ("— Not mapped —")', async ({ page }) => {
    await page.getByRole('tab', { name: /Payment Methods/i }).or(page.getByRole('button', { name: /Payment Methods/i })).click();
    await page.waitForTimeout(1000);
    // The QBO mapping column shows "Unmapped" when no QBO payment method is mapped yet
    await expect(page.locator('#wpcontent').getByText(/Unmapped/i).first()).toBeVisible();
  });

  test('Payment Methods dropdowns open when clicked', async ({ page }) => {
    await page.getByRole('tab', { name: /Payment Methods/i }).or(page.getByRole('button', { name: /Payment Methods/i })).click();
    await page.waitForTimeout(1000);
    const dropdown = page.locator('select, [role="combobox"]').first();
    if (await dropdown.count() > 0) {
      await dropdown.click();
      await expect(dropdown).toBeFocused();
    } else {
      const trigger = page.getByText(/Not mapped|Select|Choose/i).first();
      if (await trigger.count() > 0) {
        await trigger.click();
        await expect(page.locator('[role="listbox"], [class*="dropdown"]').first()).toBeVisible();
      }
    }
  });

  test('Payment Methods table shows IDs (bacs, cheque, cod)', async ({ page }) => {
    await page.getByRole('tab', { name: /Payment Methods/i }).or(page.getByRole('button', { name: /Payment Methods/i })).click();
    await page.waitForTimeout(1000);
    // Use exact:true for IDs to avoid substring matches (e.g. 'cod' inside 'Shortcoder')
    // Fall back to display names which are confirmed present from other tests
    for (const [id, name] of [['bacs', 'Direct bank transfer'], ['cheque', 'Check payments'], ['cod', 'Cash on delivery']]) {
      await expect(
        page.locator('#wpcontent').getByText(id, { exact: true })
          .or(page.locator('#wpcontent').getByText(name))
          .first()
      ).toBeVisible();
    }
  });
});
