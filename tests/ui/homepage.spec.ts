import { test, expect } from '@playwright/test';
import { Homepage } from '../pages/homepage';

// TODO: Move to env file
const baseURL = 'https://demo.nopcommerce.com/';

test.describe('Homepage tests', () => {
    test.before
})
test('has title', async( { page }) => {
  // URL to be abstracted
  await page.goto('https://demo.nopcommerce.com/')

  await expect(page).toHaveTitle('nopCommerce demo store. Home page title')
  });
