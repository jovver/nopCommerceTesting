import { expect, test } from '../fixtures.js';
import uiPagesURL from '@utils/uiPagesURL.js';

test.use({ storageState: process.env.USERPATH });

test.describe.configure({ mode: 'serial' });

test.describe('Cart Page tests', () => {

    test.beforeEach(async ({ page, shoppingCartPage }) => {
        page.goto(uiPagesURL.cart);
        await shoppingCartPage.clickTermsOfServiceCheckbox();

    })

    test('validate the Terms of Service dialog box', async ({ shoppingCartPage }) => {
        // Arrange

        // Act
        await shoppingCartPage.clickTermsOfServiceCheckbox();
        await shoppingCartPage.clickCheckOutButton();

        // Assert
        await shoppingCartPage.expectTermsOfServiceVisible();

    })

    test('user is able to complete the checkout process', async ({ shoppingCartPage }) => {
        // Arrange

        // Act
        await shoppingCartPage.clickCheckOutButton()


        // Assert
        await shoppingCartPage.page.once

    })

});