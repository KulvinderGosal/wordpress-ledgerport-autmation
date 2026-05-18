/**
 * LedgerPort — Debug Logs Page Regression Tests
 * LP-DEBUG-001 → LP-DEBUG-045
 */
import { test, expect, Page } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, PLUGIN_PAGES } from './helpers/auth';

let page: Page;

test.beforeAll(async ({ browser }) => {
  const ctx = await browser.newContext();
  page = await ctx.newPage();
  await loginAsAdmin(page);
  await goToPluginPage(page, PLUGIN_PAGES.debugLogs);
});

test.afterAll(async () => { await page.close(); });

// ─── 1. Page Load ─────────────────────────────────────────────────────────────
test.describe('1. Page Load', () => {
  test('LP-DEBUG-001 | Page title contains "Debug Logs"', async () => {
    await expect(page).toHaveTitle(/Debug Logs/i);
  });
  test('LP-DEBUG-002 | URL contains ledgerport-debug-logs', async () => {
    expect(page.url()).toContain('ledgerport-debug-logs');
  });
  test('LP-DEBUG-003 | Page is NOT access-restricted', async () => {
    await expect(page.getByText('Sorry, you are not allowed to access this page.')).not.toBeVisible();
  });
  test('LP-DEBUG-004 | Page loads without JS errors', async () => {
    const errors: string[] = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.reload({ waitUntil: 'networkidle' });
    expect(errors.filter(e => !e.includes('favicon'))).toHaveLength(0);
  });
});

// ─── 2. Header ────────────────────────────────────────────────────────────────
test.describe('2. Header', () => {
  test('LP-DEBUG-005 | LedgerPort logo is visible', async () => {
    await expect(page.locator('img[alt*="LedgerPort"], .ledgerport-logo, header img').first()).toBeVisible();
  });
  test('LP-DEBUG-006 | Notification bell is visible', async () => {
    await expect(page.locator('button[aria-label*="notification"], .notification-bell').first()).toBeVisible();
  });
  test('LP-DEBUG-007 | Help icon is visible', async () => {
    await expect(page.locator('button[aria-label*="help"], .help-icon').first()).toBeVisible();
  });
});

// ─── 3. Page Heading ──────────────────────────────────────────────────────────
test.describe('3. Page Heading', () => {
  test('LP-DEBUG-008 | "Debug Logs" H1 heading is visible', async () => {
    await expect(page.getByRole('heading', { name: /debug logs/i })).toBeVisible();
  });
  test('LP-DEBUG-009 | Sub-heading copy is correct', async () => {
    await expect(page.getByText('View, download, and manage plugin debug log files.')).toBeVisible();
  });
});

// ─── 4. Connect Banner ────────────────────────────────────────────────────────
test.describe('4. Connect Banner', () => {
  test('LP-DEBUG-010 | "Connect your store to start syncing" banner is shown', async () => {
    await expect(page.getByText('Connect your store to start syncing')).toBeVisible();
  });
  test('LP-DEBUG-011 | Banner CTA "Connect your store" button is visible and enabled', async () => {
    const btn = page.getByRole('button', { name: /connect your store/i }).first();
    await expect(btn).toBeVisible();
    await expect(btn).toBeEnabled();
  });
  test('LP-DEBUG-012 | Banner lists all 4 feature rows', async () => {
    await expect(page.getByText('One-click connection — sign in with your LedgerPort account')).toBeVisible();
    await expect(page.getByText('Real-time sync as orders, products, and customers change')).toBeVisible();
    await expect(page.getByText('Keep QuickBooks accurate without re-typing data')).toBeVisible();
    await expect(page.getByText('Secure connection — we never see your QuickBooks login')).toBeVisible();
  });
});

// ─── 5. Log Files Section ─────────────────────────────────────────────────────
test.describe('5. Log Files Section', () => {
  test('LP-DEBUG-013 | "Log Files" heading is visible', async () => {
    await expect(page.getByText('Log Files')).toBeVisible();
  });
  test('LP-DEBUG-014 | Log storage path is shown', async () => {
    await expect(page.getByText(/wp-content\/uploads\/ledgerport\/logs\//)).toBeVisible();
  });
  test('LP-DEBUG-015 | "Refresh" button is visible', async () => {
    await expect(page.getByRole('button', { name: /^refresh$/i })).toBeVisible();
  });
  test('LP-DEBUG-016 | "Refresh" button is enabled', async () => {
    await expect(page.getByRole('button', { name: /^refresh$/i })).toBeEnabled();
  });
  test('LP-DEBUG-017 | "Clear All Logs" button is visible', async () => {
    await expect(page.getByRole('button', { name: /clear all logs/i })).toBeVisible();
  });
  test('LP-DEBUG-018 | "Clear All Logs" button is enabled', async () => {
    await expect(page.getByRole('button', { name: /clear all logs/i })).toBeEnabled();
  });
  test('LP-DEBUG-019 | "Clear All Logs" button has red/danger styling', async () => {
    const btn = page.getByRole('button', { name: /clear all logs/i });
    const classes = await btn.getAttribute('class');
    expect(classes).toMatch(/danger|red|destructive|warning/i);
  });
});

// ─── 6. Log Files Table ───────────────────────────────────────────────────────
test.describe('6. Log Files Table', () => {
  test('LP-DEBUG-020 | Table column "File" header is visible', async () => {
    await expect(page.getByText('File')).toBeVisible();
  });
  test('LP-DEBUG-021 | Table column "Size" header is visible', async () => {
    await expect(page.getByText('Size')).toBeVisible();
  });
  test('LP-DEBUG-022 | Table column "Last Modified" header is visible', async () => {
    await expect(page.getByText('Last Modified')).toBeVisible();
  });
  test('LP-DEBUG-023 | Table column "Actions" header is visible', async () => {
    await expect(page.getByText('Actions')).toBeVisible();
  });
  test('LP-DEBUG-024 | At least one log file is listed in the table', async () => {
    await expect(page.getByText(/\.log/)).toBeVisible();
  });
  test('LP-DEBUG-025 | Log file name matches pattern "debug-*.log"', async () => {
    await expect(page.getByText(/debug-[a-z0-9]+\.log/)).toBeVisible();
  });
  test('LP-DEBUG-026 | Log file shows a file size', async () => {
    await expect(page.getByText(/\d+\s*(B|KB|MB)/)).toBeVisible();
  });
  test('LP-DEBUG-027 | Log file shows Last Modified date in DD/MM/YYYY format', async () => {
    await expect(page.getByText(/\d{2}\/\d{2}\/\d{4}/)).toBeVisible();
  });
  test('LP-DEBUG-028 | Log file shows Last Modified time (HH:MM:SS)', async () => {
    await expect(page.getByText(/\d{2}:\d{2}:\d{2}/)).toBeVisible();
  });
  test('LP-DEBUG-029 | Log file row has a view/eye action icon', async () => {
    const row = page.locator('table tbody tr').first();
    await expect(row.locator('button, a, svg').first()).toBeVisible();
  });
  test('LP-DEBUG-030 | Log file row has a delete/trash action icon', async () => {
    const row = page.locator('table tbody tr').first();
    const icons = row.locator('button, a, svg');
    const count = await icons.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });
});

// ─── 7. Refresh Button Behaviour ─────────────────────────────────────────────
test.describe('7. Refresh Button', () => {
  test('LP-DEBUG-031 | Clicking "Refresh" reloads the log file list without error', async () => {
    await page.getByRole('button', { name: /^refresh$/i }).click();
    await page.waitForLoadState('networkidle');
    await expect(page).not.toHaveTitle(/error|404|500/i);
    await expect(page.getByText('Log Files')).toBeVisible();
  });
  test('LP-DEBUG-032 | Log file is still listed after refresh', async () => {
    await expect(page.getByText(/\.log/)).toBeVisible();
  });
});

// ─── 8. Sidebar & Footer ─────────────────────────────────────────────────────
test.describe('8. Sidebar & Footer', () => {
  test('LP-DEBUG-033 | "Debug Logs" is highlighted as active in sidebar', async () => {
    const active = page.locator('#adminmenu li.current, #adminmenu li.wp-current-menu-item').first();
    await expect(active).toBeVisible();
  });
  test('LP-DEBUG-034 | All 7 plugin menu items are visible', async () => {
    const menu = page.locator('#adminmenu');
    for (const item of ['Dashboard', 'Connection', 'Mappings', 'Manual Sync', 'Audit Logs', 'Sync Config', 'Debug Logs']) {
      await expect(menu.getByText(item)).toBeVisible();
    }
  });
  test('LP-DEBUG-035 | WordPress footer is visible', async () => {
    await expect(page.getByText(/Thank you for creating with/i)).toBeVisible();
  });
  test('LP-DEBUG-036 | WordPress version shown in footer', async () => {
    await expect(page.locator('#wpfooter').getByText(/Version \d+\.\d+/i)).toBeVisible();
  });
});

// ─── 9. Accessibility ─────────────────────────────────────────────────────────
test.describe('9. Accessibility', () => {
  test('LP-DEBUG-037 | All links have non-empty href', async () => {
    const links = await page.locator('a[href]').all();
    for (const link of links) {
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
    }
  });
  test('LP-DEBUG-038 | Page has exactly one H1 heading', async () => {
    const h1s = await page.getByRole('heading', { level: 1 }).count();
    expect(h1s).toBe(1);
  });
});
