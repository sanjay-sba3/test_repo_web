Feature: Login and Logout

  @dryrun @TS-416 @TC-TC1
  Scenario: Verify login page UI elements are visible
    Given I open the "https://www.saucedemo.com/" page
    Then the "Username" field should be valid
    Then the "Password" field should be valid
    Then I should see the "Login" button

  @dryrun @TS-413 @TC-TC1
  Scenario: Verify unauthenticated user is redirected to login from a protected page
    Given I open the "https://www.saucedemo.com/inventory.html" page
    Then the URL should contain "https://www.saucedemo.com/"
    Then the URL should not contain "/inventory.html"
    Then I should see the "Login" button

  @dryrun @TS-412 @TC-TC1
  Scenario: Successful login and logout flow
    Given I open the "https://www.saucedemo.com/" page
    When I fill "Username" with the value of env "APP_USERNAME"
    When I fill "Password" with the value of env "APP_PASSWORD"
    When I click the "Login" button
    Then the URL should contain "/inventory.html"
    When I logout
    Then I should see the "Login" button

  @dryrun @TS-415 @TC-TC1
  Scenario: Login attempt with empty username
    Given I open the "https://www.saucedemo.com/" page
    When I fill "Password" with the value of env "APP_PASSWORD"
    When I click the "Login" button
    Then I should see the text "Epic sadface: Username is required"

  @dryrun @TS-415 @TC-TC2
  Scenario: Login attempt with empty password
    Given I open the "https://www.saucedemo.com/" page
    When I fill "Username" with the value of env "APP_USERNAME"
    When I click the "Login" button
    Then I should see the text "Epic sadface: Password is required"

  @dryrun @TS-414 @TC-TC1
  Scenario: Login attempt with valid username and incorrect password
    Given I open the "https://www.saucedemo.com/" page
    When I fill "Username" with the value of env "APP_USERNAME"
    When I fill "Password" with "ThisIsTheWrongPassword"
    When I click the "Login" button
    Then I should see the text "Epic sadface: Username and password do not match any user in this service"
    Then the URL should not contain "/inventory.html"

  @dryrun @TS-414 @TC-TC2
  Scenario: Login attempt with a non-existent username
    Given I open the "https://www.saucedemo.com/" page
    When I fill "Username" with "{{random.email}}"
    When I fill "Password" with "any_password"
    When I click the "Login" button
    Then I should see the text "Epic sadface: Username and password do not match any user in this service"
    Then the URL should not contain "/inventory.html"