Feature: Demo App User Flows

  @dryrun @TS-532 @TC-TC1
  Scenario: Unauthenticated user is redirected from dashboard to login
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
    Then I should see the text "Sign in"

  @dryrun @TS-532 @TC-TC2
  Scenario: Unauthenticated user is redirected from profile to login
    Given I open the "http://localhost:3000/profile" page
    Then the URL should contain "/login"
    Then I should see the text "Sign in"

  # needs-review: app does not redirect from a non-existent protected sub-route to /login
  @dryrun @needs-review @TS-532 @TC-TC3
  Scenario: Unauthenticated user is redirected from a non-existent protected sub-route
    Given I open the "http://localhost:3000/dashboard/settings" page
    Then the URL should contain "/login"
    Then I should see the text "Sign in"

  @dryrun @TS-533 @TC-TC1
  Scenario: Direct access to OTP page without token redirects to login
    Given I open the "http://localhost:3000/otp" page
    Then the URL should contain "/login"
    Then I should see the text "Sign in"

  @dryrun @TS-531 @TC-TC1
  Scenario: Verify registration fails when using an existing email address
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with the environment user's email
    Then I should see the text "Email already registered"

  @dryrun @TS-530 @TC-TC1
  Scenario: E2E User Journey: Register, Login with OTP, Navigate, and Logout
    Given I open the "http://localhost:3000/register" page
    When I register a new user with a unique email
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in as the newly registered user
    Then the URL should contain "/otp"
    When I enter the OTP code from the environment
    Then the URL should contain "/dashboard"
    Then I should see the text "Welcome back,"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"
    Then I should see the text "Sign in"

  @dryrun @TS-534 @TC-TC1
  Scenario: Verify XSS payload in 'First name' field is sanitized after registration
    Given I open the "http://localhost:3000/register" page
    When I register a new user with an XSS payload in the first name
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in as the newly registered user
    Then the URL should contain "/otp"
    When I enter the OTP code from the environment
    Then the URL should contain "/dashboard"
    Then I should see the text "Welcome back, <script>alert(1)</script>"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    Then I should see the text "<script>alert(1)</script> User"
