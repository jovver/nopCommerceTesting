# nopCommerce Testing Suite

## Overview

This project is a comprehensive automated testing suite for the nopCommerce e-commerce platform, built using Playwright and TypeScript. As a software test engineer, this suite provides robust end-to-end (E2E) and API testing capabilities to ensure the quality and reliability of nopCommerce applications.

## Features

- **UI Testing**: Automated browser-based tests for user interfaces using Playwright
- **API Testing**: Backend API validation and integration tests
- **Cross-Browser Support**: Tests run on multiple browsers (Chromium, Firefox, WebKit)
- **Environment Flexibility**: Configurable for local development and CI/CD environments
- **Global Setup/Teardown**: Centralized test environment management
- **Comprehensive Reporting**: HTML reports with detailed test results and traces
- **TypeScript Support**: Strongly typed test scripts for better maintainability

## Prerequisites

Before running the tests, ensure you have the following installed:

- Node.js (version 16 or higher)
- npm or yarn package manager
- Git (for cloning the repository)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd nopCommerceTesting
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
ENV=local  # or 'ci' for CI environments
BASE_URL=https://demo.nopcommerce.com/  # Target nopCommerce instance URL
```

### Playwright Configuration

The `playwright.config.ts` file contains the main configuration:

- **Global Setup/Teardown**: Located in `tests/global.setup.ts` and `tests/global.teardown.ts`
- **Test Directory**: `./tests`
- **Parallel Execution**: Configured for optimal performance
- **Retry Logic**: Automatic retries on CI
- **Tracing**: Enabled on first retry for failed tests

## Running Tests

### All Tests
```bash
npm run test-all
```

### UI Tests (Chromium only)
```bash
npm run test-ui-c
```

### UI Tests (Headed mode)
```bash
npm run test-ui-h
```

### Debug Mode
```bash
npm run test-debug
```

### Generate Test Code
```bash
npm run codegen
```

### View Reports
```bash
npm run report
```

## Project Structure

```
nopCommerceTesting/
├── tests/
│   ├── global.setup.ts          # Global test setup
│   ├── global.teardown.ts       # Global test teardown
│   ├── api/                     # API test files
│   ├── data/                    # Test data files
│   │   └── products.ts
│   ├── prompts/                 # Test prompts/documentation
│   └── ui/                      # UI test files
│       ├── fixtures.ts          # Test fixtures and page objects
│       ├── pages/               # Page object models
│       │   ├── checkoutpage.ts
│       │   ├── customerpage.ts
│       │   ├── homepage.ts
│       │   ├── loginpage.ts
│       │   ├── productpage.ts
│       │   ├── registerpage.ts
│       │   ├── searchresultspage.ts
│       │   └── shoppingcartpage.ts
│       └── specs/               # Test specifications
│           ├── homepage.spec.ts
│           └── registrationpage.spec.ts
├── utils/                       # Utility functions
│   ├── credentialGeneration.ts
│   ├── environmentBaseURL.ts
│   └── uiPagesURL.ts
├── playwright.config.ts         # Playwright configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Project dependencies and scripts
└── README.md                    # This file
```

## Test Organization

- **UI Tests**: Located in `tests/ui/specs/`, covering user interface interactions
- **API Tests**: Located in `tests/api/`, for backend service validation
- **Page Objects**: Reusable page models in `tests/ui/pages/` for maintainable UI tests
- **Fixtures**: Shared test setup in `tests/ui/fixtures.ts`
- **Data**: Test data management in `tests/data/`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-test`)
3. Write tests following the existing patterns
4. Run tests to ensure they pass
5. Commit your changes (`git commit -am 'Add new test'`)
6. Push to the branch (`git push origin feature/new-test`)
7. Create a Pull Request

## Best Practices

- Use descriptive test names and comments
- Follow Page Object Model for UI tests
- Keep tests independent and isolated
- Use appropriate waits and assertions
- Regularly update test data and selectors
- Review test failures and update tests as the application evolves

## Troubleshooting

- **Browser Installation Issues**: Run `npx playwright install` to reinstall browsers
- **Environment Configuration**: Ensure `.env` file is properly configured
- **Test Failures**: Check HTML reports for detailed error information
- **CI/CD Issues**: Verify environment variables are set in your CI pipeline

## License

This project is licensed under the ISC License.