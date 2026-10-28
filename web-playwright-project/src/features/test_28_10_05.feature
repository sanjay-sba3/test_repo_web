Feature: User Authentication and Navigation Flow

  Background:
    Given I open the "https://www.mocktestzone.in/login" page

  @dryrun @TS-333 @TC-TC1
  Scenario: Unauthorized access to Dashboard redirects to Login
    Given I open the "https://www.mocktestzone.in/dashboard" page
    Then the URL should contain "/login"
    And I should see the "Sign In with Email" button

  @dryrun @TS-334 @TC-TC1
  Scenario: Unauthorized access to Profile page redirects to Login
    Given I open the "https://www.mocktestzone.in/profile" page
    Then the URL should contain "/login"
    And I should see the "Sign In with Email" button

  @dryrun @TS-332 @TC-TC1
  Scenario: Successful E2E user journey: Login, Navigate, Logout
    When I sign in as the environment user
    Then the URL should contain "/dashboard"
    When I open the account menu
    And I click the "Profile" menu item
    Then the URL should contain "/profile"
    When I open the account menu
    And I click the "Dashboard" menu item
    Then the URL should contain "/dashboard"
    When I open the account menu
    And I click the "Logout" menu item
    Then the URL should contain "/login"

  @dryrun @TS-335 @TC-TC1
  Scenario: Verify username dropdown content on Dashboard page
    Given I sign in as the environment user
    And I open the "https://www.mocktestzone.in/dashboard" page
    When I open the account menu
    Then I should see the "Profile" menu item
    And I should see the "Dashboard" menu item
    And I should see the "Logout" menu item

  @dryrun @TS-335 @TC-TC2
  Scenario: Verify username dropdown content on Profile page
    Given I sign in as the environment user
    And I open the "https://www.mocktestzone.in/profile" page
    When I open the account menu
    Then I should see the "Profile" menu item
    And I should see the "Dashboard" menu item
    And I should see the "Logout" menu item

  @dryrun @TS-336 @TC-TC1
  Scenario: Navigate from Profile to Dashboard via dropdown menu
    Given I sign in as the environment user
    And I open the "https://www.mocktestzone.in/profile" page
    When I open the account menu
    And I click the "Dashboard" menu item
    Then the URL should contain "/dashboard"