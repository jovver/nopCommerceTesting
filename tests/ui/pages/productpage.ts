import { type Locator, type Page, expect } from '@playwright/test';

export class ProductPage{
    readonly page: Page;
    private readonly productShortDescription: Locator;
    private readonly productSku: Locator;
    private readonly productPrice: Locator;
    private readonly productFullDescription: Locator;
    private readonly addToCartButton: Locator;
    private readonly quantityInput: Locator;
    private readonly successBanner: Locator;
    private readonly closeBanner: Locator;
    private readonly shoppingCartLink: Locator;
    private readonly incorrectQtyBanner: Locator;

    productSDText: string
    productSKUText: string
    productPriceText: string
    productFDText: string

    constructor(page: Page, shortDescription: string, sku: string, price: string, fullDescription: string) {
        this.page = page;
        this.productSDText = shortDescription;
        this.productSKUText = sku;
        this.productPriceText = price;
        this.productFDText = fullDescription;
        this.productShortDescription = page.getByText(this.productSDText, { exact: true });
        this.productSku = page.getByText(sku, { exact: true });
        this.productPrice = page.getByText(price, { exact: true });
        this.productFullDescription = page.getByText(this.productFDText, { exact: true });
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.quantityInput = page.getByLabel('Enter a quantity');
        this.successBanner = page.getByText('The product has been added to your ');
        this.shoppingCartLink = this.successBanner.getByRole('link', { name: 'shopping cart' });
        this.closeBanner = page.getByTitle('Close');
        this.incorrectQtyBanner = page.getByTitle('Quantity should be positive');
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

    async clickCloseBanner(){
        await this.closeBanner.click();
    }

    // Combination Methods



    // Assertions

    async expectSuccessBannerVisible(){
        await expect(this.successBanner).toBeVisible();
    }

    async expectProductSDVisible(){
        await expect(this.productShortDescription).toBeVisible();
    }

    async expectProductFDVisible(){
        await expect(this.productFullDescription).toBeVisible();
    }

    async expectProductSKUVisible(){
        await expect(this.productSku).toBeVisible();
    }

    async expectProductPriceVisible(){
        await expect(this.productPrice).toBeVisible();
    }

    async expectIncorrectQtyBanner(){
        await expect(this.incorrectQtyBanner).toBeVisible();
    }

    

}

export default ProductPage;