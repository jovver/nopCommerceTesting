import {type Locator, type Page, expect } from '@playwright/test';

export class CheckOutPage {
    readonly page: Page;
    private readonly checkOutTitle: Locator
    private readonly billingShipAddressCheckBox: Locator;
    private readonly billingFirstNameField: Locator;
    private readonly billingLastNameField: Locator;
    private readonly billingEmailField: Locator;
    private readonly billingCountryDropdown: Locator;
    private readonly billingCityField: Locator;
    private readonly billingAddressOneField: Locator;
    private readonly billingZipCodeField: Locator;
    private readonly billingPhoneNumberField: Locator;
    private readonly billingContinueButton: Locator;
    private readonly shippingMethodRadioGround: Locator;
    private readonly shippingMethodRadioAir: Locator;
    private readonly shippingMethodRadioNext: Locator;
    private readonly paymentMethodRadioOrder: Locator;
    private readonly paymentMethodRadioCC: Locator;
    private readonly ccDropdown: Locator;
    private readonly cardholderNameField: Locator;
    private readonly cardNumberField: Locator
    private readonly expirationMonthDropdown: Locator;
    private readonly expirationYearDropdown: Locator;
    private readonly cardCodeField: Locator;
    private readonly confirmButton: Locator;
    private readonly orderConfirmationMessage: Locator;
    private readonly errorCardHolderName: Locator;
    private readonly errorCardNumber: Locator;
    private readonly errorCVV: Locator;
    private readonly errorExpirationDate: Locator;


    constructor(page: Page) {
        this.page = page;
        this.checkOutTitle = page.getByRole('heading', { name: 'Checkout' });
        this.billingShipAddressCheckBox = page.getByRole('checkbox', { name: 'ShipToSameAddress' });
        this.billingFirstNameField = page.getByRole('textbox', { name: 'BillingNewAddress.FirstName' });
        this.billingLastNameField = page.getByRole('textbox', { name: 'BillingNewAddress.LastName' });
        this.billingEmailField = page.getByRole('textbox', { name: 'BillingNewAddress.Email' });
        this.billingCountryDropdown = page.getByRole('combobox', { name: 'BillingNewAddress.CountryId' });
        this.billingCityField = page.getByRole('textbox', { name: 'BillingNewAddress.City' });
        this.billingAddressOneField = page.getByRole('textbox', { name: 'BillingNewAddress.Address1' });
        this.billingZipCodeField = page.getByRole('textbox', { name: 'BillingNewAddress.ZipPostalCode' });
        this.billingPhoneNumberField = page.getByRole('textbox', { name: 'BillingNewAddress.PhoneNumber' });
        this.billingContinueButton = page.getByRole('button', { name: 'Continue' });
        this.shippingMethodRadioGround = page.getByRole('radio', { name: 'shippingoption' }).getByText('Ground');
        this.shippingMethodRadioAir = page.getByRole('radio', { name: 'shippingoption' }).getByText('Next Day Air');
        this.shippingMethodRadioNext = page.getByRole('radio', { name: 'shippingoption' }).getByText('2nd Day Air');
        this.paymentMethodRadioOrder = page.getByRole('radio', { name: 'paymentmethod' }).getByText('Check / Money Order');
        this.paymentMethodRadioCC = page.getByRole('radio', { name: 'paymentmethod' }).getByText('Credit Card');
        this.confirmButton = page.getByRole('button', { name: 'Confirm' });
        this.orderConfirmationMessage = page.getByRole('heading', { name: 'Your order has been successfully processed!' });
        this.ccDropdown = page.getByRole('combobox', { name: 'CreditCardType' });
        this.cardholderNameField = page.getByRole('textbox', { name: 'CardholderName' });
        this.cardNumberField = page.getByRole('textbox', { name: 'CardNumber' });
        this.expirationMonthDropdown = page.getByRole('combobox', { name: 'ExpireMonth' });
        this.expirationYearDropdown = page.getByRole('combobox', { name: 'ExpireYear' });
        this.cardCodeField = page.getByRole('textbox', { name: 'CardCode' });
        this.errorCardHolderName = page.getByText('Enter cardholder name', { exact: true });
        this.errorCardNumber = page.getByText('Wrong card number', { exact: true });
        this.errorCVV = page.getByText('Wrong card code', { exact: true });
        this.errorExpirationDate = page.getByText('Card is expired', { exact: true });

    }

    // Basic Methods

    async clickShipToSameAddressCheckbox(){
        await this.billingShipAddressCheckBox.check();
    }

    async enterBillingFirstName(firstName: string){
        await this.billingFirstNameField.fill(firstName);
    }

    async enterBillingLastName(lastName: string){
        await this.billingLastNameField.fill(lastName);
    }

    async enterBillingEmail(email: string){
        await this.billingEmailField.fill(email);
    }

    async selectBillingCountry(country: string){
        await this.billingCountryDropdown.selectOption({ label: country });
    }

    async enterBillingCity(city: string){
        await this.billingCityField.fill(city);
    }

    async enterBillingAddressOne(addressOne: string){
        await this.billingAddressOneField.fill(addressOne);
    }

    async enterBillingZipCode(zipCode: string){
        await this.billingZipCodeField.fill(zipCode);
    }

    async enterBillingPhoneNumber(phoneNumber: string){
        await this.billingPhoneNumberField.fill(phoneNumber);
    }

    async clickContinueButton(){
        await this.billingContinueButton.click();
    }

    async selectShippingMethod(method: string){
        switch (method){
            case 'Next Day Air':
                await this.shippingMethodRadioAir.check();
                break;
            case '2nd Day Air':
                await this.shippingMethodRadioNext.check();
                break;
            default:
                break;
        }
    }

    async selectPaymentMethod(method: string){
        switch (method){
            case 'Credit Card':
                await this.paymentMethodRadioCC.check();
                break;
            default:
                break;
        }
    }

    async clickConfirmButton(){
        await this.confirmButton.click();
    }

    // Combination Methods



    // Assertions

    async expectCheckOutTitleVisible() {
        await expect(this.checkOutTitle).toBeVisible();
    }

    async expectOrderConfirmationMessageVisible(){
        await expect(this.orderConfirmationMessage).toBeVisible();
    }

}

export default CheckOutPage;