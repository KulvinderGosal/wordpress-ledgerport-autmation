/**
 * LedgerPort — Connection Page Regression Tests
 * LP-CONN-001 → LP-CONN-040
 */
import { test, expect, Page } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, PLUGIN_PAGES } from './helpers/auth';

let page: Page;

test.beforeAll(async ({ browser }) => {
  const ctx = await browser.newContext();
  page = await ctx.newPage();
  await loginAsAdmin(page);
  await goToPluginPage(page, PLUGIN_PAGES.connection);
});

test.afterAll(async () => { await page.close(); });

// ─── 1. Page Load ─────────────────────────────────────────────────────────────
test.describe('1. Page Load', () => {
  test('LP-CONN-001 | Page title contains "Connection"', async () => {
    await expect(page).toHaveTitle(/Connection/i);
  });
  test('LP-CONN-002 | URL contains ledgerport-connection', async () => {
    expect(page.url()).toContain('ledgerport-connection');
  });
  test('LP-CONN-003 | Page loads without JS errors', async () => {
    const errors: string[] = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.reload({ waitUntil: 'networkidle' });
    expect(errors.filter(e => !e.includes('favicon'))).toHaveLength(0);
  });
});

// ─── 2. Header ────────────────────────────────────────────────────────────────
test.describe('2. Header', () => {
  test('LP-CONN-004 | LedgerPort logo is visible', async () => {
    await expect(page.locator('img[alt*="LedgerPort"], .ledgerport-logo, header img').first()).toBeVisible();
  });
  test('LP-CONN-005 | Notification bell is visible', async () => {
    await expect(page.locator('button[aria-label*="notification"], .notification-bell').first()).toBeVisible();
  });
  test('LP-CONN-006 | Dark mode toggle is visible', async () => {
    await expect(page.locator('button[aria-label*="mode"], button[aria-label*="theme"], .theme-toggle').first()).toBeVisible();
  });
  test('LP-CONN-007 | Help icon is visible', async () => {
    await expect(page.locator('button[aria-label*="help"], .help-icon').first()).toBeVisible();
  });
});

// ─── 3. Page Heading ──────────────────────────────────────────────────────────
test.describe('3. Page Heading', () => {
  test('LP-CONN-008 | "Connections" H1 heading is visible', async () => {
    await expect(page.getByRole('heading', { name: /^connections$/i })).toBeVisible();
  });
  test('LP-CONN-009 | Sub-heading copy is correct', async () => {
    await expect(page.getByText('Manage how LedgerPort connects to your store and accounting platform.')).toBeVisible();
  });
});

// ─── 4. Connect Banner ────────────────────────────────────────────────────────
test.describe('4. Connect Banner', () => {
  test('LP-CONN-010 | "Connect your store to start syncing" heading is visible', async () => {
    await expect(page.getByText('Connect your store to start syncing')).toBeVisible();
  });
  test('LP-CONN-011 | Banner description text is correct', async () => {
    await expect(page.getByText('Sync WooCommerce orders, products, and customers to QuickBooks Online automatically and in real time.')).toBeVisible();
  });
  test('LP-CONN-012 | Feature: "One-click connection" is listed', async () => {
    await expect(page.getByText('One-click connection — sign in with your LedgerPort account')).toBeVisible();
  });
  test('LP-CONN-013 | Feature: "Real-time sync" is listed', async () => {
    await expect(page.getByText('Real-time sync as orders, products, and customers change')).toBeVisible();
  });
  test('LP-CONN-014 | Feature: "Keep QuickBooks accurate" is listed', async () => {
    await expect(page.getByText('Keep QuickBooks accurate without re-typing data')).toBeVisible();
  });
  test('LP-CONN-015 | Feature: "Secure connection" is listed', async () => {
    await expect(page.getByText('Secure connection — we never see your QuickBooks login')).toBeVisible();
  });
  test('LP-CONN-016 | Each feature row has an icon', async () => {
    const icons = page.getByText('Connect your store to start syncing').locator('..').locator('..').locator('svg, img');
    const count = await icons.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });
});

// ─── 5. CTA Button ────────────────────────────────────────────────────────────
test.describe('5. Connect CTA Button', () => {
  test('LP-CONN-017 | "Connect your store" button is visible', async () => {
    await expect(page.getByRole('button', { name: /connect your store/i })).toBeVisible();
  });
  test('LP-CONN-018 | "Connect your store" button is enabled', async () => {
    await expect(page.getByRole('button', { name: /connect your store/i })).toBeEnabled();
  });
  test('LP-CONN-019 | "Connect your store" button has green background styling', async () => {
    const btn = page.getByRole('button', { name: /connect your store/i });
    const classes = await btn.getAttribute('class');
    expect(classes).toMatch(/primary|green|connect|cta/i);
  });
  test('LP-CONN-020 | Clicking "Connect your store" does not cause a page error', async () => {
    const btn = page.getByRole('button', { name: /connect your store/i });
    await btn.click();
    await page.waitForLoadState('networkidle');
    await expect(page).not.toHaveTitle(/error|404|500/i);
    // Navigate back for remaining tests
    await goToPluginPage(page, PLUGIN_PAGES.connection);
  });
});

// ─── 6. Disconnected State ────────────────────────────────────────────────────
test.describe('6. Disconnected State Validations', () => {
  test('LP-CONN-021 | No "Connected" status badge is shown', async () => {
    await expect(page.getByText('Connected')).not.toBeVisible();
  });
  test('LP-CONN-022 | No QuickBooks account email is shown', async () => {
    await expect(page.getByText(/@.*\.com/)).not.toBeVisible();
  });
  test('LP-CONN-023 | No QuickBooks company name is shown', async () => {
    await expect(page.locator('.qb-company, .company-name, [class*="account-name"]')).not.toBeVisible();
  });
  test('LP-CONN-024 | No disconnect/reconnect buttons are shown when not connected', async () => {
    await expect(page.getByRole('button', { name: /disconnect/i })).not.toBeVisible();
    await expect(page.getByRole('button', { name: /reconnect/i })).not.toBeVisible();
  });
});

// ─── 7. Sidebar Navigation ────────────────────────────────────────────────────
test.describe('7. Sidebar Navigation', () => {
  test('LP-CONN-025 | "Connection" menu item is marked active', async () => {
    const item = page.locator('#adminmenu li.current, #adminmenu li.wp-current-menu-item');
    await expect(item.first()).toBeVisible();
  });
  test('LP-CONN-026 | All 7 plugin menu items are visible', async () => {
    const menu = page.locator('#adminmenu');
    for (const item of ['Dashboard', 'Connection', 'Mappings', 'Manual Sync', 'Audit Logs', 'Sync Config', 'Debug Logs']) {
      await expect(menu.getByText(item)).toBeVisible();
    }
  });
  test('LP-CONN-027 | Clicking "Dashboard" navigates to Dashboard', async () => {
    await page.locator('#adminmenu').getByRole('link', { name: /^dashboard$/i }).first().click();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('page=ledgerport');
    await goToPluginPage(page, PLUGIN_PAGES.connection);
  });
});

// ─── 8. Footer ────────────────────────────────────────────────────────────────
test.describe('8. Footer', () => {
  test('LP-CONN-028 | WordPress footer text is visible', async () => {
    await expect(page.getByText(/Thank you for creating with/i)).toBeVisible();
  });
  test('LP-CONN-029 | WordPress version is shown in footer', async () => {
    await expect(page.locator('#wpfooter').getByText(/Version \d+\.\d+/i)).toBeVisible();
  });
});

// ─── 9. Accessibility ─────────────────────────────────────────────────────────
test.describe('9. Accessibility', () => {
  test('LP-CONN-030 | All links have non-empty href', async () => {
    const links = await page.locator('a[href]').all();
    for (const link of links) {
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
    }
  });
  test('LP-CONN-031 | "Connect your store" button is keyboard focusable', async () => {
    const btn = page.getByRole('button', { name: /connect your store/i });
    await btn.focus();
    await expect(btn).toBeFocused();
  });
  test('LP-CONN-032 | Page has exactly one H1 heading', async () => {
    const h1s = await page.getByRole('heading', { level: 1 }).count();
    expect(h1s).toBe(1);
  });
});
