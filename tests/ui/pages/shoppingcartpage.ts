import {type Locator, type Page, expect } from '@playwright/test';

export class ShoppingCartPage {
    readonly page: Page;
    private readonly shoppingCartTitle: Locator;
    private readonly termsOfServiceCheckbox: Locator;
    private readonly checkOutButton: Locator;
    private readonly dialogBoxtitle: Locator;
    private readonly dialogBoxClose: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shoppingCartTitle = page.getByRole('heading', { name: 'Shopping cart' });
        this.termsOfServiceCheckbox = page.getByRole('checkbox', { name: 'termsofservice' });
        this.checkOutButton = page.getByRole('button', { name: 'checkout', exact: true });
        this.dialogBoxtitle = page.getByRole('dialog', { name: 'Terms of service' });
        this.dialogBoxClose = page.getByRole('button', { name: 'Close' });

    }

    // Basic Methods

    async clickTermsOfServiceCheckbox(){
        await this.termsOfServiceCheckbox.check();
    }

    async clickCheckOutButton(){
        await this.checkOutButton.click();
    }

    async clickCloseTermsOfServiceBox(){
        await this.dialogBoxClose.click();
    }

    // Combination Methods



    // Assertions

    async expectShoppingCartTitleVisible(){
        await expect(this.shoppingCartTitle).toBeVisible();
    }

    async expectTermsOfServiceVisible(){
        await expect(this.dialogBoxtitle).toBeVisible();
    }

}

export default ShoppingCartPage