Feature: Demo App User Authentication and Registration

  Background:
    Given I open the "http://localhost:3000/" page

  @dryrun @TS-512 @TC-TC1
  Scenario: Unauthorized access to dashboard redirects to login
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
    And I should see the "Sign in" button

  @dryrun @TS-512 @TC-TC2
  Scenario: Unauthorized access to profile redirects to login
    Given I open the "http://localhost:3000/profile" page
    Then the URL should contain "/login"
    And I should see the "Sign in" button

  @dryrun @TS-513 @TC-TC1
  Scenario: Verify success message after successful registration
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "Test"
    And I fill "Last name" with "User"
    And I fill "Email address" with "{{random.email}}"
    And I fill "Age (years)" with "30"
    And I select "Prefer not to say" from "Gender identity"
    And I fill "Account password" with "ValidPassword123!"
    And I fill "Confirm password" with "ValidPassword123!"
    And I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then I should see the text "Registration successful"
    And I should see the "Go to login" link
    And I should not see the text "First name"

  @dryrun @TS-511 @TC-TC1
  Scenario: Verify error message when registering with an existing email
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "Test"
    And I fill "Last name" with "User"
    And I fill "Email address" with "test@test.com"
    And I fill "Mobile number" with "+15551234567"
    And I fill "Age (years)" with "25"
    And I select "Prefer not to say" from "Gender identity"
    And I fill "Account password" with "password123"
    And I fill "Confirm password" with "password123"
    And I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then I should see the text "Email already registered"
    And the URL should contain "/register"

  @dryrun @TS-510 @TC-TC1
  Scenario: Successful user registration, login, navigation, and logout
    Given I open the "http://localhost:3000/register" page
    When I register a new user
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I sign in as the new user
    Then the URL should contain "/otp"
    When I enter the OTP
    Then the URL should contain "/dashboard"
    When I navigate to my profile
    Then the URL should contain "/profile"
    When I navigate back to the dashboard
    Then the URL should contain "/dashboard"
    When I log out
    Then I should see the "Login" link
    And the URL should contain "/login"

  @dryrun @TS-514 @TC-TC1
  Scenario: Verify registration is blocked with empty First Name
    Given I open the "http://localhost:3000/register" page
    When I fill "Last name" with "User"
    And I fill "Email address" with "{{random.email}}"
    And I fill "Age (years)" with "25"
    And I select "Male" from "Gender identity"
    And I fill "Account password" with "password1234"
    And I fill "Confirm password" with "password1234"
    And I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then the "First name" field should be invalid

  @dryrun @TS-514 @TC-TC2
  Scenario: Verify registration is blocked with an empty Email Address
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "Test"
    And I fill "Last name" with "User"
    And I fill "Age (years)" with "30"
    And I select "Female" from "Gender identity"
    And I fill "Account password" with "password1234"
    And I fill "Confirm password" with "password1234"
    And I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then the "Email address" field should be invalid

  @dryrun @TS-514 @TC-TC3
  Scenario: Verify registration is blocked with an empty Password
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "Test"
    And I fill "Last name" with "User"
    And I fill "Email address" with "{{random.email}}"
    And I fill "Age (years)" with "30"
    And I select "Male" from "Gender identity"
    And I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then the "Account password" field should be invalid

  @dryrun @TS-514 @TC-TC4
  Scenario: Verify registration is blocked if the 'Accept terms' checkbox is not checked
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "Test"
    And I fill "Last name" with "User"
    And I fill "Email address" with "{{random.email}}"
    And I fill "Age (years)" with "30"
    And I select "Other" from "Gender identity"
    And I fill "Account password" with "password1234"
    And I fill "Confirm password" with "password1234"
    When I click the "Create account" button
    Then the "I accept the terms and conditions" field should be invalid

  @dryrun @TS-514 @TC-TC5
  Scenario: Verify registration is blocked with an empty Age
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "Test"
    And I fill "Last name" with "User"
    And I fill "Email address" with "{{random.email}}"
    And I select "Prefer not to say" from "Gender identity"
    And I fill "Account password" with "password1234"
    And I fill "Confirm password" with "password1234"
    And I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then the "Age (years)" field should be invalid
