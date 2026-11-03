Feature: Login and Logout Flow

  @dryrun @TS-422 @TC-TC1
  Scenario: Successful login and logout flow
    When I sign in as the environment user
    Then the URL should contain "/inventory.html"
    When I log out
    Then the URL should not contain "/inventory.html"
    And I should see the "Login" button

  @dryrun @TS-423 @TC-TC1
  Scenario: Accessing protected page when not logged in redirects to login
    Given I open the "https://www.saucedemo.com/inventory.html" page
    Then the URL should not contain "/inventory.html"
    And I should see the text "Username"

  @dryrun @TS-424 @TC-TC1
  Scenario: Login with valid username and invalid password
    When I attempt to sign in with an invalid password
    Then I should see the text "Epic sadface: Username and password do not match any user in this service"
    And the URL should not contain "/inventory.html"

  @dryrun @TS-426 @TC-TC1
  Scenario: Login with XSS script in Username field
    Given I open the "https://www.saucedemo.com/" page
    When I fill "Username" with "{{security.username}}"
    And I fill "Password" with the value of env "APP_PASSWORD"
    When I click the "Login" button
    Then I should see the text "Epic sadface: Username and password do not match any user in this service"

  @dryrun @TS-425 @TC-TC1
  Scenario: Login attempt with empty username
    Given I open the "https://www.saucedemo.com/" page
    When I fill "Password" with the value of env "APP_PASSWORD"
    When I click the "Login" button
    Then I should see the text "Epic sadface: Username is required"

  @dryrun @TS-425 @TC-TC2
  Scenario: Login attempt with empty password
    Given I open the "https://www.saucedemo.com/" page
    When I fill "Username" with the value of env "APP_USERNAME"
    When I click the "Login" button
    Then I should see the text "Epic sadface: Password is required"
