Feature: User Authentication and Navigation

  @dryrun @TS-399 @TC-TC1
  Scenario: Unauthenticated access to profile page redirects to login
    Given I open the "https://www.mocktestzone.in/profile" page
    Then the URL should contain "/login"
    And I should see the "Sign In with Email" button

  @dryrun @TS-398 @TC-TC1
  Scenario: Unauthenticated access to dashboard redirects to login
    Given I open the "https://www.mocktestzone.in/dashboard" page
    Then the URL should contain "/login"
    And I should see the "Sign In with Email" button

  @dryrun @TS-400 @TC-TC1
  Scenario: Login with valid username and incorrect password
    Given I open the "https://www.mocktestzone.in/login" page
    When I fill "Email Address" with the value of env "APP_USERNAME"
    And I fill "Password" with "ThisIsAnIncorrectPassword123!"
    And I click the "Sign In with Email" button
    Then I should see the text "Invalid email or password"
    And the URL should contain "/login"

  @dryrun @TS-401 @TC-TC1
  Scenario: Verify password field masks input characters
    Given I open the "https://www.mocktestzone.in/login" page
    When I fill "Password" with "TestPassword123!"
    Then the "Password" field should be masked

  @dryrun @TS-397 @TC-TC1
  Scenario: Successful login, navigation to profile and back, and logout
    Given I open the "https://www.mocktestzone.in/login" page
    When I sign in as the environment user
    Then the URL should contain "/dashboard"
    When I navigate to the profile page
    Then the URL should contain "/profile"
    When I navigate back to the dashboard
    Then the URL should contain "/dashboard"
    When I log out from the dashboard
    Then I should see the "Login" link
