import { Page } from '@playwright/test';

/**
 * Handles reCAPTCHA if present on the page.
 * For reCAPTCHA v2, clicks the checkbox.
 * For reCAPTCHA v3, assumes it's handled automatically with test keys.
 * @param page The Playwright page object
 */
export async function handleCaptcha(page: Page): Promise<void> {
    // Check for reCAPTCHA v2 iframe
    const captchaFrame = page.frameLocator('iframe[src*="challenge"]');
    const checkbox = captchaFrame.locator('.recaptcha-checkbox-border');

    if (await checkbox.isVisible({ timeout: 5000 }).catch(() => false)) {
        await checkbox.click();
        // Wait for verification (adjust timeout as needed)
        await page.waitForTimeout(2000);
    }

    // For reCAPTCHA v3, if the site uses test site key (6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI),
    // it should pass automatically. No action needed.

    // If using a real site key, you might need to mock the response or use a service.
    // Example for mocking:
    // await page.route('**/recaptcha/api2/**', route => route.fulfill({
    //     status: 200,
    //     contentType: 'application/json',
    //     body: JSON.stringify({ success: true, challenge_ts: new Date().toISOString(), hostname: 'demo.nopcommerce.com' })
    // }));
}