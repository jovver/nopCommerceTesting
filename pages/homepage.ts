import { type Locator, type Page, expect } from '@playwright/test';

export class Homepage {
    readonly page: Page;
    readonly registerButton: Locator;
    readonly homePageTitle: RegExp;
    readonly logInbutton: Locator;
    readonly logOutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.registerButton = page.getByRole('link', { name: 'Register' });
        this.homePageTitle = /nopCommerce demo store. Home page title/;
        this.logInbutton = page.getByText('Log in');
        this.logOutButton = page.getByText('Log out');

    }

    // Basic Methods

    async clickRegisterButton() {
        await this.registerButton.click();
    }

    async clickLogInbutton() {
        await this.logInbutton.click();
    }

    async clickLogOutButton(){
        await this.logOutButton.click();
    }

    // Combination Methods


    // Assertions

    async assertPageTitle() {
        await expect(this.page).toHaveTitle(this.homePageTitle);
    }

    

}

export default Homepage;