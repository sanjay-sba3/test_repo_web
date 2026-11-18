Feature: Swag Labs Login and E2E Flow

  @dryrun @TS-494 @TC-TC1
  Scenario: Verify username field on login page is not vulnerable to XSS
    Given I open the "https://www.saucedemo.com/" page
    When I fill "Username" with "{{security.username}}"
    And I fill "Password" with the value of env "APP_PASSWORD"
    And I click the "Login" button
    Then I should see the text "Epic sadface: Username and password do not match any user in this service"

  @dryrun @TS-490 @TC-TC1
  Scenario: E2E - Login, Add Product to Cart, and Logout
    Given I open the "https://www.saucedemo.com/" page
    When I sign in as the environment user
    Then the URL should contain "/inventory.html"
    When I add the "Sauce Labs Backpack" product to the cart
    Then the shopping cart badge should show "1"
    When I click the "Cart, 1 items" button
    Then the URL should contain "/cart.html"
    And I should see the text "Sauce Labs Backpack"
    When I log out
    Then I should see the "Login" button

  @dryrun @TS-493 @TC-TC1
  Scenario: Login attempt with empty username
    Given I open the "https://www.saucedemo.com/" page
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
    Given I open the "https://www.saucedemo.com/" page
    When I fill "Username" with the value of env "APP_USERNAME"
    And I fill "Password" with "{{random.password}}"
    And I click the "Login" button
    Then I should see the text "Epic sadface: Username and password do not match any user in this service"
    And the URL should not contain "/inventory.html"

  @dryrun @TS-492 @TC-TC2
  Scenario: Login with non-existent username
    Given I open the "https://www.saucedemo.com/" page
    When I fill "Username" with "{{random.username}}"
    And I fill "Password" with the value of env "APP_PASSWORD"
    And I click the "Login" button
    Then I should see the text "Epic sadface: Username and password do not match any user in this service"
    And the URL should not contain "/inventory.html"

  @dryrun @TS-496 @TC-TC1
  Scenario: Unauthenticated access to inventory page redirects to login (2)
    Given I open the "https://www.saucedemo.com/inventory.html" page
    Then the URL should not contain "/inventory.html"
    And I should see the "Login" button

  @dryrun @TS-495 @TC-TC1
  Scenario: Successful Login, Add to Cart, View Cart, and Logout (2)
    Given I open the "https://www.saucedemo.com/" page
    When I sign in as the environment user
    Then the URL should contain "/inventory.html"
    When I add the "Sauce Labs Backpack" product to the cart
    Then the shopping cart badge should show "1"
    When I click the "Cart, 1 items" button
    Then the URL should contain "/cart.html"
    And I should see the text "Sauce Labs Backpack"
    When I log out
    Then I should see the "Login" button

  @dryrun @TS-499 @TC-TC1
  Scenario: Verify script injection in Username field is sanitized
    Given I open the "https://www.saucedemo.com/" page
    When I fill "Username" with "{{security.comment}}"
    And I fill "Password" with the value of env "APP_PASSWORD"
    And I click the "Login" button
    Then I should see the text "Epic sadface: Username and password do not match any user in this service"

  @dryrun @TS-499 @TC-TC2
  Scenario: Verify script injection in Password field is sanitized
    Given I open the "https://www.saucedemo.com/" page
    When I fill "Username" with the value of env "APP_USERNAME"
    And I fill "Password" with "{{security.comment}}"
    And I click the "Login" button
    Then I should see the text "Epic sadface: Username and password do not match any user in this service"

  @dryrun @TS-498 @TC-TC1
  Scenario: Login attempt with empty username (2)
    Given I open the "https://www.saucedemo.com/" page
    When I fill "Password" with the value of env "APP_PASSWORD"
    And I click the "Login" button
    Then I should see the text "Epic sadface: Username is required"

  # needs-review: UI discovery does not show the error message for an empty password. Assuming "Epic sadface: Password is required".
  @dryrun @needs-review @TS-498 @TC-TC2
  Scenario: Login attempt with empty password
    Given I open the "https://www.saucedemo.com/" page
    When I fill "Username" with the value of env "APP_USERNAME"
    And I click the "Login" button
    Then I should see the text "Epic sadface: Password is required"

  @dryrun @TS-498 @TC-TC3
  Scenario: Login attempt with both fields empty
    Given I open the "https://www.saucedemo.com/" page
    When I click the "Login" button
    Then I should see the text "Epic sadface: Username is required"

  @dryrun @TS-497 @TC-TC1
  Scenario: Login with invalid credentials fails
    Given I open the "https://www.saucedemo.com/" page
    When I fill "Username" with "{{random.email}}"
    And I fill "Password" with "{{random.password}}"
    And I click the "Login" button
    Then I should see the text "Epic sadface: Username and password do not match any user in this service"
