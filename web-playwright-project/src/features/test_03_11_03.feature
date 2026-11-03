Feature: Login and Logout

  @dryrun @TS-421 @TC-TC1
  Scenario: Verify presence of login form elements
    Given I open the "https://www.saucedemo.com/" page
    Then the "Username" field should be visible
    Then the "Password" field should be visible
    Then I should see the "Login" button

  @dryrun @TS-418 @TC-TC1
  Scenario: Unauthenticated access to protected page redirects to login
    Given I open the "https://www.saucedemo.com/inventory.html" page
    Then the URL should not contain "/inventory.html"
    Then I should see the "Login" button

  @dryrun @TS-417 @TC-TC1
  Scenario: Successful login, navigation to inventory, and logout
    When I sign in as the environment user
    Then the URL should contain "/inventory.html"
    When I log out
    Then I should see the "Login" button

  @dryrun @TS-420 @TC-TC1
  Scenario: Login attempt with empty Username field
    When I attempt to log in with an empty username
    Then I should see the text "Epic sadface: Username is required"
    Then the URL should not contain "/inventory.html"

  @dryrun @TS-420 @TC-TC2
  Scenario: Login attempt with empty Password field
    When I attempt to log in with an empty password
    Then I should see the text "Epic sadface: Password is required"
    Then the URL should not contain "/inventory.html"

  @dryrun @TS-420 @TC-TC3
  Scenario: Login attempt with all required fields empty
    When I attempt to log in with empty credentials
    Then I should see the text "Epic sadface: Username is required"
    Then the URL should not contain "/inventory.html"

  @dryrun @TS-419 @TC-TC1
  Scenario: Login with valid username and incorrect password
    When I attempt to log in with an incorrect password
    Then I should see the text "Epic sadface: Username and password do not match any user in this service"
    Then the URL should not contain "/inventory.html"

  @dryrun @TS-419 @TC-TC2
  Scenario: Login with non-existent username
    When I attempt to log in with a non-existent username
    Then I should see the text "Epic sadface: Username and password do not match any user in this service"
    Then the URL should not contain "/inventory.html"

  @dryrun @TS-419 @TC-TC3
  Scenario: Login with valid username and case-incorrect password
    When I attempt to log in with a case-incorrect password
    Then I should see the text "Epic sadface: Username and password do not match any user in this service"
    Then the URL should not contain "/inventory.html"

  @dryrun @TS-419 @TC-TC4
  Scenario: Login attempt with XSS payload in username field
    When I attempt to log in with an XSS payload in the username
    Then I should see the text "Epic sadface: Username and password do not match any user in this service"
    Then the URL should not contain "/inventory.html"

  @dryrun @TS-419 @TC-TC5
  Scenario: Login attempt with XSS payload in password field
    When I attempt to log in with an XSS payload in the password
    Then I should see the text "Epic sadface: Username and password do not match any user in this service"
    Then the URL should not contain "/inventory.html"