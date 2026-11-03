Feature: Login and Logout

  @dryrun @TS-411 @TC-TC1
  Scenario: Verify login page UI elements are present
    Given I open the "https://www.saucedemo.com/" page
    Then the "Username" field should be valid
    Then the "Password" field should be valid
    Then I should see the "Login" button

  @dryrun @TS-408 @TC-TC1
  Scenario: Verify direct access to inventory page without login redirects to login page
    Given I open the "https://www.saucedemo.com/inventory.html" page
    Then the URL should not contain "/inventory.html"
    Then I should see the "Login" button

  @dryrun @TS-410 @TC-TC1
  Scenario: Login attempt with blank username
    Given I open the "https://www.saucedemo.com/" page
    When I attempt to log in with username "" and password "secret_sauce"
    Then I should see the text "Epic sadface: Username is required"
    Then the URL should not contain "/inventory.html"

  @dryrun @TS-407 @TC-TC1
  Scenario: Successful Login and Logout Flow
    Given I am logged in as the environment user
    Then the URL should contain "/inventory.html"
    When I log out
    Then I should see the "Login" button

  @dryrun @TS-409 @TC-TC1
  Scenario: Login attempt with valid username and incorrect password
    Given I open the "https://www.saucedemo.com/" page
    When I attempt to log in with the environment username and password "this-is-the-wrong-password"
    Then I should see the text "Epic sadface: Username and password do not match any user in this service"
    Then the URL should not contain "/inventory.html"

  @dryrun @TS-409 @TC-TC2
  Scenario: Login attempt with a non-existent username
    Given I open the "https://www.saucedemo.com/" page
    When I attempt to log in with username "{{random.user}}" and password "{{random.password}}"
    Then I should see the text "Epic sadface: Username and password do not match any user in this service"
    Then the URL should not contain "/inventory.html"