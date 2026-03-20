import { chromium } from '@playwright/test'
import credentialGenerator from '../utils/credentialGeneration';
import { env } from 'node:process';
import { Homepage } from './ui/pages/homepage';

async function globalSetup(): Promise<void> {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const userName = credentialGenerator.randomUserName();
    const pwLength = credentialGenerator.randomPWLength(6, 64);
    const password = credentialGenerator.randomPassword(pwLength);
    const email = credentialGenerator.randomEmail(userName);
    const baseURL = process.env.BASE_URL!;
    const homePage = new Homepage(page);

    try {
        await page.goto(baseURL);
        homePage.assertPageTitle();
    }
    catch (error){
        console.log('Website is not accessible: ', error);
    }

    await browser.close();
}

export default globalSetup