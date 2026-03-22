import { chromium, FullConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { mkdirSync } from 'fs';
import uiPagesURL from '@tests/ui/utils/uiPagesURL.js';
import RegisterPage from './ui/pages/registerpage.js';
import CredentialGenerator from '@utils/credentialGeneration.js';

/**
 * Global Setup - Runs ONCE before any tests execute
 * 
*/

async function globalSetup(config: FullConfig): Promise<void> {

    interface TestCredential {
        credential: {
            username: string;
            password: string;
            email: string;
            gender: string;
        };
    }

    let sharedCredential: TestCredential = {
        credential: {
            username: '',
            password: '',
            email: '',
            gender: ''
        }
    }

    sharedCredential.credential.username = CredentialGenerator.randomUserName();
    sharedCredential.credential.password = CredentialGenerator.randomPassword(CredentialGenerator.randomPWLength(6, 64));
    sharedCredential.credential.email = CredentialGenerator.randomEmail(sharedCredential.credential.username);
    sharedCredential.credential.gender = CredentialGenerator.randomGender();

    let fullName: string;
    let firstName: string;
    let lastName: string;
    fullName = String(sharedCredential.credential.username.split('_'));
    firstName = String(fullName[0]);
    lastName = String(fullName[1]);
    console.log(`[Test Setup] Generated test credentials: ${JSON.stringify(sharedCredential)}`);
    // Load environment variables
    dotenv.config({ path: path.resolve(process.cwd(), '.env') });

    const authFile = path.join(process.cwd(), '.auth', 'user.json');
    mkdirSync(path.dirname(authFile), { recursive: true });

    const startTime = Date.now();
    const browser = await chromium.launch({ headless: true} );

    try {
        console.log('\n' + '='.repeat(70));
        console.log('[GLOBAL SETUP] Starting test suite initialization');
        console.log('='.repeat(70));

        const page = await browser.newPage();
        const registerPage = new RegisterPage(page);

        // Extract base URL from config
        const baseURL = config.projects[0]?.use?.baseURL
            ? String(config.projects[0].use.baseURL)
            : String(process.env.BASE_URL);

        console.log(`[GLOBAL SETUP] Target Environment: ${baseURL}`);

        // Verify application is accessible
        console.log('[GLOBAL SETUP] Validating application accessibility...');
        await page.goto(baseURL);

        // Verify page loaded successfully
        var pageTitle = await page.title();
        console.log(`[GLOBAL SETUP] ✓ Application is accessible (Title: ${pageTitle})`);

        await page.goto(`${baseURL}${uiPagesURL.register}`);
        pageTitle = await page.title();
        console.log(`[GLOBAL SETUP] ✓ Application is accessible (Title: ${pageTitle})`);
        await registerPage.enterValidRegistrationInfo(
            firstName,
            lastName,
            sharedCredential.credential.email,
            sharedCredential.credential.password
        );
        await registerPage.clickRegistrationButton();

        // Authenticate and save storage state
        console.log('[GLOBAL SETUP] Setting up authentication...');
        const userFile = String(process.env.USERPATH);
        await page.context().storageState({ path: userFile });
        const cookieValue = await page.context().storageState();
        const nopAuthCookie = cookieValue.cookies.find((cookie) => cookie.name === '.Nop.Authentication');
        if (cookieValue) {
            const url = new URL(baseURL);
            await page.context().addCookies([{
                name: '.Nop.Authentication',
                value: String(nopAuthCookie?.value),
                domain: url.hostname,
                path: '/',
                httpOnly: true, // Assuming it's httpOnly
                secure: url.protocol === 'https:'
            }]);
            console.log('[GLOBAL SETUP] ✓ Cookie set');

            // Navigate to ensure cookie is accepted
            await page.goto(baseURL);
            console.log('[GLOBAL SETUP] ✓ Page reloaded with authentication');

            // Save storage state
            await page.context().storageState({ path: String(process.env.USERPATH) });
            console.log(`[GLOBAL SETUP] ✓ Storage state saved to ${authFile}`);
        } else {
            console.warn('[GLOBAL SETUP] ⚠ NOPCOMMERCE_AUTH_COOKIE not found in .env, skipping authentication setup');
        }

        const duration = Date.now() - startTime;
        console.log(`[GLOBAL SETUP] ✓ Initialization completed in ${duration}ms`);
        console.log('='.repeat(70) + '\n');
    }
    catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('\n' + '='.repeat(70));
        console.error('[GLOBAL SETUP] ✗ FAILED - Test suite cannot proceed');
        console.error(`[GLOBAL SETUP] Error: ${errorMessage}`);
        console.error('='.repeat(70) + '\n');
        throw error;
    }
    finally {
        await browser.close();
    }
}

export default globalSetup;