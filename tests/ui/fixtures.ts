import { test as base } from '@playwright/test';
import { Homepage } from './pages/homepage.js';
import { LoginPage } from './pages/loginpage.js';
import { RegisterPage } from './pages/registerpage.js';
import { ProductPage } from './pages/productpage.js';
import { SearchResultsPage } from './pages/searchresultspage.js';
import { ShoppingCartPage } from './pages/shoppingcartpage.js';
import { CheckOutPage } from './pages/checkoutpage.js';
import { CustomerPage } from './pages/customerpage.js';
import baseEnvURL from '../../utils/environmentBaseURL.js';

type TestFixtures = {
    homePage: Homepage;
    loginPage: LoginPage;
    registerPage: RegisterPage;
    productPage: ProductPage;
    searchResultsPage: SearchResultsPage;
    shoppingCartPage: ShoppingCartPage;
    CheckOutPage: CheckOutPage;
    customerPage: CustomerPage;
};

export const test = base.extend<TestFixtures>({
    homePage: async ({ page }, use) => {
        // Setup: Navigate to home page before each test
        const baseURL = process.env.ENV === 'local' 
            ? baseEnvURL.local.home 
            : process.env.BASE_URL || baseEnvURL.local.home;
        
        await page.goto(baseURL);
        
        const homePage = new Homepage(page);
        
        console.log(`[Test Setup] Navigated to homepage: ${baseURL}`);
        
        // Use the fixture
        await use(homePage);
        
        // Teardown: Log test completion
        console.log(`[Test Teardown] Homepage test cleanup completed`);
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        
        console.log(`[Test Setup] LoginPage fixture initialized`);
        
        await use(loginPage);
        
        console.log(`[Test Teardown] LoginPage cleanup completed`);
    },

    registerPage: async ({ page }, use) => {
        const registerPage = new RegisterPage(page);
        
        console.log(`[Test Setup] RegisterPage fixture initialized`);
        
        await use(registerPage);
        
        console.log(`[Test Teardown] RegisterPage cleanup completed`);
    },

    productPage: async ({ page }, use) => {
        const productPage = new ProductPage(page, "", "", "", "");
        
        console.log(`[Test Setup] ProductPage fixture initialized`);
        
        await use(productPage);
        
        console.log(`[Test Teardown] ProductPage cleanup completed`);
    },

    searchResultsPage: async ({ page }, use) => {
        const searchResultsPage = new SearchResultsPage(page, "");
        
        console.log(`[Test Setup] SearchResultsPage fixture initialized`);
        
        await use(searchResultsPage);
        
        console.log(`[Test Teardown] SearchResultsPage cleanup completed`);
    },

    shoppingCartPage: async ({ page }, use) => {
        const shoppingCartPage = new ShoppingCartPage(page);
        
        console.log(`[Test Setup] ShoppingCartPage fixture initialized`);
        
        await use(shoppingCartPage);
        
        console.log(`[Test Teardown] ShoppingCartPage cleanup completed`);
    },

    CheckOutPage: async ({ page }, use) => {
        const checkOutPage = new CheckOutPage(page);
        
        console.log(`[Test Setup] CheckoutPage fixture initialized`);
        
        await use(checkOutPage);
        
        console.log(`[Test Teardown] CheckoutPage cleanup completed`);
    },

    customerPage: async ({ page }, use) => {
        const customerPage = new CustomerPage(page);
        
        console.log(`[Test Setup] CustomerPage fixture initialized`);
        
        await use(customerPage);
        
        console.log(`[Test Teardown] CustomerPage cleanup completed`);
    }
});

export { expect } from '@playwright/test';
