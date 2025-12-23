import { test, expect } from '@playwright/test'

test('user can open course and see TTS button', async ({ page }) => {
  await page.goto('http://localhost:3000/courses/d6bfef1e-ba9a-4632-bf14-51a735ab7378')

  // Wait for the first section title to appear
  await page.waitForSelector('main .main-content h1', { timeout: 15000 })

  // Wait for the TTS button inside the first section
  const button = page.locator('main .main-content button', { hasText: /Listen/ })
  await button.waitFor({ timeout: 15000 })

  await expect(button).toBeVisible()
})
