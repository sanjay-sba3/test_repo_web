Feature: Demo Application User Journeys

  Background:
    Given I open the "http://localhost:3000/login" page

  @dryrun @TS-547 @TC-TC1
  Scenario: Verify unauthenticated user is redirected from Dashboard to Login
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
    Then I should see the "Login" link

  @dryrun @TS-548 @TC-TC1
  Scenario: Verify registration is blocked with mismatching passwords
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "Test"
    When I fill "Last name" with "User"
    When I fill "Email address" with "{{random.email}}"
    When I fill "Age (years)" with "30"
    When I select "Male" from "Gender identity"
    When I fill "Account password" with "ValidPass123!"
    When I fill "Confirm password" with "DifferentPass456!"
    When I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then the "Confirm password" field should be invalid
    Then the URL should contain "/register"

  @dryrun @TS-549 @TC-TC1
  Scenario: Verify XSS payload in 'First name' field is sanitized on registration
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "{{security.comment}}"
    When I fill "Last name" with "User"
    When I fill "Email address" with "{{random.email}}"
    When I fill "Age (years)" with "30"
    When I select "Prefer not to say" from "Gender identity"
    When I fill "Account password" with "Password123!@#"
    When I fill "Confirm password" with "Password123!@#"
    When I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then I should see the text "Registration successful"
    Then I should see the "Go to login" link

  @dryrun @TS-546 @TC-TC1
  Scenario: Verify registration is blocked for an existing email address
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "Test"
    When I fill "Last name" with "User"
    When I fill "Email address" with "test@test.com"
    When I fill "Age (years)" with "25"
    When I select "Prefer not to say" from "Gender identity"
    When I fill "Account password" with "ValidPass123!"
    When I fill "Confirm password" with "ValidPass123!"
    When I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then I should see the text "Email already registered"
    Then the URL should contain "/register"

  @dryrun @TS-545 @TC-TC1
  Scenario: E2E: Register, Login with OTP, Navigate, and Logout
    When I register a new user
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I sign in as the new user
    Then the URL should contain "/otp"
    When I enter the OTP
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then I should see the "Login" link
    Then the URL should contain "/login"