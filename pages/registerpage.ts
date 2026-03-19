import { type Locator, type Page, expect } from '@playwright/test';

export class RegisterPage{
    readonly page: Page;
    readonly maleRadio: Locator;
    readonly femaleRadio: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly emailField: Locator;
    readonly companyName: Locator;
    readonly newsCheckbox: Locator;
    readonly passwordField: Locator;
    readonly confirmPasswordField: Locator;
    readonly confirmRegistrationButton: Locator;
    readonly registrationResult: Locator;
    readonly continueButton: Locator;

    constructor (page: Page){
        this.page = page;
        this.maleRadio = page.getByRole('radio', { name: 'Male'});
        this.femaleRadio = page.getByRole('radio', { name: 'Female'});
        this.firstName = page.getByRole('textbox', { name: 'FirstName'});
        this.lastName = page.getByRole('textbox', { name: 'LastName'});
        this.emailField = page.getByrole('textbox', { name: 'Email'});
        this.companyName = page.getByRole('textbox', { name: 'Company'});
        this.newsCheckbox = page.getByRole('checkbox', { name: 'NewsLetterSubscriptions_0__IsActive'});
        this.passwordField = page.getByRole('textbox', { name: 'Password'});
        this.confirmPasswordField = page.getByRole('textbox', { name: 'ConfirmPassword'});
        this.confirmRegistrationButton = page.getByRole('button', {name: 'register-button'});
        this.registrationResult = page.getByText('Your registration completed');
        this.continueButton = page.getBytext('Continue');

    }

    // Base Methods

    async clickGenderRadio(gender: string){
        if (gender == 'Male'){
            await this.maleRadio.click();
        }
        else{
            await this.femaleRadio.click();
        }
    }

    async enterFirstname(firstName: string){
        await this.firstName.fill(firstName);
    }

    async enterLastName(lastName: string){
        await this.lastName.fill(lastName);
    }

    async enterEmail(emailAddress: string){
        await this.emailField.fill(emailAddress);
    }

    async enterCompanyName(companyName: string){
        await this.companyName.fill(companyName);
    }

    async clickNewsChecbox(check: boolean){
        if (check == true){
            return;
        }
        else{
            this.newsCheckbox.click();
        }
    }

    async enterPassword(password: string){
        this.passwordField.fill(password);
    }

    async enterConfirmPassword(password: string){
        this.confirmPasswordField.fill(password);
    }

    async clickRegistrationButtion(){
        this.confirmRegistrationButton.click();
    }

    async clickContinueButton(){
        this.continueButton.click();
    }

    // Combination methods


    // Assertions

}

export default RegisterPage;