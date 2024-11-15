const { setHeadlessWhen } = require('@codeceptjs/configure');
const playwrightConfig = require('./config/playwright.conf');
const environment = require('./config/environment');

setHeadlessWhen(process.env.HEADLESS);

exports.config = {
    tests: './steps/*_test.js',
    output: './output',
    helpers: {
        Playwright: {
            url: playwrightConfig.url,
            show: playwrightConfig.show,
            browser: playwrightConfig.browser
        }
    },
    include: {
        I: './steps/steps_file.js',
        loginPage: './pages/loginPage.json',
        inventoryPage: './pages/inventoryPage.json',
        cartPage: './pages/cartPage.json',
        checkoutPage: './pages/checkoutPage.json'
    },
    gherkin: {
        features: './features/*.feature',
        steps: ['./steps/saucedemoSteps.js']
    },
    plugins: {
        screenshotOnFail: {
            enabled: true
        }
    },
    name: 'saucedemo-tests'
};

