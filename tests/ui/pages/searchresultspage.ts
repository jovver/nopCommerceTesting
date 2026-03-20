import { type Locator, type Page, expect } from '@playwright/test';

export class SearchResultsPage {
    readonly page: Page;
    readonly searchResultItem: Locator;
    readonly searchNoResultsMessage: Locator;
    readonly shoppingCartLink: Locator;
    readonly shoppingCartQty: Locator;

    protected productName: string | undefined;

    constructor(page: Page, productName : string) {
        this.page = page;
        this.productName = productName;
        this.searchResultItem = page.getByRole('link', { name: this.productName, exact: true });
        this.searchNoResultsMessage = page.getByText('No products were found that matched your criteria.', { exact: true });
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

    // Combination Methods

    

    // Assertions

    async assertNoResultsMessageVisible(){
        await expect(this.searchNoResultsMessage).toBeVisible();
    }

}

export default SearchResultsPage;