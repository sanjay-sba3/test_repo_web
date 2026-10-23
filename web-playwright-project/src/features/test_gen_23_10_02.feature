Feature: User Registration, Login, and Profile Management

  @TS-297 @TC-TC1 @dryrun
  Scenario: Verify E2E user journey: registration, login, profile navigation, and logout
    Given I open the "http://localhost:3000/register" page
    When I register a new user with valid details
    Then I should see the text "Registration successful"
    When I proceed to login and sign in as the new user
    Then the URL should contain "/dashboard"
    When I navigate from the dashboard to the profile page
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"

  @TS-299 @TC-TC1
  Scenario: Verify registration fails with a duplicate email address
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with the environment user's email
    Then I should see the text "Email address is already in use"
    Then the URL should contain "/register"

  @TS-300 @TC-TC1
  Scenario: Verify registration fails with an empty Email field
    Given I open the "http://localhost:3000/register" page
    When I fill the registration form with valid data but leave the "Email address" field empty
    When I click the "Create account" button
    Then the "Email address" field should be invalid

  @TS-300 @TC-TC2
  Scenario: Verify registration fails with an empty Password field
    Given I open the "http://localhost:3000/register" page
    When I fill the registration form with valid data but leave the "Account password" field empty
    When I click the "Create account" button
    Then the "Account password" field should be invalid

  @TS-297 @TC-TC3
  Scenario: Verify password mismatch prevents registration
    Given I open the "http://localhost:3000/register" page
    When I fill the registration form with mismatched passwords
    When I click the "Create account" button
    Then the "Confirm password" field should be invalid

  @TS-297 @TC-TC4
  Scenario: Verify login fails with correct email but incorrect password after registration
    Given I open the "http://localhost:3000/register" page
    When I register a new user with valid details
    Then I should see the text "Registration successful"
    When I attempt to log in as the new user with an incorrect password
    Then I should see the text "Invalid email or password"
    Then the URL should contain "/login"

  # needs-review: No "Full Name" field on register.html, using "First name" instead.
  @needs-review @TS-297 @TC-TC5
  Scenario: Verify XSS is prevented on registration fields
    Given I open the "http://localhost:3000/register" page
    When I register a user with a script in the first name field
    Then I should see the text "Registration successful"
    When I proceed to login and sign in as the new user
    Then the URL should contain "/dashboard"
    When I navigate from the dashboard to the profile page
    Then the URL should contain "/profile"
    Then I should see the text "<script>alert(1)</script>"

  @TS-298 @TC-TC1
  Scenario: Unauthorized access to dashboard page redirects to login
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
    Then I should see the "Sign in" button

  @TS-301 @TC-TC1
  Scenario: Verify navigation from Profile to Dashboard page via 'Back to Dashboard' link
    When I sign in as the environment user
    Then the URL should contain "/dashboard"
    Given I open the "http://localhost:3000/profile" page
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    Then I should see the "View profile →" link

  @TS-297 @TC-TC2
  Scenario: Verify registration fails with a non-unique email address
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with the environment user's email
    Then I should see the text "Email address is already in use"
    Then the URL should contain "/register"