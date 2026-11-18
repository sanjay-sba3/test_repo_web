Feature: Swag Labs User Journeys

  Background:
    Given I open the "https://www.saucedemo.com/" page

  @dryrun @TS-494 @TC-TC1
  Scenario: Verify username field on login page is not vulnerable to XSS
    When I fill "Username" with "{{security.username}}"
    And I fill "Password" with the value of env "APP_PASSWORD"
    And I click the "Login" button
    Then I should see the text "Epic sadface: Username and password do not match any user in this service"

  @dryrun @TS-490 @TC-TC1
  Scenario: E2E: Login, Add Product to Cart, and Logout
    Given I sign in as the environment user
    Then the URL should contain "/inventory.html"
    When I add "Sauce Labs Backpack" to the cart
    Then I should see "1" on the cart badge
    When I click the cart link
    Then the URL should contain "/cart.html"
    And I should see the text "Sauce Labs Backpack"
    When I log out
    Then I should see the "Login" button

  @dryrun @TS-493 @TC-TC1
  Scenario: Login attempt with empty username
    When I fill "Password" with the value of env "APP_PASSWORD"
    And I click the "Login" button
    Then I should see the text "Epic sadface: Username is required"

  @dryrun @TS-491 @TC-TC1
  Scenario: Unauthorized access to inventory page redirects to login
    Given I open the "https://www.saucedemo.com/inventory.html" page
    Then the URL should not contain "/inventory.html"
    And I should see the "Login" button

  @dryrun @TS-491 @TC-TC2
  Scenario: Unauthorized access to cart page redirects to login
    Given I open the "https://www.saucedemo.com/cart.html" page
    Then the URL should not contain "/cart.html"
    And I should see the "Login" button

  @dryrun @TS-492 @TC-TC1
  Scenario: Login with valid username and incorrect password
    When I fill "Username" with the value of env "APP_USERNAME"
    And I fill "Password" with "{{random.password}}"
    And I click the "Login" button
    Then I should see the text "Epic sadface: Username and password do not match any user in this service"
    And the URL should not contain "/inventory.html"

  @dryrun @TS-492 @TC-TC2
  Scenario: Login with non-existent username
    When I fill "Username" with "{{random.username}}"
    And I fill "Password" with the value of env "APP_PASSWORD"
    And I click the "Login" button
    Then I should see the text "Epic sadface: Username and password do not match any user in this service"
    And the URL should not contain "/inventory.html"

  @dryrun @TS-496 @TC-TC1
  Scenario: Unauthenticated access to inventory page shows error
    Given I open the "https://www.saucedemo.com/inventory.html" page
    Then I should see the text "Epic sadface: You can only access '/inventory.html' when you are logged in."

  @dryrun @TS-495 @TC-TC1
  Scenario: Successful Login, Add to Cart, View Cart, and Logout
    Given I sign in as the environment user
    Then the URL should contain "/inventory.html"
    When I add "Sauce Labs Backpack" to the cart
    And I click the cart link
    Then the URL should contain "/cart.html"
    And I should see the text "Sauce Labs Backpack"
    When I log out
    Then I should see the "Login" button

  @dryrun @TS-499 @TC-TC1
  Scenario: Verify script injection in Username field is sanitized
    When I fill "Username" with "{{security.comment}}"
    And I fill "Password" with the value of env "APP_PASSWORD"
    And I click the "Login" button
    Then I should see the text "Epic sadface: Username and password do not match any user in this service"

  @dryrun @TS-499 @TC-TC2
  Scenario: Verify script injection in Password field is sanitized
    When I fill "Username" with the value of env "APP_USERNAME"
    And I fill "Password" with "{{security.comment}}"
    And I click the "Login" button
    Then I should see the text "Epic sadface: Username and password do not match any user in this service"

  @dryrun @TS-498 @TC-TC1
  Scenario: Login attempt with empty username is rejected
    When I fill "Password" with the value of env "APP_PASSWORD"
    And I click the "Login" button
    Then I should see the text "Epic sadface: Username is required"

  @dryrun @TS-498 @TC-TC2
  Scenario: Login attempt with empty password
    When I fill "Username" with the value of env "APP_USERNAME"
    And I click the "Login" button
    Then I should see the text "Epic sadface: Password is required"

  @dryrun @TS-498 @TC-TC3
  Scenario: Login attempt with both fields empty
    When I click the "Login" button
    Then I should see the text "Epic sadface: Username is required"

  @dryrun @TS-497 @TC-TC1
  Scenario: Login with invalid credentials fails
    When I fill "Username" with "{{random.email}}"
    And I fill "Password" with "{{random.password}}"
    And I click the "Login" button
    Then I should see the text "Epic sadface: Username and password do not match any user in this service"
