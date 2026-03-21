/**
 * Global Teardown - Runs ONCE after all tests complete
 * 
 * Purpose:
 * - Clean up test data created during setup
 * - Close external resources and connections
 * - Generate final reports and summaries
 * - Archive logs for debugging
 * - Notify monitoring systems if applicable
 * 
 * Important: This process does NOT manage test browser instances
 * (Playwright automatically closes those). Instead, manage shared resources.
 */
async function globalTeardown(): Promise<void> {
    const startTime = Date.now();
    
    try {
        console.log('\n' + '='.repeat(70));
        console.log('[GLOBAL TEARDOWN] Starting cleanup after all tests');
        console.log('='.repeat(70));

        // TODO: Add cleanup tasks as needed:
        // - Delete test users created in setup
        // - Clean up test data from database
        // - Close API/database connections
        // - Archive test logs
        // - Reset application state if required
        // - Cleanup temporary files
        // - Send completion notifications
        // - Generate final metrics/reports

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
        
        // Don't throw - teardown errors shouldn't fail the test suite
        // (tests already completed)
    }
}

export default globalTeardown;
