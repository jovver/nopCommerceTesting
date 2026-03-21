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
    readonly firstNameError: Locator;
    readonly lastNameError: Locator;
    readonly blankEmailError: Locator;
    readonly invalidEmailError: Locator;
    readonly invalidEmailDomainError: Locator;
    readonly blankPasswordError: Locator
    readonly invalidLengthPasswordError: Locator;
    readonly mismatchedPasswordError: Locator;


    constructor (page: Page){
        this.page = page;
        this.maleRadio = page.getByRole('radio', { name: 'Male', exact: true});
        this.femaleRadio = page.getByRole('radio', { name: 'Female', exact: true});
        this.firstName = page.getByRole('textbox', { name: 'First name:'});
        this.lastName = page.getByRole('textbox', { name: 'Last name:'});
        this.emailField = page.getByRole('textbox', { name: 'Email:'});
        this.companyName = page.getByRole('textbox', { name: 'Company name:'});
        this.newsCheckbox = page.getByRole('checkbox', { name: 'NewsLetter'});
        this.passwordField = page.getByRole('textbox', { name: 'Password:', exact: true});
        this.confirmPasswordField = page.getByRole('textbox', { name: 'Confirm password:'});
        this.confirmRegistrationButton = page.getByRole('button', {name: 'Register'});
        this.registrationResult = page.getByText('Your registration completed');
        this.continueButton = page.getByText('Continue');
        this.firstNameError = page.getByText('First name is required.');
        this.lastNameError = page.getByText('Last name is required.');
        this.blankEmailError = page.getByText('Email is required.');
        this.invalidEmailError = page.getByText('Please enter a valid email address.');
        this.invalidEmailDomainError = page.getByText('Wrong email');
        this.blankPasswordError = page.getByText('Password is required.');
        this.invalidLengthPasswordError = page.getByText('Password must meet the following rules:  must have at least 6 characters and not greater than 64 characters');
        this.mismatchedPasswordError = page.getByText('The password and confirmation password do not match.');

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
            await this.newsCheckbox.click();
        }
    }

    async enterPassword(password: string){
        await this.passwordField.fill(password);
    }

    async enterConfirmPassword(password: string){
        await this.confirmPasswordField.fill(password);
    }

    async clickRegistrationButton(){
        await this.confirmRegistrationButton.click();
    }

    async clickContinueButton(){
        await this.continueButton.click();
    }

    // Combination methods

    async enterValidRegistrationInfo(gender: string, firstName: string, lastName: string, email: string, password: string){
        await this.clickGenderRadio(gender);
        await this.enterFirstname(firstName);
        await this.enterLastName(lastName);
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.enterConfirmPassword(password);
    }


    // Assertions

    async assertRegistrationSuccess(){
        await expect(this.registrationResult).toBeVisible();
    }

    async assertFirstNameError(){
        await expect(this.firstNameError).toBeVisible();
    }
    
    async assertLastNameError(){
        await expect(this.lastNameError).toBeVisible();
    }

    async assertBlankEmailError(){
        await expect(this.blankEmailError).toBeVisible();
    }

    async assertInvalidEmailError(){
        await expect(this.invalidEmailError).toBeVisible();
    }

    async assertInvalidEmailDomainError(){
        await expect(this.invalidEmailDomainError).toBeVisible();
    }

    async assertBlankPasswordError(){
        await expect(this.blankPasswordError).toBeVisible();
    }

    async assertMismatchedPasswordError(){
        await expect(this.mismatchedPasswordError).toBeVisible();
    }

    async assertInvalidLengthPasswordError(){
        await expect(this.invalidLengthPasswordError).toBeVisible();
    }
}

export default RegisterPage;