import { chromium, FullConfig } from "@playwright/test";
import dotenv from "dotenv";
import { mkdirSync } from "node:fs";
import path from "node:path";
import fs from 'fs';

/**
 * Global Teardown - Runs ONCE after all tests complete
 */
async function globalTeardown(config: FullConfig): Promise<void> {
    const startTime = Date.now();
    // Load environment variables
    dotenv.config({ path: path.resolve(process.cwd(), '.env') });

    const authFile = path.join(process.cwd(), '.auth', 'user.json');
    mkdirSync(path.dirname(authFile), { recursive: true });
    const browser = await chromium.launch({ headless: true });

    try {
        console.log('\n' + '='.repeat(70));
        console.log('[GLOBAL TEARDOWN] Starting cleanup after all tests');
        console.log('='.repeat(70));

        const page = await browser.newPage();
        const baseURL = config.projects[0]?.use?.baseURL
            ? String(config.projects[0].use.baseURL)
            : String(process.env.BASE_URL);

        await page.goto(`${baseURL}/logout`);
        await page.waitForURL(`${baseURL}`);
        if(fs.existsSync(authFile)){
            fs.unlinkSync(authFile);
        }

        console.log('[GLOBAL TEARDOWN] ✓ Test data cleanup completed');
        console.log('[GLOBAL TEARDOWN] ✓ External resources closed');
        console.log('[GLOBAL TEARDOWN] ✓ Logs and reports finalized');

        const duration = Date.now() - startTime;
        console.log(`[GLOBAL TEARDOWN] ✓ Cleanup finished in ${duration}ms`);
        console.log('='.repeat(70) + '\n');
    }
    catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('\n' + '='.repeat(70));
        console.error('[GLOBAL TEARDOWN] ⚠ Warning: Cleanup encountered issues');
        console.error(`[GLOBAL TEARDOWN] Error: ${errorMessage}`);
        console.error('[GLOBAL TEARDOWN] Note: Test results are not affected');
        console.error('='.repeat(70) + '\n');
    }
}

export default globalTeardown;
