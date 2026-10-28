Feature: User Authentication and Navigation Flow

  @dryrun @TS-322 @TC-TC1
  Scenario: Full navigation flow: Login, Dashboard-Profile-Dashboard, Logout
    Given I open the "https://www.mocktestzone.in/login" page
    When I sign in as the environment user
    Then the URL should contain "/dashboard"
    When I navigate from dashboard to profile
    Then the URL should contain "/profile"
    When I navigate from profile to dashboard
    Then the URL should contain "/dashboard"
    When I log out from the account menu
    Then the URL should contain "/login"

  @dryrun @TS-325 @TC-TC1
  Scenario: Navigate from Dashboard to Profile via username dropdown
    Given I open the "https://www.mocktestzone.in/login" page
    When I sign in as the environment user
    Then the URL should contain "/dashboard"
    When I navigate from dashboard to profile
    Then the URL should contain "/profile"

  @dryrun @TS-326 @TC-TC1
  Scenario: Navigate from Profile to Dashboard via username dropdown
    Given I open the "https://www.mocktestzone.in/login" page
    When I sign in as the environment user
    Then the URL should contain "/dashboard"
    When I navigate from dashboard to profile
    Then the URL should contain "/profile"
    When I navigate from profile to dashboard
    Then the URL should contain "/dashboard"

  @dryrun @TS-323 @TC-TC1
  Scenario: Unauthorized access to dashboard redirects to login page
    Given I open the "https://www.mocktestzone.in/dashboard" page
    Then the URL should contain "/login"

  @dryrun @TS-324 @TC-TC1
  Scenario: Unauthorized access to Profile page redirects to Login
    Given I open the "https://www.mocktestzone.in/profile" page
    Then the URL should contain "/login"

  @dryrun @TS-324 @TC-TC2
  Scenario: Unauthorized access to Dashboard page redirects to Login
    Given I open the "https://www.mocktestzone.in/dashboard" page
    Then the URL should contain "/login"