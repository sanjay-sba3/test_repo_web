Feature: User Account Navigation and Authentication

  # needs-review: The contents of the "Account menu" (Profile, Dashboard, Logout links) are not in any snapshot.
  @dryrun @needs-review @TS-322 @TC-TC1
  Scenario: Full navigation flow: Login, Dashboard-Profile-Dashboard, Logout
    Given I open the "https://www.mocktestzone.in/login" page
    When I fill "Email Address" with the value of env "APP_USERNAME"
    And I fill "Password" with the value of env "APP_PASSWORD"
    And I click the "Sign In with Email" button
    Then the URL should contain "/dashboard"
    When I navigate to "Profile" using the account menu
    Then the URL should contain "/profile"
    When I navigate to "Dashboard" using the account menu
    Then the URL should contain "/dashboard"
    When I log out using the account menu
    Then the URL should contain "/login"

  @dryrun @TS-323 @TC-TC1
  Scenario: Unauthorized access to dashboard redirects to login page
    Given I open the "https://www.mocktestzone.in/dashboard" page
    Then the URL should contain "/login"
    And the URL should not contain "/dashboard"

  @dryrun @TS-324 @TC-TC1
  Scenario: Unauthorized access to Profile page redirects to Login
    Given I open the "https://www.mocktestzone.in/profile" page
    Then the URL should contain "/login"
    And the URL should not contain "/profile"

  # needs-review: The contents of the "Account menu" (Profile link) are not in any snapshot.
  @dryrun @needs-review @TS-325 @TC-TC1
  Scenario: Navigate from Dashboard to Profile via username dropdown
    When I sign in as the environment user
    Then the URL should contain "/dashboard"
    When I navigate to "Profile" using the account menu
    Then the URL should contain "/profile"

  # needs-review: The contents of the "Account menu" (Dashboard link) are not in any snapshot.
  @dryrun @needs-review @TS-326 @TC-TC1
  Scenario: Navigate from Profile to Dashboard via username dropdown
    When I sign in as the environment user
    And I open the "https://www.mocktestzone.in/profile" page
    Then the URL should contain "/profile"
    When I navigate to "Dashboard" using the account menu
    Then the URL should contain "/dashboard"

  @dryrun @TS-324 @TC-TC2
  Scenario: Unauthorized access to Dashboard page redirects to Login (TC2)
    Given I open the "https://www.mocktestzone.in/dashboard" page
    Then the URL should contain "/login"
    And the URL should not contain "/dashboard"