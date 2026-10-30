Feature: User Authentication and Navigation

  # needs-review: Account menu items (Profile, Logout, Dashboard) are not in any snapshot. Assuming role='menuitem'.
  @dryrun @needs-review @TS-387 @TC-TC1
  Scenario: Successful user journey: Login, navigate Dashboard-Profile, and Logout
    Given I sign in as the environment user
    Then the URL should contain "/dashboard"
    When I open the account menu
    And I click the "Profile" menu item
    Then the URL should contain "/profile"
    When I open the account menu
    And I click the "Dashboard" menu item
    Then the URL should contain "/dashboard"
    When I open the account menu
    And I click the "Logout" menu item
    Then I should see the "Login" link

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

  # needs-review: Account menu items (Profile, Logout) are not in any snapshot. Assuming role='menuitem'.
  @dryrun @needs-review @TS-390 @TC-TC1
  Scenario: Verify Account Menu items on Dashboard page
    Given I sign in as the environment user
    Then the URL should contain "/dashboard"
    When I open the account menu
    Then I should see the "Profile" menu item
    And I should see the "Logout" menu item

  # needs-review: Account menu items (Dashboard, Logout) are not in any snapshot. Assuming role='menuitem'.
  @dryrun @needs-review @TS-391 @TC-TC1
  Scenario: Verify account menu items on the Profile page
    Given I sign in as the environment user
    And I open the "https://www.mocktestzone.in/profile" page
    Then the URL should contain "/profile"
    When I open the account menu
    Then I should see the "Dashboard" menu item
    And I should see the "Logout" menu item
