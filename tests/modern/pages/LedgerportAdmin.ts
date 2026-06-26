import { Page, expect } from '@playwright/test';

/**
 * Lightweight Page Object for the Ledgerport plugin admin pages.
 * Selectors are intentionally generic — the goal is to *probe* the UI on a
 * first contact, not assert against a fixed DOM. As selectors stabilise we'll
 * tighten these.
 */
export class LedgerportAdmin {
  constructor(private page: Page) {}

  async openDashboard() {
    await this.page.goto('/wp-admin/admin.php?page=ledgerport');
  }

  /**
   * Visit every Ledgerport admin entry-point we can discover from the WP admin
   * left-nav. Returns an array of {label, url, ok} so the caller can record
   * pass/fail per screen.
   */
  async discoverSubpages(): Promise<{ label: string; url: string; status: number }[]> {
    await this.page.goto('/wp-admin/admin.php?page=ledgerport');

    // Look for the WP admin left-nav submenu under "LedgerPort" (or
    // "Ledgerport" — case sometimes drifts) and harvest the hrefs.
    const links = await this.page.locator(
      '#adminmenu li.toplevel_page_ledgerport ul.wp-submenu a, ' +
      '#adminmenu a[href*="page=ledgerport"]'
    ).all();

    const seen = new Set<string>();
    const items: { label: string; url: string; status: number }[] = [];
    for (const link of links) {
      const href = (await link.getAttribute('href')) || '';
      const label = (await link.textContent())?.trim() || href;
      if (!href || seen.has(href)) continue;
      seen.add(href);
      // Push as discovered — actual status comes from probing.
      items.push({ label, url: href, status: 0 });
    }
    return items;
  }

  /**
   * Visit a single admin URL and return the HTTP status of the navigation.
   */
  async probe(href: string): Promise<number> {
    const resp = await this.page.goto(href, { waitUntil: 'domcontentloaded' });
    return resp?.status() ?? 0;
  }

  /**
   * Snapshot recipes for the common WP error patterns we care about.
   * Returns a list of detected issues (empty if clean).
   */
  async detectIssues(): Promise<string[]> {
    const issues: string[] = [];
    const html = await this.page.content();

    if (/Fatal error[: ]/i.test(html)) issues.push('PHP Fatal error in page HTML');
    if (/Parse error[: ]/i.test(html)) issues.push('PHP Parse error in page HTML');
    if (/Warning[: ]/.test(html))      issues.push('PHP Warning visible in page HTML');
    if (/Notice[: ]/.test(html))       issues.push('PHP Notice visible in page HTML');
    if (/Deprecated[: ]/.test(html))   issues.push('PHP Deprecated notice in page HTML');

    // WP "Error establishing a database connection"
    if (/Error establishing a database connection/i.test(html)) {
      issues.push('Database connection error visible');
    }

    // White screen of death — checks if the body is suspiciously empty
    const bodyText = await this.page.locator('body').innerText().catch(() => '');
    if (bodyText.trim().length < 80) issues.push('Page body suspiciously short (possible WSOD)');

    return issues;
  }
}
