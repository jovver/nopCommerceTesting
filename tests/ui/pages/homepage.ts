import { type Locator, type Page, expect } from '@playwright/test';

export class Homepage {
    readonly page: Page;
    private readonly registerButton: Locator;
    private readonly homePageTitle: RegExp;
    private readonly logInbutton: Locator;
    private readonly logOutButton: Locator;
    private readonly searchBox: Locator;
    private readonly searchButton: Locator;
    private readonly myAccountButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.registerButton = page.getByRole('link', { name: 'Register' });
        this.homePageTitle = /nopCommerce demo store. Home page title/;
        this.logInbutton = page.getByText('Log in');
        this.logOutButton = page.getByText('Log out');
        this.searchBox = page.getByLabel('Search store');
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.myAccountButton = page.getByRole('link', { name: 'My account' });

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

    async enterSearchBox(productName: string) {
        await this.searchBox.fill(productName);
    }

    async clickSearchButton() {
        await this.searchButton.click();
    }

    // Combination Methods

    async searchForProduct(productName: string) {
        await this.enterSearchBox(productName);
        await this.clickSearchButton();
    }

    // Assertions

    async assertPageTitle() {
        await expect(this.page).toHaveTitle(this.homePageTitle);
    }

    async assertMyAccountButtonVisible(){
        await expect(this.myAccountButton).toBeVisible();
    }

    async assertLogOutButtonVisible(){
        await expect(this.logOutButton).toBeVisible();
    }


}

export default Homepage;