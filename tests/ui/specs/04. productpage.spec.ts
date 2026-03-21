import { test } from '../fixtures.js';
import productsList from '../../data/products.js'

test.use({ storageState: process.env.USERPATH });

test.describe.configure({ mode: 'serial' });

test.describe('Product Page tests', () => {

    const shortDescription = String(productsList.products[0]?.shortDescription);
    const fullDescription = String(productsList.products[0]?.fullDescription);
    const sku = String(productsList.products[0]?.sku);
    const price = String(productsList.products[0]?.price);
    const productURL = String(productsList.products[0]?.url);

    test.beforeEach(async ({ page }) => {
        page.goto(productURL);
    })

    test('validate the contents of the contents of the selected product', async ({ productPage }) => {
        // Arrange
        productPage.productSDText = shortDescription;
        productPage.productFDText = fullDescription;
        productPage.productSKUText = sku;
        productPage.productPriceText = price;

        // Act


        // Assert
        await productPage.expectProductSDVisible();
        await productPage.expectProductFDVisible();
        await productPage.expectProductPriceVisible();
        await productPage.expectProductSKUVisible();

    })

    test('user adds no item', async ({ productPage }) => {
        // Arrange

        // Act
        await productPage.enterQuantity(0);
        await productPage.clickAddToCartButton();

        // Assert
        await productPage.expectIncorrectQtyBanner();
        await productPage.clickCloseBanner();

    })

    test('user adds an item', async ({ productPage }) => {
        // Arrange

        // Act
        await productPage.enterQuantity(1);
        await productPage.clickAddToCartButton();

        // Assert
        await productPage.expectSuccessBannerVisible();
        await productPage.clickCloseBanner();
    })

});