Feature: Web User Flow
  This feature covers the end-to-end user journey from registration to logout, including handling of protected routes and registration validations.

  @dryrun @TS-449 @TC-TC1
  Scenario: Unauthorized access to dashboard page redirects to login
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
    And I should see the "Sign in" button

  @dryrun @TS-450 @TC-TC1
  Scenario: Unauthorized access to profile page redirects to login
    Given I open the "http://localhost:3000/profile" page
    Then the URL should contain "/login"

  @dryrun @TS-451 @TC-TC1
  Scenario: Verify successful registration message and login link
    Given I open the "http://localhost:3000/register" page
    When I register a new user
    Then I should see the text "Registration successful"
    And I should see the "Go to login" link

  @dryrun @TS-448 @TC-TC1
  Scenario: Verify registration fails with a duplicate email address
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with the environment user's email
    Then I should see the text "Email already registered"
    And the URL should contain "/register"

  @dryrun @TS-456 @TC-TC1
  Scenario: Verify navigation from Dashboard to Profile and back
    Given I sign in as the environment user
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"

  @dryrun @TS-447 @TC-TC1
  Scenario: Successful end-to-end user journey: Register, Login, View Profile, Logout
    Given I open the "http://localhost:3000/register" page
    When I register a new user
    Then I should see the text "Registration successful"
    And I click the "Go to login" link
    Then the URL should contain "/login"
    When I sign in as the new user
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    When I log out
    Then I should see the "Login" link
