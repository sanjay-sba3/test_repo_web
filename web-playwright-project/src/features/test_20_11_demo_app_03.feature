Feature: User Registration and Authentication

  Background:
    Given I open the "http://localhost:3000/" page

  @dryrun @TS-512 @TC-TC1
  Scenario: Unauthorized access to dashboard redirects to login
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
    Then I should see the "Sign in" button

  @dryrun @TS-512 @TC-TC2
  Scenario: Unauthorized access to profile redirects to login
    Given I open the "http://localhost:3000/profile" page
    Then the URL should contain "/login"
    Then I should see the "Sign in" button

  @dryrun @TS-511 @TC-TC1
  Scenario: Verify error message when registering with an existing email
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with an existing email
    Then I should see the text "Email already registered"
    Then the URL should contain "/register"

  @dryrun @TS-510 @TC-TC1
  Scenario: Successful user registration, login, navigation, and logout
    Given I open the "http://localhost:3000/register" page
    When I register a new user
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I sign in as the new user
    Then the URL should contain "/otp"
    When I enter the OTP from the environment
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then I should see the "Login" link

  @dryrun @TS-513 @TC-TC1
  Scenario: Verify success message and button after successful registration
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "Test"
    When I fill "Last name" with "User"
    When I fill "Email address" with "{{random.email}}"
    When I fill "Account password" with "ValidPassword123!"
    When I fill "Confirm password" with "ValidPassword123!"
    When I fill "Age (years)" with "30"
    When I select "Prefer not to say" from "Gender identity"
    When I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then I should see the text "Registration successful"
    Then I should see the "Go to login" link

  @dryrun @TS-514 @TC-TC1
  Scenario: Verify registration is blocked with empty First Name and Last Name
    Given I open the "http://localhost:3000/register" page
    When I fill "Email address" with "{{random.email}}"
    When I fill "Age (years)" with "25"
    When I select "Male" from "Gender identity"
    When I fill "Account password" with "password1234"
    When I fill "Confirm password" with "password1234"
    When I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then the "First name" field should be invalid

  @dryrun @TS-514 @TC-TC2
  Scenario: Verify registration is blocked with an empty Email Address
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "Test"
    When I fill "Last name" with "User"
    When I fill "Age (years)" with "30"
    When I select "Female" from "Gender identity"
    When I fill "Account password" with "password1234"
    When I fill "Confirm password" with "password1234"
    When I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then the "Email address" field should be invalid

  @dryrun @TS-514 @TC-TC3
  Scenario: Verify registration is blocked with an empty Password
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "Test"
    When I fill "Last name" with "User"
    When I fill "Email address" with "{{random.email}}"
    When I fill "Age (years)" with "30"
    When I select "Male" from "Gender identity"
    When I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then the "Account password" field should be invalid

  @dryrun @TS-514 @TC-TC4
  Scenario: Verify registration is blocked if the 'Accept terms' checkbox is not checked
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "Test"
    When I fill "Last name" with "User"
    When I fill "Email address" with "{{random.email}}"
    When I fill "Age (years)" with "30"
    When I select "Other" from "Gender identity"
    When I fill "Account password" with "password1234"
    When I fill "Confirm password" with "password1234"
    When I click the "Create account" button
    Then the "I accept the terms and conditions" field should be invalid

  @dryrun @TS-514 @TC-TC5
  Scenario: Verify registration is blocked with an empty Age
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "Test"
    When I fill "Last name" with "User"
    When I fill "Email address" with "{{random.email}}"
    When I select "Prefer not to say" from "Gender identity"
    When I fill "Account password" with "password1234"
    When I fill "Confirm password" with "password1234"
    When I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then the "Age (years)" field should be invalid
