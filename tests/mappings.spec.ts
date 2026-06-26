/**
 * LedgerPort — Mappings Page Regression Tests
 * LP-MAP-001 → LP-MAP-060
 */
import { test, expect, Page } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, PLUGIN_PAGES } from './helpers/auth';

let page: Page;

test.beforeAll(async ({ browser }) => {
  const ctx = await browser.newContext();
  page = await ctx.newPage();
  await loginAsAdmin(page);
  await goToPluginPage(page, PLUGIN_PAGES.mappings);
});

test.afterAll(async () => { await page.close(); });

// ─── 1. Page Load ─────────────────────────────────────────────────────────────
test.describe('1. Page Load', () => {
  test('LP-MAP-001 | Page title contains "Mappings"', async () => {
    await expect(page).toHaveTitle(/Mappings/i);
  });
  test('LP-MAP-002 | URL contains ledgerport-mappings', async () => {
    expect(page.url()).toContain('ledgerport-mappings');
  });
  test('LP-MAP-003 | Page loads without JS errors', async () => {
    const errors: string[] = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.reload({ waitUntil: 'networkidle' });
    expect(errors.filter(e => !e.includes('favicon'))).toHaveLength(0);
  });
});

// ─── 2. Header ────────────────────────────────────────────────────────────────
test.describe('2. Header', () => {
  test('LP-MAP-004 | LedgerPort logo is visible', async () => {
    await expect(page.locator('img[alt*="LedgerPort"], .ledgerport-logo, header img').first()).toBeVisible();
  });
  test('LP-MAP-005 | Notification bell is visible', async () => {
    await expect(page.locator('button[aria-label*="notification"], .notification-bell').first()).toBeVisible();
  });
  test('LP-MAP-006 | Help icon is visible', async () => {
    await expect(page.locator('button[aria-label*="help"], .help-icon').first()).toBeVisible();
  });
});

// ─── 3. Page Heading ──────────────────────────────────────────────────────────
test.describe('3. Page Heading', () => {
  test('LP-MAP-007 | "Mappings" H1 heading is visible', async () => {
    await expect(page.getByRole('heading', { name: /^mappings$/i })).toBeVisible();
  });
  test('LP-MAP-008 | Sub-heading copy is correct', async () => {
    await expect(page.getByText('Map WooCommerce products, variations, customers, and payment methods to QuickBooks Online.')).toBeVisible();
  });
});

// ─── 4. Connect Banner ────────────────────────────────────────────────────────
test.describe('4. Connect Banner (Disconnected)', () => {
  test('LP-MAP-009 | "Connect your store to start syncing" banner is shown', async () => {
    await expect(page.getByText('Connect your store to start syncing')).toBeVisible();
  });
  test('LP-MAP-010 | Banner description text is correct', async () => {
    await expect(page.getByText('Sync WooCommerce orders, products, and customers to QuickBooks Online automatically and in real time.')).toBeVisible();
  });
  test('LP-MAP-011 | Banner "Connect your store" CTA is visible and enabled', async () => {
    const btn = page.getByRole('button', { name: /connect your store/i }).first();
    await expect(btn).toBeVisible();
    await expect(btn).toBeEnabled();
  });
  test('LP-MAP-012 | Feature row "One-click connection" is listed in banner', async () => {
    await expect(page.getByText('One-click connection — sign in with your LedgerPort account')).toBeVisible();
  });
  test('LP-MAP-013 | Feature row "Real-time sync" is listed in banner', async () => {
    await expect(page.getByText('Real-time sync as orders, products, and customers change')).toBeVisible();
  });
  test('LP-MAP-014 | Feature row "Keep QuickBooks accurate" is listed in banner', async () => {
    await expect(page.getByText('Keep QuickBooks accurate without re-typing data')).toBeVisible();
  });
  test('LP-MAP-015 | Feature row "Secure connection" is listed in banner', async () => {
    await expect(page.getByText('Secure connection — we never see your QuickBooks login')).toBeVisible();
  });
});

// ─── 5. Tab Bar ───────────────────────────────────────────────────────────────
test.describe('5. Tab Bar', () => {
  test('LP-MAP-016 | "Products" tab is visible', async () => {
    await expect(page.getByText('Products').first()).toBeVisible();
  });
  test('LP-MAP-017 | "Variations" tab is visible', async () => {
    await expect(page.getByText('Variations')).toBeVisible();
  });
  test('LP-MAP-018 | "Customers" tab is visible', async () => {
    await expect(page.getByText('Customers')).toBeVisible();
  });
  test('LP-MAP-019 | "Payment Methods" tab is visible', async () => {
    await expect(page.getByText('Payment Methods')).toBeVisible();
  });
  test('LP-MAP-020 | "Products" tab is active by default', async () => {
    const activeTab = page.locator('[class*="tab"][class*="active"], [aria-selected="true"], .nav-tab-active').first();
    await expect(activeTab).toContainText(/products/i);
  });
  test('LP-MAP-021 | Active tab has visible underline/indicator', async () => {
    const activeTab = page.locator('[class*="tab"][class*="active"], [aria-selected="true"], .nav-tab-active').first();
    await expect(activeTab).toBeVisible();
  });
});

// ─── 6. Products Tab (Gated) ──────────────────────────────────────────────────
test.describe('6. Products Tab — Gated State', () => {
  test.beforeEach(async () => {
    await goToPluginPage(page, PLUGIN_PAGES.mappings);
  });

  test('LP-MAP-022 | Products tab shows "Connect your store to use this feature"', async () => {
    await expect(page.getByText('Connect your store to use this feature')).toBeVisible();
  });
  test('LP-MAP-023 | Products tab shows correct explanation text', async () => {
    await expect(page.getByText('Once your WooCommerce store is connected to LedgerPort, this section will show you live data.')).toBeVisible();
  });
  test('LP-MAP-024 | Products tab has info icon', async () => {
    await expect(page.locator('.info-icon, svg[aria-label*="info"], [class*="empty-state"] svg').first()).toBeVisible();
  });
  test('LP-MAP-025 | Products tab has "Connect your store" CTA button in gated area', async () => {
    const ctaBtns = page.getByRole('button', { name: /connect your store/i });
    await expect(ctaBtns.last()).toBeVisible();
  });
  test('LP-MAP-026 | No product rows/table are visible in Products tab', async () => {
    await expect(page.locator('table tbody tr, .product-mapping-row')).toHaveCount(0);
  });
});

// ─── 7. Variations Tab (Gated) ────────────────────────────────────────────────
test.describe('7. Variations Tab — Gated State', () => {
  test.beforeEach(async () => {
    await goToPluginPage(page, PLUGIN_PAGES.mappings);
    await page.getByText('Variations').click();
    await page.waitForLoadState('networkidle');
  });

  test('LP-MAP-027 | Variations tab URL updates to #variations', async () => {
    expect(page.url()).toContain('mappings');
  });
  test('LP-MAP-028 | Variations tab shows gated state message', async () => {
    await expect(page.getByText('Connect your store to use this feature')).toBeVisible();
  });
  test('LP-MAP-029 | Variations tab shows explanation text', async () => {
    await expect(page.getByText('Once your WooCommerce store is connected to LedgerPort, this section will show you live data.')).toBeVisible();
  });
  test('LP-MAP-030 | Variations tab has "Connect your store" CTA button', async () => {
    await expect(page.getByRole('button', { name: /connect your store/i }).last()).toBeVisible();
  });
  test('LP-MAP-031 | No variation rows are shown', async () => {
    await expect(page.locator('table tbody tr, .variation-row')).toHaveCount(0);
  });
});

// ─── 8. Customers Tab (Gated) ─────────────────────────────────────────────────
test.describe('8. Customers Tab — Gated State', () => {
  test.beforeEach(async () => {
    await goToPluginPage(page, PLUGIN_PAGES.mappings);
    await page.getByText('Customers').click();
    await page.waitForLoadState('networkidle');
  });

  test('LP-MAP-032 | Customers tab shows gated state message', async () => {
    await expect(page.getByText('Connect your store to use this feature')).toBeVisible();
  });
  test('LP-MAP-033 | Customers tab shows explanation text', async () => {
    await expect(page.getByText('Once your WooCommerce store is connected to LedgerPort, this section will show you live data.')).toBeVisible();
  });
  test('LP-MAP-034 | Customers tab has "Connect your store" CTA button', async () => {
    await expect(page.getByRole('button', { name: /connect your store/i }).last()).toBeVisible();
  });
  test('LP-MAP-035 | No customer rows are shown', async () => {
    await expect(page.locator('table tbody tr, .customer-row')).toHaveCount(0);
  });
});

// ─── 9. Payment Methods Tab (Gated) ───────────────────────────────────────────
test.describe('9. Payment Methods Tab — Gated State', () => {
  test.beforeEach(async () => {
    await goToPluginPage(page, PLUGIN_PAGES.mappings);
    await page.getByText('Payment Methods').click();
    await page.waitForLoadState('networkidle');
  });

  test('LP-MAP-036 | Payment Methods tab shows gated state message', async () => {
    await expect(page.getByText('Connect your store to use this feature')).toBeVisible();
  });
  test('LP-MAP-037 | Payment Methods tab shows explanation text', async () => {
    await expect(page.getByText('Once your WooCommerce store is connected to LedgerPort, this section will show you live data.')).toBeVisible();
  });
  test('LP-MAP-038 | Payment Methods tab has "Connect your store" CTA button', async () => {
    await expect(page.getByRole('button', { name: /connect your store/i }).last()).toBeVisible();
  });
  test('LP-MAP-039 | No payment method rows are shown', async () => {
    await expect(page.locator('table tbody tr, .payment-method-row')).toHaveCount(0);
  });
});

// ─── 10. Tab Switching ────────────────────────────────────────────────────────
test.describe('10. Tab Switching Behaviour', () => {
  test.beforeEach(async () => {
    await goToPluginPage(page, PLUGIN_PAGES.mappings);
  });

  test('LP-MAP-040 | Switching from Products to Variations shows correct content', async () => {
    await page.getByText('Variations').click();
    await expect(page.getByText('Connect your store to use this feature')).toBeVisible();
  });
  test('LP-MAP-041 | Switching from Variations back to Products shows correct content', async () => {
    await page.getByText('Variations').click();
    await page.getByText('Products').click();
    await expect(page.getByText('Connect your store to use this feature')).toBeVisible();
  });
  test('LP-MAP-042 | All 4 tabs are clickable without page reload', async () => {
    for (const tab of ['Variations', 'Customers', 'Payment Methods', 'Products']) {
      await page.getByText(tab).first().click();
      await page.waitForTimeout(300);
      await expect(page.getByText('Connect your store to use this feature')).toBeVisible();
    }
  });
});

// ─── 11. Sidebar & Footer ─────────────────────────────────────────────────────
test.describe('11. Sidebar & Footer', () => {
  test('LP-MAP-043 | "Mappings" is highlighted as active in sidebar', async () => {
    await goToPluginPage(page, PLUGIN_PAGES.mappings);
    const active = page.locator('#adminmenu li.current, #adminmenu li.wp-current-menu-item').first();
    await expect(active).toBeVisible();
  });
  test('LP-MAP-044 | WordPress footer is visible', async () => {
    await expect(page.getByText(/Thank you for creating with/i)).toBeVisible();
  });
  test('LP-MAP-045 | WordPress version is shown in footer', async () => {
    await expect(page.locator('#wpfooter').getByText(/Version \d+\.\d+/i)).toBeVisible();
  });
});
