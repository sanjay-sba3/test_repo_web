Feature: User Registration and Login Flow

  @dryrun @TS-282 @TC-TC1
  Scenario: Successful end-to-end user registration, login, and navigation
    Given I open the "http://localhost:3000/register" page
    When I register a new user with valid details
    Then I should see the text "Registration successful"
    When I click the "Go to Login" link
    Then the URL should contain "/login"
    When I attempt to log in with the new user's credentials
    Then the URL should contain "/dashboard"
    When I navigate to the profile and back to the dashboard
    Then the URL should contain "/dashboard"
    When I log out
    Then the URL should contain "/login"

  @TS-283 @TC-TC2
  Scenario: Unauthenticated user is redirected to login when accessing dashboard
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"

  # needs-review: still failing after verification -- Then I should see the text "Email is already taken" -- Error: expect(locator).toBeVisible() failed
  @needs-review @TS-284 @TC-TC1
  Scenario: Registration fails when using an existing email address
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with an existing email
    Then I should see the text "Email is already taken"
    And the URL should contain "/register"

  @TS-283 @TC-TC4
  Scenario: Registration fails with an invalid email format
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with an invalid email format
    Then the "Email address" field should be invalid

  @TS-286 @TC-TC1
  Scenario: Registration fails with an empty email field
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with all valid details except an empty email
    Then the "Email address" field should be invalid

  @TS-282 @TC-TC3
  Scenario: Registration fails when password and confirmation do not match
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with mismatching passwords
    Then the "Confirm password" field should be invalid

  @TS-282 @TC-TC4
  Scenario: Login fails with incorrect password for a newly registered user
    Given I open the "http://localhost:3000/register" page
    When I register a new user with valid details
    Then I should see the text "Registration successful"
    When I click the "Go to Login" link
    Then the URL should contain "/login"
    When I attempt to log in with the new user's email and an incorrect password
    Then I should see the text "Invalid email or password"
    And the URL should contain "/login"

  @TS-285 @TC-TC1
  Scenario: Login fails with incorrect password for a known user
    Given I open the "http://localhost:3000/login" page
    When I attempt to log in with a known user and an incorrect password
    Then I should see the text "Invalid email or password"
    And the URL should contain "/login"

  @TS-283 @TC-TC5
  Scenario: Login fails with an empty password
    Given I open the "http://localhost:3000/login" page
    When I attempt to log in with a valid user and an empty password
    Then the "Password" field should be invalid

  # needs-review: No "Full Name" field on registration page; using "First name". Profile page shows a static name ("Test User"), so cannot verify if the XSS payload is displayed as text.
  @needs-review @TS-282 @TC-TC5
  Scenario: Verify XSS protection on registration form fields
    Given I open the "http://localhost:3000/register" page
    When I register a user with an XSS payload in the first name
    Then I should see the text "Registration successful"
    When I click the "Go to Login" link
    Then the URL should contain "/login"
    When I attempt to log in with the new user's credentials
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"