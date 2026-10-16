Feature: Login Testing

  @dryrun @TS-184 @TC-TC1
  Scenario: Successful login with valid credentials
    Given I open the "https://www.mocktestzone.in/login" page
    When I sign in as the environment user
    Then the URL should contain "/dashboard"

  @TS-183 @TC-TC1
  Scenario: Login with valid username and invalid password
    Given I open the "https://www.mocktestzone.in/login" page
    When I attempt to sign in with an invalid password
    Then I should see the text "Invalid email or password"
    Then the URL should not contain "/dashboard"

  @TS-182 @TC-TC3
  Scenario: Login with non-existent username
    Given I open the "https://www.mocktestzone.in/login" page
    When I attempt to sign in with a non-existent user
    Then I should see the text "Invalid email or password"

  @TS-182 @TC-TC4
  Scenario: Login with empty username field
    Given I open the "https://www.mocktestzone.in/login" page
    When I fill "Password" with the value of env "APP_PASSWORD"
    And I click the "Sign In with Email" button
    Then the "Email Address" field should be invalid

  @TS-184 @TC-TC3
  Scenario: Login attempt with empty password
    Given I open the "https://www.mocktestzone.in/login" page
    When I fill "Email Address" with the value of env "APP_USERNAME"
    And I click the "Sign In with Email" button
    Then the "Password" field should be invalid

  @TS-182 @TC-TC5
  Scenario: Login with XSS injection attempt in username field
    Given I open the "https://www.mocktestzone.in/login" page
    When I attempt to sign in with an XSS payload
    Then I should see the text "Invalid email or password"
    Then the URL should not contain "/dashboard"

  # needs-review: Logout button not found in any snapshot
  @needs-review @TS-182 @TC-TC1
  Scenario: Successful login and logout
    Given I open the "https://www.mocktestzone.in/login" page
    When I sign in as the environment user
    Then the URL should contain "/dashboard"
    When I log out
    Then the URL should contain "/login"
