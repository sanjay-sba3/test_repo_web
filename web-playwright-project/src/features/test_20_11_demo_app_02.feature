Feature: User Registration and Authentication Flows

  Background:
    Given I open the "http://localhost:3000/register" page

  @dryrun @TS-508 @TC-TC1
  Scenario: Verify successful registration message and navigation
    When I fill "First name" with "{{random.firstName}}"
    And I fill "Last name" with "{{random.lastName}}"
    And I fill "Email address" with "{{random.email}}"
    And I fill "Age (years)" with "35"
    And I select "Male" from "Gender identity"
    And I fill "Account password" with "password123"
    And I fill "Confirm password" with "password123"
    And I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then I should see the text "Registration successful"
    And I should see the "Go to login" link

  @dryrun @TS-506 @TC-TC1
  Scenario: Verify registration fails with a duplicate email address
    When I fill "First name" with "Test"
    And I fill "Last name" with "User"
    And I fill "Email address" with "test@test.com"
    And I fill "Age (years)" with "30"
    And I select "Male" from "Gender identity"
    And I fill "Account password" with "Password123!"
    And I fill "Confirm password" with "Password123!"
    And I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then I should see the text "Email already registered"

  @dryrun @TS-509 @TC-TC1 @TC-TC2 @TC-TC3 @TC-TC4 @TC-TC5
  Scenario Outline: Verify registration is blocked with an empty required field
    When I complete the registration form leaving "<field>" empty
    And I click the "Create account" button
    Then the "<field>" field should be invalid

    Examples:
      | field                             |
      | First name                        |
      | Last name                         |
      | Email address                     |
      | Account password                  |
      | I accept the terms and conditions |

  @dryrun @TS-505 @TC-TC1
  Scenario: E2E user flow: register, login, navigate, and logout
    When I register a new user with password "password"
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in as the newly registered user with password "password"
    Then the URL should contain "/otp"
    When I enter the OTP from test data
    Then the URL should contain "/dashboard"
    And I should see the text "Hi, Test"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"
    And I should see the "Login" link

  @dryrun @TS-505 @TC-TC2
  Scenario: E2E flow with optional mobile number
    When I register a new user with password "password" and mobile "+1-555-123-4567"
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in as the newly registered user with password "password"
    Then the URL should contain "/otp"
    When I enter the OTP from test data
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    And I should see the text "+1-555-123-4567"
    When I click the "← Back to dashboard" link
    And I click the "Logout" button

  @dryrun @TS-505 @TC-TC3
  Scenario: E2E flow using minimum boundary value for age
    When I register a new user with password "password" and age "13"
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in as the newly registered user with password "password"
    Then the URL should contain "/otp"
    When I enter the OTP from test data
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    And I should see the text "13"
    When I click the "← Back to dashboard" link
    And I click the "Logout" button

  @dryrun @TS-505 @TC-TC4
  Scenario: E2E flow using minimum password length
    When I register a new user with password "minPassword"
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in as the newly registered user with password "minPassword"
    Then the URL should contain "/otp"
    When I enter the OTP from test data
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"

  @dryrun @TS-507 @TC-TC1
  Scenario: Unauthenticated user is redirected from dashboard to login
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
    Then I should see the text "Email"

  @dryrun @TS-507 @TC-TC2
  Scenario: Unauthenticated user is redirected from profile to login
    Given I open the "http://localhost:3000/profile" page
    Then the URL should contain "/login"
    Then I should see the text "Email"
