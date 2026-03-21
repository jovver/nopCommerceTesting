import { type Locator, type Page } from '@playwright/test';
import { RegisterPage } from './registerpage.js';

export class LoginPage extends RegisterPage{
    readonly loginButton: Locator;

    constructor(page: Page){
        super(page);
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