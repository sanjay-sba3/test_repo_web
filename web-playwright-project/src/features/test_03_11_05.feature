Feature: Login and Cart Flow

  @dryrun @TS-428 @TC-TC1
  Scenario: Login attempt with correct username and incorrect password
    Given I open the "https://www.saucedemo.com/" page
    When I fill "Username" with the value of env "APP_USERNAME"
    When I fill "Password" with "invalidPassword123!"
    When I click the "Login" button
    Then I should see the text "Epic sadface: Username and password do not match any user in this service"
    And the URL should not contain "/inventory.html"

  @dryrun @TS-428 @TC-TC2
  Scenario: Login attempt with a non-existent username
    Given I open the "https://www.saucedemo.com/" page
    When I fill "Username" with "{{random.email}}"
    When I fill "Password" with "anyPassword"
    When I click the "Login" button
    Then I should see the text "Epic sadface: Username and password do not match any user in this service"
    And the URL should not contain "/inventory.html"

  @dryrun @TS-431 @TC-TC1
  Scenario: Login attempt with empty Username field
    Given I open the "https://www.saucedemo.com/" page
    When I fill "Password" with the value of env "APP_PASSWORD"
    When I click the "Login" button
    Then I should see the text "Epic sadface: Username is required"

  @dryrun @TS-431 @TC-TC2
  Scenario: Login attempt with empty Password field
    Given I open the "https://www.saucedemo.com/" page
    When I fill "Username" with the value of env "APP_USERNAME"
    When I click the "Login" button
    Then I should see the text "Epic sadface: Password is required"

  @dryrun @TS-429 @TC-TC1
  Scenario: Verify unauthenticated direct access to inventory page redirects to login
    Given I open the "https://www.saucedemo.com/inventory.html" page
    Then the URL should not contain "/inventory.html"
    And I should see the "Login" button

  @dryrun @TS-430 @TC-TC1
  Scenario: Unauthorized access to Cart page redirects to Login
    Given I open the "https://www.saucedemo.com/cart.html" page
    Then the URL should not contain "/cart.html"
    And I should see the "Login" button

  @dryrun @TS-427 @TC-TC1
  Scenario: Verify successful login, add to cart, and logout flow
    Given I am logged in
    Then the URL should contain "/inventory.html"
    When I add the first item to the cart
    When I click the "Cart, 1 items" button
    Then the URL should contain "/cart.html"
    And I should see the text "Sauce Labs Backpack"
    When I click the "Open Menu" button
    When I click the "Logout" button
    Then I should see the "Login" button

  @dryrun @TS-429 @TC-TC2
  Scenario: Verify back button to protected page after logout redirects to login
    Given I am logged in
    Then the URL should contain "/inventory.html"
    When I click the "Open Menu" button
    When I click the "Logout" button
    Then I should see the "Login" button
    When I navigate back in the browser
    Then the URL should not contain "/inventory.html"
    And I should see the "Login" button
