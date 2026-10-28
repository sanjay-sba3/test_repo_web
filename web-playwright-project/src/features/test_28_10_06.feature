Feature: User Authentication and Navigation Flow

  @dryrun @TS-337 @TC-TC1
  Scenario: Successful E2E flow: Login, navigate Dashboard to Profile, return, and Logout
    When I sign in as the environment user
    Then the URL should contain "/dashboard"
    When I navigate to my profile from the dashboard
    Then the URL should contain "/profile"
    When I navigate back to the dashboard from my profile
    Then the URL should contain "/dashboard"
    When I log out from the application
    Then the URL should contain "/login"

  @dryrun @TS-340 @TC-TC1
  Scenario: Navigate from Dashboard to Profile page
    Given I am a logged-in user on the dashboard page
    When I navigate to my profile from the dashboard
    Then the URL should contain "/profile"

  @dryrun @TS-341 @TC-TC1
  Scenario: Navigate from Profile page to Dashboard page
    Given I am a logged-in user on the profile page
    When I navigate back to the dashboard from my profile
    Then the URL should contain "/dashboard"

  @dryrun @TS-339 @TC-TC1
  Scenario: Unauthenticated access to profile page redirects to login
    Given I open the "http://localhost:3000/profile" page
    Then the URL should contain "/login"

  @dryrun @TS-338 @TC-TC1
  Scenario: Unauthenticated access to dashboard redirects to login
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"