import {type Locator, type Page, expect } from '@playwright/test';

export class ShoppingCartPage {
    readonly page: Page;
    readonly shoppingCartTitle: Locator;
    readonly termsOfServiceCheckbox: Locator;
    readonly checkOutButton: Locator;
    readonly dialogBoxtitle: Locator;
    readonly dialogBoxClose: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shoppingCartTitle = page.getByRole('heading', { name: 'Shopping cart' });
        this.termsOfServiceCheckbox = page.getByRole('checkbox', { name: 'termsofservice' });
        this.checkOutButton = page.getByRole('button', { name: 'checkout' });
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

    // Combination Methods



    // Assertions

    async expectShoppingCartTitleVisible(){
        await expect(this.shoppingCartTitle).toBeVisible();
    }

}

export default ShoppingCartPage