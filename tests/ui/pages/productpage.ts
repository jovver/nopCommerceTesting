import { type Locator, type Page, expect } from '@playwright/test';

export class ProductPage{
    readonly page: Page;
    readonly productShortDescription: Locator;
    readonly productSku: Locator;
    readonly productPrice: Locator;
    readonly productFullDescription: Locator;
    readonly addToCartButton: Locator;
    readonly quantityInput: Locator;
    readonly successBanner: Locator;
    readonly closeBanner: Locator;
    readonly shoppingCartLink: Locator;


    constructor(page: Page, shortDescription: string, sku: string, price: string, fullDescription: string) {
        this.page = page;
        this.productShortDescription = page.getByText(shortDescription, { exact: true });
        this.productSku = page.getByText(sku, { exact: true });
        this.productPrice = page.getByText(price, { exact: true });
        this.productFullDescription = page.getByText(fullDescription, { exact: true });
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.quantityInput = page.getByLabel('Enter a quantity');
        this.successBanner = page.getByText('The product has been added to your ');
        this.shoppingCartLink = this.successBanner.getByRole('link', { name: 'shopping cart' });
        this.closeBanner = page.getByTitle('Close');
    }

    // Basic Methods

    async clickAddToCartButton(){
        await this.addToCartButton.click();
    }

    async enterQuantity(quantity: number){
        await this.quantityInput.fill(quantity.toString());
    }

    async clickShoppingCartLink(){
        await this.shoppingCartLink.click();
    }

    // Combination Methods



    // Assertions

    async expectSuccessBannerVisible(){
        await expect(this.successBanner).toBeVisible();
    }

    

}

export default ProductPage;