Feature: SauceDemo Tests

    Scenario: Verify sorting order Z-A on All Items page
        Given I am logged in to SauceDemo
        When I sort items by "Name (Z to A)"
        Then the items should be sorted in descending order

    Scenario: Verify price order high-low on All Items page
        Given I am logged in to SauceDemo
        When I sort items by "Price (high to low)"
        Then the items should be sorted by price in descending order

    Scenario: Add multiple items to cart and validate checkout journey
        Given I am logged in to SauceDemo
        When I add multiple items to the cart
        And I click on minicart and then proceed to checkout
        Then I should see the order confirmation message
