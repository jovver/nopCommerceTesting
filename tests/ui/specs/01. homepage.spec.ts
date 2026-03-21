import { test } from '../fixtures.js';

test.describe('Homepage tests', () => {

    test('page is opened successfully', async ({ homePage }) => {
        // Arrange

        // Act

        // Assert
        await homePage.assertPageTitle();
    })
});