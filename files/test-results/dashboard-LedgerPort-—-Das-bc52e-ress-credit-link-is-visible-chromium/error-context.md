# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard.spec.ts >> LedgerPort — Dashboard >> footer WordPress credit link is visible
- Location: tests/dashboard.spec.ts:289:7

# Error details

```
Test timeout of 60000ms exceeded while running "beforeEach" hook.
```

```
TimeoutError: page.goto: Timeout 30000ms exceeded.
Call log:
  - navigating to "https://qastaging.pushengage.com/wp-admin/", waiting until "load"

```

```
Tearing down "context" exceeded the test timeout of 60000ms.
```