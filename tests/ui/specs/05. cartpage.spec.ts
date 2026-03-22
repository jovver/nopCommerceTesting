import { test, expect } from '../fixtures.js';
import uiPagesURL from '@tests/ui/utils/uiPagesURL.js';
import environmentBaseURL from '@utils/environmentBaseURL.js';
import { StateAPI } from '@tests/api/utils/stateAPI.js';

test.use({ storageState: process.env.USERPATH });

test.describe.configure({ mode: 'serial' });

test.describe('Cart Page tests', () => {

    const billingAddressOne = 'Test Address';
    const billingCity = 'Test Billing City';
    const billingZipCode = '0000';
    const billingPhoneNumber = '1010101010';
    const countryId = '237';
    const shippingMethod = 'Ground';
    const paymentMethod = 'Check / Money Order';

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

    test('user is able to complete the checkout process', async ({ shoppingCartPage, CheckOutPage, request, page }) => {
        // Arrange 
        const stateAPI = new StateAPI(request, environmentBaseURL.local.state, countryId);
        const randomState = String(await stateAPI.getRandomState());
        
        // Act
        await shoppingCartPage.clickCheckOutButton()
        await CheckOutPage.selectBillingState(randomState);
        await CheckOutPage.enterBillingAddressOne(billingAddressOne);
        await CheckOutPage.enterBillingCity(billingCity);
        await CheckOutPage.enterBillingZipCode(billingZipCode);
        await CheckOutPage.enterBillingPhoneNumber(billingPhoneNumber);
        await CheckOutPage.clickContinueButton();
        
        await CheckOutPage.selectShippingMethod(shippingMethod);
        await CheckOutPage.clickContinueButton();

        await CheckOutPage.selectPaymentMethod(paymentMethod);
        await CheckOutPage.clickContinueButton();

        await CheckOutPage.clickContinueButton();

        await CheckOutPage.clickConfirmButton();
        const response = await page.request.get(environmentBaseURL.local.checkout);

        // Assert
        expect(response.status()).toBe(200);
        await CheckOutPage.expectOrderConfirmationMessageVisible();

    })

});