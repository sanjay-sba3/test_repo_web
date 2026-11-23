Feature: Demo App User Flow

  Background:
    Given I open the "http://localhost:3000/register" page

  @dryrun @TS-536 @TC-TC1
  Scenario: Verify registration fails with an already registered email
    When I fill all registration fields with valid data but with email "test@test.com"
    And I click the "Create account" button
    Then I should see the text "Email already registered"
    And the URL should contain "/register"

  @dryrun @TS-538 @TC-TC1
  Scenario: Verify registration is blocked with an empty First name
    When I fill "Last name" with "Doe"
    And I fill "Email address" with "{{random.email}}"
    And I fill "Account password" with "password123"
    And I fill "Confirm password" with "password123"
    And I fill "Age (years)" with "25"
    And I select "Male" from "Gender identity"
    And I check "I accept the terms and conditions"
    And I click the "Create account" button
    Then the "First name" field should be invalid

  @dryrun @TS-538 @TC-TC2
  Scenario: Verify registration is blocked with an empty Last name
    When I fill "First name" with "John"
    And I fill "Email address" with "{{random.email}}"
    And I fill "Account password" with "password123"
    And I fill "Confirm password" with "password123"
    And I fill "Age (years)" with "25"
    And I select "Male" from "Gender identity"
    And I check "I accept the terms and conditions"
    And I click the "Create account" button
    Then the "Last name" field should be invalid

  @dryrun @TS-538 @TC-TC3
  Scenario: Verify registration is blocked with an empty Email address
    When I fill "First name" with "John"
    And I fill "Last name" with "Doe"
    And I fill "Account password" with "password123"
    And I fill "Confirm password" with "password123"
    And I fill "Age (years)" with "25"
    And I select "Male" from "Gender identity"
    And I check "I accept the terms and conditions"
    And I click the "Create account" button
    Then the "Email address" field should be invalid

  @dryrun @TS-538 @TC-TC4
  Scenario: Verify registration is blocked with an empty Account password
    When I fill "First name" with "John"
    And I fill "Last name" with "Doe"
    And I fill "Email address" with "{{random.email}}"
    And I fill "Age (years)" with "25"
    And I select "Male" from "Gender identity"
    And I check "I accept the terms and conditions"
    And I click the "Create account" button
    Then the "Account password" field should be invalid

  @dryrun @TS-538 @TC-TC5
  Scenario: Verify registration is blocked if terms are not accepted
    When I fill "First name" with "John"
    And I fill "Last name" with "Doe"
    And I fill "Email address" with "{{random.email}}"
    And I fill "Account password" with "password123"
    And I fill "Confirm password" with "password123"
    And I fill "Age (years)" with "25"
    And I select "Male" from "Gender identity"
    And I click the "Create account" button
    Then the "I accept the terms and conditions" field should be invalid

  @dryrun @TS-537 @TC-TC1
  Scenario: Unauthenticated access to /dashboard redirects to /login
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
    And I should see the text "Sign in"

  @dryrun @TS-537 @TC-TC2
  Scenario: Unauthenticated access to /profile redirects to /login
    Given I open the "http://localhost:3000/profile" page
    Then the URL should contain "/login"
    And I should see the text "Sign in"

  @dryrun @TS-537 @TC-TC3
  Scenario: Unauthenticated access to /otp redirects to /login
    Given I open the "http://localhost:3000/otp" page
    Then the URL should contain "/login"
    And I should see the text "Sign in"

  @dryrun @TS-539 @TC-TC1
  Scenario: Register with age below the minimum of 13
    When I fill all registration fields with valid data but with age "12"
    And I click the "Create account" button
    Then the "Age (years)" field should be invalid

  @dryrun @TS-539 @TC-TC2
  Scenario: Register with the minimum allowed age of 13
    When I fill all registration fields with valid data but with age "13"
    And I click the "Create account" button
    Then I should see the text "Registration successful"
    And I should see the "Go to login" link

  @dryrun @TS-539 @TC-TC3
  Scenario: Register with age above the maximum of 120
    When I fill all registration fields with valid data but with age "121"
    And I click the "Create account" button
    Then the "Age (years)" field should be invalid

  @dryrun @TS-539 @TC-TC4
  Scenario: Register with a non-numeric value for age
    When I fill all registration fields with valid data but with age "abc"
    And I click the "Create account" button
    Then the "Age (years)" field should be invalid

  @dryrun @TS-539 @TC-TC5
  Scenario: Register with an empty required age field
    When I fill "First name" with "{{random.firstName}}"
    And I fill "Last name" with "{{random.lastName}}"
    And I fill "Email address" with "{{random.email}}"
    And I fill "Account password" with "ValidP@ssword123"
    And I fill "Confirm password" with "ValidP@ssword123"
    And I select "Male" from "Gender identity"
    And I check "I accept the terms and conditions"
    And I click the "Create account" button
    Then the "Age (years)" field should be invalid

  @dryrun @TS-535 @TC-TC1
  Scenario: E2E - Successful Registration, Login, Navigation, and Logout
    When I register a new user for the E2E test
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in as the new user
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"
    And I should see the text "Sign in"

  @dryrun @TS-535 @TC-TC2
  Scenario: E2E - Registration with Optional Mobile Number
    When I register a new user with a mobile number for the E2E test
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in as the new user
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"
    And I should see the text "Sign in"

  @dryrun @TS-535 @TC-TC3
  Scenario: E2E - Login "Remember my email" functionality
    When I register a new user for the E2E test
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    And I log in as the new user with "Remember my email" checked
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"
    When I open the "http://localhost:3000/login" page
    Then the "Email" field should contain the new user's email

  # needs-review: No snapshot or UI discovery provided for the /verify page.
  @dryrun @needs-review @TS-535 @TC-TC4
  Scenario: E2E - Login via alternate single-field OTP page
    Given I open the "http://localhost:3000/login" page
    When I fill "Email" with the value of env "APP_USERNAME"
    And I fill "Password" with the value of env "APP_PASSWORD"
    And I click the "Sign in" button
    Then the URL should contain "/otp"
    When I click the "Use single field" link
    Then the URL should contain "/verify"
    When I fill "One-time code" with the value of env "APP_OTP"
    And I click the "Verify" button
    Then the URL should contain "/dashboard"
    And I should see the text "Welcome back"
