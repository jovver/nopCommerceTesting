import {type Locator, type Page, expect} from '@playwright/test';
import { RegisterPage } from './registerpage.js';

export class CustomerPage extends RegisterPage{
    readonly page: Page;
    
    constructor(page: Page){
        super(page);
        this.page = page;
    }

    // Basic Methods

    // Combination Methods

    // Assertions

    async assertFirstName(firstName: string){
        await expect(this.firstName).toHaveValue(firstName);
    }

    async assertLastName(lastName: string){
        await expect(this.lastName).toHaveValue(lastName);
    }

    async assertEmail(email: string){
        await expect(this.emailField).toHaveValue(email);
    }
}

export default CustomerPage;