Feature: User Registration and Login Flow

  @dryrun @TS-302 @TC-TC1
  Scenario: Successful user registration, login, navigation, and logout
    Given I open the "http://localhost:3000/register" page
    When I register a new user with valid details
    Then I should see the text "Registration successful"
    # After registration, the page content changes. Navigate directly to the login page for stability.
    Given I open the "http://localhost:3000/login" page
    When I log in as the new user
    Then the URL should contain "/dashboard"
    When I navigate from the dashboard to my profile and back
    Then the URL should contain "/dashboard"
    When I log out
    Then the URL should contain "/login"

  @TS-306 @TC-TC2
  Scenario: Registration fails with an existing email address
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with the environment user's email
    # The expected message is from the test case; not present in initial snapshots.
    Then I should see the text "An account with this email already exists"
    And the URL should not contain "/dashboard"

  @TS-306 @TC-TC3
  Scenario: Registration fails when a required field is empty
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with an empty "First name"
    Then the "First name" field should be invalid

  @TS-306 @TC-TC4
  Scenario: Registration fails with mismatched passwords
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with mismatched passwords
    Then the "Confirm password" field should be invalid

  @TS-304 @TC-TC5
  Scenario: Registration fails with a password shorter than the minimum length
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with a password shorter than 6 characters
    Then the "Account password" field should be invalid

  @TS-303 @TC-TC4
  Scenario: Registration fails without accepting terms and conditions
    Given I open the "http://localhost:3000/register" page
    When I attempt to register without accepting the terms
    Then the "I accept the terms and conditions" field should be invalid

  @TS-303 @TC-TC5
  Scenario: Registration fails with an invalid email format
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with an invalid email format
    Then the "Email address" field should be invalid
