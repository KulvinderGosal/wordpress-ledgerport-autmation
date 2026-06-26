import { test, expect } from '@playwright/test';

/**
 * Ledgerport smoke — no admin login. Verifies the host install is alive and
 * the plugin source is present.
 */
test.describe('Ledgerport · staging smoke', () => {
  test.beforeAll(() => {
    test.info().annotations.push({ type: 'feature', description: 'area-1-smoke' });
  });

  test('Front-end / responds 2xx/3xx', async ({ page, baseURL }) => {
    const resp = await page.goto('/');
    const status = resp?.status() ?? 0;
    expect([200, 301, 302].includes(status), `${baseURL} → HTTP ${status}`).toBeTruthy();
  });

  test('wp-login.php renders', async ({ page }) => {
    await page.goto('/wp-login.php', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#user_login')).toBeVisible();
    await expect(page.locator('#user_pass')).toBeVisible();
  });

  test('Ledgerport plugin source served', async ({ request }) => {
    const r = await request.get('/wp-content/plugins/ledgerport/readme.txt');
    expect(r.status()).toBe(200);
    const body = await r.text();
    expect(body, 'readme.txt should declare a Stable tag').toMatch(/Stable tag:\s*\d/);
  });

  test('ledgerport.php enforces ABSPATH guard', async ({ request }) => {
    // Directly hitting the main plugin PHP from the web should return blank or
    // near-blank (the ABSPATH guard rejects direct loads). A non-trivial body
    // would indicate the guard is missing.
    const r = await request.get('/wp-content/plugins/ledgerport/ledgerport.php');
    const body = await r.text();
    expect(body.length, `Response was ${body.length} bytes — ABSPATH guard may be missing`).toBeLessThan(200);
  });

  test('Admin URL gates correctly to wp-login', async ({ page }) => {
    const resp = await page.goto('/wp-admin/admin.php?page=ledgerport', { waitUntil: 'domcontentloaded' });
    // After the redirect chain we should land on wp-login with a redirect_to
    // back to the admin URL.
    await expect(page).toHaveURL(/wp-login\.php/);
    await expect(page).toHaveURL(/redirect_to=.*page%3Dledgerport/);
    expect(resp?.ok()).toBeTruthy();
  });

  test('No PHP error signatures leak to /', async ({ page }) => {
    await page.goto('/');
    const html = await page.content();
    const leaks = ['Fatal error:', 'Parse error:', 'Warning: ', 'Notice: ', 'Deprecated:']
      .filter(s => html.includes(s));
    expect(leaks, `PHP signatures leaked: ${leaks.join(', ')}`).toEqual([]);
  });
});
