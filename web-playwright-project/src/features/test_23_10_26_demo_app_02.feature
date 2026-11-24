Feature: Demo App Registration, Protected Routes and E2E Flows

  @dryrun @TS-536 @TC-TC1
  Scenario: Verify registration fails with an already registered email
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "John"
    When I fill "Last name" with "Smith"
    When I fill "Email address" with "test@test.com"
    When I fill "Account password" with "password123"
    When I fill "Confirm password" with "password123"
    When I fill "Age (years)" with "30"
    When I select "Male" from "Gender identity"
    When I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then I should see the text "Email already registered"
    And the URL should contain "/register"

  @dryrun @TS-538 @TC-TC1
  Scenario: Verify registration is blocked with an empty First name
    Given I open the "http://localhost:3000/register" page
    When I fill "Last name" with "Doe"
    When I fill "Email address" with "{{random.email}}"
    When I fill "Account password" with "password123"
    When I fill "Confirm password" with "password123"
    When I fill "Age (years)" with "25"
    When I select "Male" from "Gender identity"
    When I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then the "First name" field should be invalid

  @dryrun @TS-538 @TC-TC2
  Scenario: Verify registration is blocked with an empty Last name
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "John"
    When I fill "Email address" with "{{random.email}}"
    When I fill "Account password" with "password123"
    When I fill "Confirm password" with "password123"
    When I fill "Age (years)" with "25"
    When I select "Male" from "Gender identity"
    When I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then the "Last name" field should be invalid

  @dryrun @TS-538 @TC-TC3
  Scenario: Verify registration is blocked with an empty Email address
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "John"
    When I fill "Last name" with "Doe"
    When I fill "Account password" with "password123"
    When I fill "Confirm password" with "password123"
    When I fill "Age (years)" with "25"
    When I select "Male" from "Gender identity"
    When I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then the "Email address" field should be invalid

  @dryrun @TS-538 @TC-TC4
  Scenario: Verify registration is blocked with an empty Account password
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "John"
    When I fill "Last name" with "Doe"
    When I fill "Email address" with "{{random.email}}"
    When I fill "Age (years)" with "25"
    When I select "Male" from "Gender identity"
    When I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then the "Account password" field should be invalid

  @dryrun @TS-538 @TC-TC5
  Scenario: Verify registration is blocked if terms are not accepted
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "John"
    When I fill "Last name" with "Doe"
    When I fill "Email address" with "{{random.email}}"
    When I fill "Account password" with "password123"
    When I fill "Confirm password" with "password123"
    When I fill "Age (years)" with "25"
    When I select "Male" from "Gender identity"
    When I click the "Create account" button
    Then the "I accept the terms and conditions" field should be invalid

  @dryrun @TS-539 @TC-TC1
  Scenario: Register with age below the minimum of 13
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "{{random.firstName}}"
    When I fill "Last name" with "{{random.lastName}}"
    When I fill "Email address" with "{{random.email}}"
    When I fill "Account password" with "ValidP@ssword123"
    When I fill "Confirm password" with "ValidP@ssword123"
    When I fill "Age (years)" with "12"
    When I select "Male" from "Gender identity"
    When I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then the "Age (years)" field should be invalid

  @dryrun @TS-539 @TC-TC2
  Scenario: Register with the minimum allowed age of 13
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "{{random.firstName}}"
    When I fill "Last name" with "{{random.lastName}}"
    When I fill "Email address" with "{{random.email}}"
    When I fill "Account password" with "ValidP@ssword123"
    When I fill "Confirm password" with "ValidP@ssword123"
    When I fill "Age (years)" with "13"
    When I select "Female" from "Gender identity"
    When I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then I should see the text "Registration successful"
    And I should see the "Go to login" link

  @dryrun @TS-539 @TC-TC3
  Scenario: Register with age above the maximum of 120
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "{{random.firstName}}"
    When I fill "Last name" with "{{random.lastName}}"
    When I fill "Email address" with "{{random.email}}"
    When I fill "Account password" with "ValidP@ssword123"
    When I fill "Confirm password" with "ValidP@ssword123"
    When I fill "Age (years)" with "121"
    When I select "Other" from "Gender identity"
    When I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then the "Age (years)" field should be invalid

  @dryrun @TS-539 @TC-TC4
  Scenario: Register with a non-numeric value for age
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "{{random.firstName}}"
    When I fill "Last name" with "{{random.lastName}}"
    When I fill "Email address" with "{{random.email}}"
    When I fill "Account password" with "ValidP@ssword123"
    When I fill "Confirm password" with "ValidP@ssword123"
    When I fill "Age (years)" with "abc"
    When I select "Prefer not to say" from "Gender identity"
    When I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then the "Age (years)" field should be invalid

  @dryrun @TS-539 @TC-TC5
  Scenario: Register with an empty required age field
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "{{random.firstName}}"
    When I fill "Last name" with "{{random.lastName}}"
    When I fill "Email address" with "{{random.email}}"
    When I fill "Account password" with "ValidP@ssword123"
    When I fill "Confirm password" with "ValidP@ssword123"
    When I select "Male" from "Gender identity"
    When I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then the "Age (years)" field should be invalid

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

  @dryrun @TS-535 @TC-TC1
  Scenario: E2E: Successful Registration, Login, Navigation, and Logout
    Given I open the "http://localhost:3000/register" page
    When I register a new user for the E2E flow
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in as the new user with OTP
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"
    And I should see the text "Sign in"

  @dryrun @TS-535 @TC-TC2
  Scenario: E2E: Registration with Optional Mobile Number
    Given I open the "http://localhost:3000/register" page
    When I register a new user with a mobile number
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in as the new user with OTP
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"
    And I should see the text "Sign in"

  @dryrun @TS-535 @TC-TC3
  Scenario: Login: "Remember my email" functionality
    Given I open the "http://localhost:3000/register" page
    When I register a new user for the E2E flow
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in as the new user with "Remember my email" checked
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"
    Then the "Email" field should contain my email

  @dryrun @TS-535 @TC-TC4
  Scenario: Login: Successful login via alternate single-field OTP page
    Given I am logged in as the environment user up to the OTP page
    When I click the "Use single field" link
    Then the URL should contain "/verify"
    When I enter the OTP on the single-field page
    Then the URL should contain "/dashboard"
    And I should see the text "Welcome back"
