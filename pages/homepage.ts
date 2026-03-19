import { type Locator, type Page, expect } from '@playwright/test';

export class Homepage {
    readonly page: Page;
    readonly getRegisterButton: Locator;
    readonly getHomePageTitle: RegExp;

    constructor(page: Page) {
        this.page = page;
        this.getRegisterButton = page.getByRole('link', { name: 'Register' });
        this.getHomePageTitle = /nopCommerce demo store. Home page title/;
    }

    async clickRegisterButton() {
        await this.getRegisterButton.click();
    }

    async assertPageTitle() {
        await expect(this.page).toHaveTitle(this.getHomePageTitle);
    }
}

export default Homepage;