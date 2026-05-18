import { test, expect, Page } from '@playwright/test';
import { loginAsAdmin, goToPluginPage, PLUGIN_PAGES } from './helpers/auth';

test.describe('LedgerPort Dashboard', () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    await loginAsAdmin(page);
    await goToPluginPage(page, PLUGIN_PAGES.dashboard);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test.describe('1. Page Load & Title', () => {
    test('LP-DASH-001 | Page title contains "Dashboard"', async () => {
      await expect(page).toHaveTitle(/Dashboard/i);
    });
    test('LP-DASH-002 | URL resolves to dashboard without redirect', async () => {
      expect(page.url()).toContain('page=ledgerport');
      expect(page.url()).not.toContain('wp-login.php');
    });
  });

  test.describe('2. Header Branding', () => {
    test('LP-DASH-003 | LedgerPort brand name is visible in header', async () => {
      await expect(page.getByText('LedgerPort').first()).toBeVisible();
    });
    test('LP-DASH-004 | Notification bell icon is visible', async () => {
      await expect(page.locator('button[aria-label*="notification"], .notification-bell').first()).toBeVisible();
    });
    test('LP-DASH-005 | Help icon is visible in header', async () => {
      await expect(page.locator('button[aria-label*="help"], .help-icon').first()).toBeVisible();
    });
  });

  test.describe('3. Overview Heading', () => {
    test('LP-DASH-006 | "Overview" heading is visible', async () => {
      await expect(page.getByRole('heading', { name: /overview/i })).toBeVisible();
    });
    test('LP-DASH-007 | Sub-heading text is correct', async () => {
      await expect(page.getByText('Sync health, recent activity, and what needs your attention.')).toBeVisible();
    });
  });

  test.describe('4. Date Filter Toolbar', () => {
    test('LP-DASH-008 | "Syncing your store" label is visible', async () => {
      await expect(page.getByText('Syncing your store')).toBeVisible();
    });
    test('LP-DASH-009 | Dropdown defaults to "Last 7 days"', async () => {
      await expect(page.getByText('Last 7 days')).toBeVisible();
    });
    test('LP-DASH-010 | Date range is displayed', async () => {
      await expect(page.getByText(/\w+ \d+, \d{4}\s*[–-]\s*\w+ \d+, \d{4}/)).toBeVisible();
    });
    test('LP-DASH-011 | Last sync badge is visible', async () => {
      await expect(page.getByText(/last sync:/i)).toBeVisible();
    });
    test('LP-DASH-012 | "Sync now" button is visible and enabled', async () => {
      const btn = page.getByRole('button', { name: /sync now/i });
      await expect(btn).toBeVisible();
      await expect(btn).toBeEnabled();
    });
  });

  test.describe('5. Sync Health Card', () => {
    test('LP-DASH-013 | "SYNC HEALTH" label is visible', async () => {
      await expect(page.getByText('SYNC HEALTH')).toBeVisible();
    });
    test('LP-DASH-014 | Success rate percentage is displayed', async () => {
      await expect(page.getByText(/\d+% success rate/i).first()).toBeVisible();
    });
    test('LP-DASH-015 | Total syncs count is displayed', async () => {
      await expect(page.getByText(/\d+ total syncs/i)).toBeVisible();
    });
    test('LP-DASH-016 | "View error log" link is visible', async () => {
      await expect(page.getByRole('link', { name: /view error log/i })).toBeVisible();
    });
  });

  test.describe('6. Orders Card', () => {
    test('LP-DASH-017 | "ORDERS" label is visible', async () => {
      await expect(page.getByText('ORDERS').first()).toBeVisible();
    });
    test('LP-DASH-018 | Orders count is displayed', async () => {
      await expect(page.getByText(/\d+ orders/i).first()).toBeVisible();
    });
    test('LP-DASH-019 | "View report" link is visible', async () => {
      await expect(page.getByRole('link', { name: /view report/i })).toBeVisible();
    });
  });

  test.describe('7. Needs Attention Card', () => {
    test('LP-DASH-020 | "NEEDS ATTENTION" label is visible', async () => {
      await expect(page.getByText('NEEDS ATTENTION')).toBeVisible();
    });
    test('LP-DASH-021 | Items count is displayed', async () => {
      await expect(page.getByText(/\d+ items/i)).toBeVisible();
    });
    test('LP-DASH-022 | "Review issues" link is visible', async () => {
      await expect(page.getByRole('link', { name: /review issues/i })).toBeVisible();
    });
  });

  test.describe('8. Data Health Overview', () => {
    test('LP-DASH-023 | "Data Health Overview" heading is visible', async () => {
      await expect(page.getByText('Data Health Overview')).toBeVisible();
    });
    test('LP-DASH-024 | PRODUCTS column is visible', async () => {
      await expect(page.getByText('PRODUCTS').first()).toBeVisible();
    });
    test('LP-DASH-025 | ORDERS column is visible', async () => {
      await expect(page.getByText('ORDERS').first()).toBeVisible();
    });
    test('LP-DASH-026 | CUSTOMERS column is visible', async () => {
      await expect(page.getByText('CUSTOMERS')).toBeVisible();
    });
    test('LP-DASH-027 | INVENTORY column is visible', async () => {
      await expect(page.getByText('INVENTORY')).toBeVisible();
    });
  });

  test.describe('9. Recent Activity', () => {
    test('LP-DASH-028 | "Recent Activity" heading is visible', async () => {
      await expect(page.getByText('Recent Activity')).toBeVisible();
    });
    test('LP-DASH-029 | "View all" link is visible', async () => {
      await expect(page.getByRole('link', { name: /view all/i })).toBeVisible();
    });
  });

  test.describe('10. Setup Checklist', () => {
    test('LP-DASH-030 | "Setup checklist" heading is visible', async () => {
      await expect(page.getByText('Setup checklist')).toBeVisible();
    });
    test('LP-DASH-031 | "Connect WooCommerce" item is visible', async () => {
      await expect(page.getByText('Connect WooCommerce')).toBeVisible();
    });
    test('LP-DASH-032 | "Connect QuickBooks" item is visible', async () => {
      await expect(page.getByText('Connect QuickBooks')).toBeVisible();
    });
    test('LP-DASH-033 | "Configure sync settings" item is visible', async () => {
      await expect(page.getByText('Configure sync settings')).toBeVisible();
    });
    test('LP-DASH-034 | "Enable automatic sync" item is visible', async () => {
      await expect(page.getByText('Enable automatic sync')).toBeVisible();
    });
  });

  test.describe('11. Connections Widget', () => {
    test('LP-DASH-035 | "Connections" heading is visible', async () => {
      await expect(page.getByText('Connections')).toBeVisible();
    });
    test('LP-DASH-036 | QuickBooks is listed', async () => {
      await expect(page.getByText('QuickBooks')).toBeVisible();
    });
    test('LP-DASH-037 | WooCommerce is listed', async () => {
      await expect(page.getByText('WooCommerce')).toBeVisible();
    });
  });

  test.describe('12. Configuration Widget', () => {
    test('LP-DASH-038 | "Configuration" heading is visible', async () => {
      await expect(page.getByText('Configuration')).toBeVisible();
    });
    test('LP-DASH-039 | Method label is visible', async () => {
      await expect(page.getByText('Method')).toBeVisible();
    });
    test('LP-DASH-040 | Frequency label is visible', async () => {
      await expect(page.getByText('Frequency')).toBeVisible();
    });
    test('LP-DASH-041 | Auto sync label is visible', async () => {
      await expect(page.getByText('Auto sync')).toBeVisible();
    });
    test('LP-DASH-042 | "Manage settings" link is visible', async () => {
      await expect(page.getByRole('link', { name: /manage settings/i })).toBeVisible();
    });
  });

  test.describe('13. Sidebar Navigation', () => {
    test('LP-DASH-043 | All 7 plugin menu items are visible', async () => {
      const menu = page.locator('#adminmenu');
      await expect(menu.getByText('Dashboard')).toBeVisible();
      await expect(menu.getByText('Connection')).toBeVisible();
      await expect(menu.getByText('Mappings')).toBeVisible();
      await expect(menu.getByText('Manual Sync')).toBeVisible();
      await expect(menu.getByText('Audit Logs')).toBeVisible();
      await expect(menu.getByText('Sync Config')).toBeVisible();
      await expect(menu.getByText('Debug Logs')).toBeVisible();
    });
    test('LP-DASH-044 | Connection menu link has correct href', async () => {
      const href = await page.locator('#adminmenu').getByRole('link', { name: /^connection$/i }).getAttribute('href');
      expect(href).toContain('ledgerport-connection');
    });
    test('LP-DASH-045 | Mappings menu link has correct href', async () => {
      const href = await page.locator('#adminmenu').getByRole('link', { name: /^mappings$/i }).getAttribute('href');
      expect(href).toContain('ledgerport-mappings');
    });
    test('LP-DASH-046 | Debug Logs menu link has correct href', async () => {
      const href = await page.locator('#adminmenu').getByRole('link', { name: /^debug logs$/i }).getAttribute('href');
      expect(href).toContain('ledgerport-debug-logs');
    });
  });

  test.describe('14. Footer', () => {
    test('LP-DASH-047 | WordPress footer text is visible', async () => {
      await expect(page.getByText(/Thank you for creating with/i)).toBeVisible();
    });
    test('LP-DASH-048 | WordPress version number is shown', async () => {
      await expect(page.locator('#wpfooter').getByText(/Version \d+\.\d+/i)).toBeVisible();
    });
  });
});
