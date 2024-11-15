const { I } = inject();
const loginPage = require('../pages/loginPage.json');
const inventoryPage = require('../pages/inventoryPage.json');
const cartPage = require('../pages/cartPage.json');
const checkoutPage = require('../pages/checkoutPage.json');
const environment = require('../config/environment');
const { expect } = require('chai');

Given('I am logged in to SauceDemo', () => {
    I.amOnPage('/');
    I.fillField(loginPage.fields.username, environment.username);
    I.fillField(loginPage.fields.password, environment.password);
    I.click(loginPage.buttons.login);
});

When('I sort items by {string}', (option) => {
    I.selectOption(inventoryPage.dropdown, option);
});

Then('the items should be sorted in descending order', async () => {
    const itemNames = await I.grabTextFromAll(inventoryPage.itemNames);
    console.log('Item Names:', itemNames); // Log the item names
    const sortedNames = [...itemNames].sort((a, b) => b.localeCompare(a));
    expect(itemNames).to.deep.equal(sortedNames);
});

Then('the items should be sorted by price in descending order', async () => {
    const itemPrices = await I.grabTextFromAll(inventoryPage.itemPrices);
    console.log('Item Prices:', itemPrices); // Log the item prices
    const prices = itemPrices.map(price => parseFloat(price.replace('$', '')));
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).to.deep.equal(sortedPrices);
});

When('I add multiple items to the cart', async () => {
    const itemsToAdd = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];
    for (const item of itemsToAdd) {
        const addToCartButton = `//div[text()='${item}']/ancestor::div[@class='inventory_item']//button[contains(text(), 'Add to cart')]`;
        await I.click(addToCartButton);
    }
});

When('I click on minicart and then proceed to checkout', () => {
    I.click(inventoryPage.minicart);
    I.waitForElement(cartPage.checkoutButton, 5);
    I.click(cartPage.checkoutButton);
    I.waitForElement(checkoutPage.fields.firstName, 5);
    I.fillField(checkoutPage.fields.firstName, 'John');
    I.fillField(checkoutPage.fields.lastName, 'Doe');
    I.fillField(checkoutPage.fields.postalCode, '12345');
    I.click(checkoutPage.buttons.continue);
    I.waitForElement(checkoutPage.buttons.finish, 10); // Wait for the finish button to be visible
    I.click(checkoutPage.buttons.finish);
});

Then('I should see the order confirmation message', async () => {
    const confirmationMessage = await I.grabTextFrom(checkoutPage.confirmationMessage);
    expect(confirmationMessage).to.equal('Thank you for your order!');
});
