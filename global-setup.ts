import { chromium, FullConfig } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Logs in once and persists cookies to .auth/admin.json so every worker starts
 * pre-authenticated. Credentials come from the environment (.env / CI secrets)
 * — never hardcoded. If they're missing we skip setup and let auth-gated tests
 * fail/skip rather than leaking a default password.
 */
export default async function globalSetup(_config: FullConfig) {
  const BASE = process.env.BASE_URL ?? 'https://qastaging.pushengage.com';
  const user = process.env.WP_ADMIN_USER;
  const pass = process.env.WP_ADMIN_PASS;

  if (!user || !pass) {
    console.warn('[global-setup] WP_ADMIN_USER / WP_ADMIN_PASS not set — skipping pre-auth. See .env.example.');
    return;
  }

  // Skip re-auth if a valid session file already exists (e.g. saved by headed login)
  const authDir = path.resolve(__dirname, '.auth');
  const authFile = path.join(authDir, 'admin.json');
  if (fs.existsSync(authFile)) {
    console.log('[global-setup] .auth/admin.json exists — reusing saved session.');
    return;
  }

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(`${BASE}/wp-login.php`, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await page.locator('#user_login').fill(user);
  await page.locator('#user_pass').fill(pass);
  await page.locator('#wp-submit').click();
  await page.waitForURL(/wp-admin/, { timeout: 60_000 });

  if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });
  await context.storageState({ path: authFile });
  await browser.close();
}
