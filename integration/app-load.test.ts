import { test, expect } from "@playwright/test";

test("app loads properly", async ({ page }) => {
  await page.goto("http://localhost:5173"); // Adjust the URL if needed
  const title = await page.title();
  expect(title).not.toBe(""); // Ensure the page has a title
});

test.skip("app displays a list of transactions", async ({ page }) => {
  // todo: implement this
});
