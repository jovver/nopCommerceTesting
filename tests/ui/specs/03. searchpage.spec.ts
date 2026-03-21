import { test } from '../fixtures.js';
import productsList from '../../data/products.js'

test.use({storageState: process.env.USERPATH});

test.describe('Search Page tests', () => {

    test('user can search for a product and verify the contents', async ({ searchResultsPage }) => {
        // Arrange
        const searchProduct = String(productsList.products[0]?.name);
        searchResultsPage.productName = searchProduct;

        // Act
        await searchResultsPage.enterProductName(searchProduct);
        await searchResultsPage.clickSearchButton();

        // Assert
        await searchResultsPage.assertSearchProductVisible();
        
    })

    test('user searches for a product, no results', async ({ searchResultsPage }) => {
        // Arrange
        const searchProduct = String(productsList.products[1]?.name)

        // Act
        await searchResultsPage.enterProductName(searchProduct);
        await searchResultsPage.clickSearchButton();

        // Assert
        await searchResultsPage.assertNoResultsMessageVisible();        

    })

});