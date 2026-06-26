import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Independent Playwright config for the LedgerPort WordPress plugin.
 *
 * Self-contained: own node_modules, vendored reporters/, own results.db, and
 * env-based credentials (no hardcoded logins). Covers two suites:
 *   - tests/*.spec.ts        legacy regression suite (global storageState login)
 *   - tests/modern/**        newer e2e/a11y/smoke (fixture-managed login)
 *
 * Secrets come from a gitignored .env (see .env.example). Run: `npm test`.
 */

// Load .env if present (real creds live here, gitignored).
const envFile = path.resolve(__dirname, '.env');
if (fs.existsSync(envFile)) {
  require('dotenv').config({ path: envFile });
}

const BASE_URL = process.env.BASE_URL ?? 'https://qastaging.pushengage.com';
const CI = !!process.env.CI;
const RESULTS_DB = path.resolve(__dirname, 'results.db');

export default defineConfig({
  testDir: './tests',
  testIgnore: ['**/node_modules/**', '**/playwright-report/**'],
  globalSetup: './global-setup.ts',
  fullyParallel: false,
  forbidOnly: CI,
  retries: CI ? 1 : 0,
  workers: 1,

  timeout: 60_000,
  expect: {
    timeout: 10_000,
    toHaveScreenshot: { maxDiffPixelRatio: 0.02, animations: 'disabled' },
  },

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    [path.resolve(__dirname, 'reporters/sqlite-reporter.ts'), {
      dbPath: RESULTS_DB,
      env: process.env.QA_ENV ?? 'staging',
      baseUrl: BASE_URL,
      tester: process.env.QA_TESTER ?? process.env.USER ?? 'unknown',
      commitSha: process.env.GITHUB_SHA ?? 'live-test',
      product: 'ledgerport-wordpress-plugin',
    }],
    [path.resolve(__dirname, 'reporters/coverage-reporter.ts'), {
      tester: process.env.QA_TESTER ?? process.env.USER ?? 'automation',
    }],
  ],

  use: {
    baseURL: BASE_URL,
    // Legacy suite starts pre-authenticated via global-setup; the modern
    // suite manages its own context through tests/modern/fixtures/auth.ts.
    storageState: fs.existsSync(path.resolve(__dirname, '.auth/admin.json'))
      ? '.auth/admin.json'
      : undefined,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },

  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  outputDir: path.resolve(__dirname, 'test-results'),
});
