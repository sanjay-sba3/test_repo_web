Feature: Demo App User Flow

  Background:
    Given I open the "http://localhost:3000/register" page

  @dryrun @TS-515 @TC-TC1
  Scenario: Successful E2E user registration, login, navigation, and logout
    When I register a new user with password "S3cure!P@ssword1"
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I sign in as the new user
    Then the URL should contain "/otp"
    When I enter the OTP from the environment
    Then the URL should contain "/dashboard"
    And I should see the text "Welcome back,"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"
    And I should see the "Login" link

  # needs-review: Requirement says to expect "Email already registered", but UI discovery for duplicate registration is missing.
  @dryrun @TS-516 @TC-TC1
  Scenario: Verify registration fails with an already registered email
    When I fill "First name" with "Test"
    And I fill "Last name" with "User"
    And I fill "Email address" with the value of env "APP_USERNAME"
    And I fill "Account password" with "ValidPass123!"
    And I fill "Confirm password" with "ValidPass123!"
    And I fill "Age (years)" with "30"
    And I select "Prefer not to say" from "Gender identity"
    And I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then I should see the text "Email already registered"
    And the URL should contain "/register"

  @dryrun @TS-518 @TC-TC1
  Scenario: Verify registration is blocked with mismatched passwords
    When I fill "First name" with "TestFirstName"
    And I fill "Last name" with "TestLastName"
    And I fill "Email address" with "{{random.email}}"
    And I fill "Age (years)" with "25"
    And I select "Male" from "Gender identity"
    And I check "I accept the terms and conditions"
    And I fill "Account password" with "ValidPass123!"
    And I fill "Confirm password" with "DifferentPass456?"
    When I click the "Create account" button
    Then the "Confirm password" field should be invalid

  @dryrun @TS-514 @TC-TC1
  Scenario Outline: Verify registration is blocked with empty required fields
    When I fill all registration fields except "<Field>"
    And I click the "Create account" button
    Then the "<Field>" field should be invalid

    Examples:
      | Field                             |
      | First name                        |
      | Last name                         |
      | Email address                     |
      | Age (years)                       |
      | Account password                  |
      | I accept the terms and conditions |

  @dryrun @TS-517 @TC-TC1
  Scenario: Unauthenticated user is redirected from Dashboard to Login page
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
    And I should see the "Sign in" button

  @dryrun @TS-512 @TC-TC2
  Scenario: Unauthenticated user is redirected from Profile to Login page
    Given I open the "http://localhost:3000/profile" page
    Then the URL should contain "/login"
    And I should see the "Sign in" button

  @dryrun @TS-519 @TC-TC1
  Scenario: Unauthenticated user is redirected from OTP to Login page
    Given I open the "http://localhost:3000/otp" page
    Then the URL should contain "/login"
    And I should see the "Sign in" button
