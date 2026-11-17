Feature: Web User Flow

  @dryrun @TS-459 @TC-TC1
  Scenario: Unauthenticated access to dashboard redirects to login
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"

  @dryrun @TS-459 @TC-TC2
  Scenario: Unauthenticated access to profile page redirects to login
    Given I open the "http://localhost:3000/profile" page
    Then the URL should contain "/login"

  @dryrun @TS-460 @TC-TC1
  Scenario: Verify success message after successful registration
    Given I open the "http://localhost:3000/register" page
    When I fill the registration form with valid and unique data
    And I click the "Create account" button
    Then I should see the text "Registration successful"
    And I should see the "Go to login" link

  @dryrun @TS-461 @TC-TC1
  Scenario: Verify navigation from Dashboard to Profile and back
    Given I sign in as the environment user
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"

  @dryrun @TS-458 @TC-TC1 @TC-TC2
  Scenario: Attempt to register with an existing email
    Given I register a new user and land on the success page
    When I open the "http://localhost:3000/register" page
    And I attempt to register again with the same email
    Then I should see the text "Email already registered"
    When I open the "http://localhost:3000/register" page
    And I attempt to register again with the same email in uppercase
    Then I should see the text "Email already registered"

  @dryrun @TS-457 @TC-TC1
  Scenario: End-to-end user registration, login, navigation, and logout
    Given I open the "http://localhost:3000/register" page
    When I register a new user and land on the success page
    And I click the "Go to login" link
    Then the URL should contain "/login"
    When I sign in with the new user credentials
    Then the URL should contain "/dashboard"
    When I navigate from the dashboard to the profile page and back
    And I log out
    Then I should see the "Login" link
    And the URL should contain "/login"
