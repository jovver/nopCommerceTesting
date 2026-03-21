import { test } from '../fixtures.js';
import CredentialGenerator from '@utils/credentialGeneration.js';
import uiPagesURL from '@tests/ui/utils/uiPagesURL.js';

interface TestCredential {
    credential: {
        username: string;
        password: string;
        email: string;
        gender: string;
    };
}

test.describe('Registration Page tests', () => {

    let sharedCredential: TestCredential = {
        credential: {
            username: '',
            password: '',
            email: '',
            gender: ''
        }
    };

    test.beforeEach(async ({ page }) => {
        // Generate test credentials
        sharedCredential.credential.username = CredentialGenerator.randomUserName();
        sharedCredential.credential.password = CredentialGenerator.randomPassword(CredentialGenerator.randomPWLength(6, 64));
        sharedCredential.credential.email = CredentialGenerator.randomEmail(sharedCredential.credential.username);
        sharedCredential.credential.gender = CredentialGenerator.randomGender();
        console.log(`[Test Setup] Generated test credentials: ${JSON.stringify(sharedCredential)}`);

        page.goto(uiPagesURL.register)

    })
    
    test('user cannot register with no valid information', async ({ registerPage }) => {
        // Arrange

        // Act
        await registerPage.clickRegistrationButton();

        // Assert
        await registerPage.assertFirstNameError();
        await registerPage.assertLastNameError();
        await registerPage.assertBlankEmailError();
        await registerPage.assertBlankPasswordError();
    })

    test('user cannot register with an invalid email', async ({ registerPage }) => {
        // Arrange
        const fullName = sharedCredential.credential.username.split('_');
        const firstName = String(fullName[0]);
        const lastName = String(fullName[1]);
        const invalidEmail = 'invalid-email';

        // Act
        await registerPage.clickGenderRadio(sharedCredential.credential.gender);
        await registerPage.enterFirstname(firstName);
        await registerPage.enterLastName(lastName);
        await registerPage.enterEmail(invalidEmail);
        await registerPage.clickRegistrationButton();

        // Assert
        await registerPage.assertInvalidEmailError();
    })

    test('user cannot register with an invalid email domain', async ({ registerPage }) => {
        // Arrange
        const fullName = sharedCredential.credential.username.split('_');
        const firstName = String(fullName[0]);
        const lastName = String(fullName[1]);
        const invalidEmailDomain = `${sharedCredential.credential.username}@invalid-domain`;

        // Act
        await registerPage.enterFirstname(firstName);
        await registerPage.enterLastName(lastName);
        await registerPage.enterEmail(invalidEmailDomain);
        await registerPage.clickRegistrationButton();

        // Assert
        await registerPage.assertInvalidEmailDomainError();
    })

    test('user cannot register with mismatched passwords', async ({ registerPage }) => {
        // Arrange
        const fullName = sharedCredential.credential.username.split('_');
        const firstName = String(fullName[0]);
        const lastName = String(fullName[1]);
        const invalidPassword = CredentialGenerator.randomPassword(CredentialGenerator.randomPWLength(6, 6));

        // Act
        await registerPage.enterFirstname(firstName);
        await registerPage.enterLastName(lastName);
        await registerPage.enterEmail(sharedCredential.credential.email);
        await registerPage.enterPassword(sharedCredential.credential.password);
        await registerPage.enterConfirmPassword(invalidPassword);
        await registerPage.clickRegistrationButton();

        // Assert
        await registerPage.assertMismatchedPasswordError();
    })

    test('user cannot register with a password less than 6 characters', async ({ registerPage }) => {
        // Arrange
        const fullName = sharedCredential.credential.username.split('_');
        const firstName = String(fullName[0]);
        const lastName = String(fullName[1]);
        const invalidPassword = CredentialGenerator.randomPassword(CredentialGenerator.randomPWLength(1, 5));

        // Act
        await registerPage.enterFirstname(firstName);
        await registerPage.enterLastName(lastName);
        await registerPage.enterEmail(sharedCredential.credential.email);
        await registerPage.enterPassword(invalidPassword);
        await registerPage.enterConfirmPassword(invalidPassword);
        await registerPage.clickRegistrationButton();

        // Assert
        await registerPage.assertInvalidLengthPasswordError();
    })

    test('user cannot register with a password greater than 64 characters', async ({ registerPage }) => {
        // Arrange
        const fullName = sharedCredential.credential.username.split('_');
        const firstName = String(fullName[0]);
        const lastName = String(fullName[1]);
        const invalidPassword = CredentialGenerator.randomPassword(CredentialGenerator.randomPWLength(65, 100));

        // Act
        await registerPage.enterFirstname(firstName);
        await registerPage.enterLastName(lastName);
        await registerPage.enterEmail(sharedCredential.credential.email);
        await registerPage.enterPassword(invalidPassword);
        await registerPage.enterConfirmPassword(invalidPassword);
        await registerPage.clickRegistrationButton();

        // Assert
        await registerPage.assertInvalidLengthPasswordError();
    })

});