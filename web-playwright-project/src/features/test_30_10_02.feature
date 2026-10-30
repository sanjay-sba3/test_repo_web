Feature: User Authentication and Navigation Flow

  @dryrun @TS-387 @TC-TC1
  Scenario: Successful user journey: Login, navigate Dashboard-Profile, and Logout
    When I sign in as the environment user
    Then the URL should contain "/dashboard"
    When I click the "Account menu" button
    And I click the "Profile" menu item
    Then the URL should contain "/profile"
    When I click the "Account menu" button
    And I click the "Dashboard" menu item
    Then the URL should contain "/dashboard"
    When I click the "Account menu" button
    And I click the "Logout" menu item
    Then the URL should not contain "/dashboard"
    And I should see the "Login" link

  @dryrun @TS-388 @TC-TC1
  Scenario: Unauthorized Access to Dashboard Redirects to Login
    Given I open the "https://www.mocktestzone.in/dashboard" page
    Then the URL should contain "/login"
    And I should see the "Sign In with Email" button

  @dryrun @TS-389 @TC-TC1
  Scenario: Unauthenticated access to Profile page redirects to Login
    Given I open the "https://www.mocktestzone.in/profile" page
    Then the URL should contain "/login"
    And I should see the "Sign In with Email" button

  @dryrun @TS-390 @TC-TC1
  Scenario: Verify Account Menu items on Dashboard page
    Given I sign in as the environment user
    Then the URL should contain "/dashboard"
    When I click the "Account menu" button
    Then I should see the "Profile" menu item
    And I should see the "Logout" menu item

  @dryrun @TS-391 @TC-TC1
  Scenario: Verify account menu items on the Profile page
    Given I sign in as the environment user
    And I open the "https://www.mocktestzone.in/profile" page
    When I click the "Account menu" button
    Then I should see the "Dashboard" menu item
    And I should see the "Logout" menu item
