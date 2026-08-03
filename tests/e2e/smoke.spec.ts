import { expect, test } from "@playwright/test";

test("homepage and games catalog are reachable", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /small worlds/i })).toBeVisible();
  await page.getByRole("link", { name: /games/i }).first().click();
  await expect(page).toHaveURL(/\/games$/);
});
