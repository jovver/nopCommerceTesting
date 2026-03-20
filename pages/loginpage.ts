import { type Locator, type Page, expect } from '@playwright/test';
import { RegisterPage } from './registerpage';

export class LoginPage extends RegisterPage{
    readonly page: Page;
    readonly loginButton: Locator;

    constructor(page: Page){
        super(page);
        this.page = page;
        this.loginButton = page.getByRole('button', { name: 'Log in' });
    }

    // Basic Methods

    async clickLoginButton(){
        await this.loginButton.click();
    }

    // Combination Methods

    async enterCredentialsAndLogin(email: string, password: string){
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickContinueButton();
    }

    // Assertions

    

}

export default LoginPage;