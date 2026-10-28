Feature: User Authentication and Navigation Flow

  Background:
    Given I open the "https://www.mocktestzone.in/" page

  @dryrun @TS-322 @TC-TC1
  Scenario: Full navigation flow: Login, Dashboard-Profile-Dashboard, Logout
    When I sign in as the environment user
    Then the URL should contain "/dashboard"
    When I navigate to the Profile page via the account menu
    Then the URL should contain "/profile"
    When I navigate to the Dashboard page via the account menu
    Then the URL should contain "/dashboard"
    When I log out via the account menu
    Then the URL should not contain "/dashboard"

  @dryrun @TS-323 @TC-TC1 @TC-TC2
  Scenario: Unauthorized access to Dashboard page redirects to Login
    Given I open the "/dashboard" page
    Then the URL should contain "/login"

  @dryrun @TS-324 @TC-TC1
  Scenario: Unauthorized access to Profile page redirects to Login
    Given I open the "/profile" page
    Then the URL should contain "/login"

  @dryrun @TS-325 @TC-TC1
  Scenario: Navigate from Dashboard to Profile via username dropdown
    When I sign in as the environment user
    Then the URL should contain "/dashboard"
    When I navigate to the Profile page via the account menu
    Then the URL should contain "/profile"

  @dryrun @TS-326 @TC-TC1
  Scenario: Navigate from Profile to Dashboard via username dropdown
    When I sign in as the environment user
    And I open the "https://www.mocktestzone.in/profile" page
    Then the URL should contain "/profile"
    When I navigate to the Dashboard page via the account menu
    Then the URL should contain "/dashboard"