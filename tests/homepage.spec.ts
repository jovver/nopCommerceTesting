import { test, expect } from '@playwright/test';

test('has title', async( { page }) => {
  // URL to be abstracted
  await page.goto('https://demo.nopcommerce.com/')

  await expect(page).toHaveTitle('nopCommerce demo store. Home page title')
  });
