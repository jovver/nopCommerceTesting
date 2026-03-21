import { chromium, FullConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { mkdirSync } from 'fs';

/**
 * Global Setup - Runs ONCE before any tests execute
 * 
 * Purpose:
 * - Verify application/API availability
 * - Validate environment configuration
 * - Initialize shared test resources
 * - Seed test data if required
 * - Check external service dependencies
 */
async function globalSetup(config: FullConfig): Promise<void> {
    // Load environment variables
    dotenv.config({ path: path.resolve(process.cwd(), '.env') });

    const authFile = path.join(process.cwd(), '.auth', 'user.json');
    mkdirSync(path.dirname(authFile), { recursive: true });

    const startTime = Date.now();
    const browser = await chromium.launch();
    
    try {
        console.log('\n' + '='.repeat(70));
        console.log('[GLOBAL SETUP] Starting test suite initialization');
        console.log('='.repeat(70));

        const page = await browser.newPage();

        //const storageState = config.projects[0]?.use?.storageState;

        // Extract base URL from config
        const baseURL = config.projects[0]?.use?.baseURL
            ? String(config.projects[0].use.baseURL)
            : 'http://localhost:3000';

        console.log(`[GLOBAL SETUP] Target Environment: ${baseURL}`);

        // Verify application is accessible
        console.log('[GLOBAL SETUP] Validating application accessibility...');
        await page.goto(baseURL);

        // Verify page loaded successfully
        const pageTitle = await page.title();
        console.log(`[GLOBAL SETUP] ✓ Application is accessible (Title: ${pageTitle})`);

        // Authenticate and save storage state
        console.log('[GLOBAL SETUP] Setting up authentication...');
        const cookieValue = process.env.NOPCOMMERCE_AUTH_COOKIE;
        if (cookieValue) {
            const url = new URL(baseURL);
            await page.context().addCookies([{
                name: '.Nop.Authentication',
                value: cookieValue,
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
            await page.context().storageState({ path: authFile });
            console.log(`[GLOBAL SETUP] ✓ Storage state saved to ${authFile}`);
        } else {
            console.warn('[GLOBAL SETUP] ⚠ NOPCOMMERCE_AUTH_COOKIE not found in .env, skipping authentication setup');
        }

        // TODO: Add additional setup tasks:
        // - Authenticate API clients if needed
        // - Create test users/data seeds
        // - Initialize external services (databases, APIs)
        // - Clear previous test artifacts
        // - Warm up application caches
        // - Validate all required endpoints

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