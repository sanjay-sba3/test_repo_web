Feature: Demo App User Flows

  Background:
    Given I open the "http://localhost:3000/login" page

  @dryrun @TS-533 @TC-TC1
  Scenario: Direct access to OTP page without token redirects to login
    Given I open the "http://localhost:3000/otp" page
    Then the URL should contain "/login"
    Then I should see the text "Sign in"

  @dryrun @TS-532 @TC-TC1
  Scenario: Verify unauthenticated user is redirected from /dashboard to /login
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
    Then I should see the text "Sign in"

  @dryrun @TS-532 @TC-TC2
  Scenario: Verify unauthenticated user is redirected from /profile to /login
    Given I open the "http://localhost:3000/profile" page
    Then the URL should contain "/login"
    Then I should see the text "Sign in"

  # needs-review: App does not redirect from non-existent protected sub-routes to /login
  @dryrun @needs-review @TS-532 @TC-TC3
  Scenario: Verify unauthenticated user is redirected from a non-existent protected sub-route
    Given I open the "http://localhost:3000/dashboard/settings" page
    Then the URL should contain "/login"
    Then I should see the text "Sign in"

  @dryrun @TS-531 @TC-TC1
  Scenario: Verify registration fails when using an existing email address
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "{{random.firstName}}"
    When I fill "Last name" with "{{random.lastName}}"
    When I fill "Email address" with the value of env "APP_USERNAME"
    When I fill "Age (years)" with "25"
    When I select "Male" from "Gender identity"
    When I fill "Account password" with "ValidPass123!"
    When I fill "Confirm password" with "ValidPass123!"
    When I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then I should see the text "Email already registered"

  @dryrun @TS-530 @TC-TC1
  Scenario: E2E User Journey: Register, Login with OTP, Navigate, and Logout
    Given I open the "http://localhost:3000/register" page
    When I register a new user
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I sign in as the new user
    Then the URL should contain "/otp"
    When I enter the OTP code
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
    When I sign in as the new user
    Then the URL should contain "/otp"
    When I enter the OTP code
    Then the URL should contain "/dashboard"
    Then I should see the text "<script>alert(1)</script>"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    Then I should see the text "<script>alert(1)</script>"
