import { test, expect } from '@playwright/test';
import { Homepage } from '../pages/homepage.js';


test.describe('Homepage tests', () => {

    test('page is opened successfully', async ({ page }) => {
        await page.goto(process.env.BASE_URL!);
        const homePage = new Homepage(page);
        await homePage.assertPageTitle();
    })
});