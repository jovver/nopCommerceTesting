import { type Locator, type Page, expect } from '@playwright/test';

export class SearchResultsPage {
    readonly page: Page;
    private readonly searchResultItem: Locator;
    private readonly searchNoResultsMessage: Locator;
    private readonly searchBox: Locator;
    private readonly searchButton: Locator;
    private readonly shoppingCartLink: Locator;
    private readonly shoppingCartQty: Locator;

    productName: string;

    constructor(page: Page, product: string) {
        this.page = page;
        this.productName = product;
        this.searchResultItem = page.getByRole('link', { name: this.productName, exact: true });
        this.searchNoResultsMessage = page.getByText('No products were found that matched your criteria.', { exact: true });
        this.searchBox = page.getByPlaceholder('Search store');
        this.searchButton = page.getByRole('button', { name: "Search" });
        this.shoppingCartLink = page.locator('#topcartlink');
        this.shoppingCartQty = this.shoppingCartLink.locator('.cart-qty');
    }

    // Basic Methods

    async clickSearchResultItem(){
        await this.searchResultItem.click();
    }

    async getCartQuantity(): Promise<number> {
        const qty = await this.shoppingCartQty.innerText();
        const match = qty.match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
    }

    async enterProductName(productName : string){
        await this.searchBox.fill(productName);
    }

    async clickSearchButton(){
        await this.searchButton.click();
    }

    // Combination Methods

    async enterAndSearchProduct(productName: string){
        await this.enterProductName(productName);
        await this.clickSearchButton();
    }

    async enterSearchAndClickProduct(productName: string){
        await this.enterProductName(productName);
        await this.clickSearchButton();
        await this.clickSearchResultItem();
    }
    
    // Assertions

    async assertNoResultsMessageVisible(){
        await expect(this.searchNoResultsMessage).toBeVisible();
    }

    async assertSearchProductVisible(){
        await expect(this.searchResultItem).toBeVisible();
    }

}

export default SearchResultsPage;