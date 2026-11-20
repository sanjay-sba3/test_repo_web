Feature: Demo App User Journeys

  Background:
    Given I open the "http://localhost:3000/register" page

  @dryrun @TS-515 @TC-TC1
  Scenario: Successful E2E user registration, login, navigation, and logout
    When I register a new user with valid details
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in as the new user
    Then the URL should contain "/otp"
    When I enter the OTP from the environment
    Then the URL should contain "/dashboard"
    Then I should see the text "Welcome back,"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"
    Then I should see the "Login" link

  @dryrun @TS-516 @TC-TC1
  Scenario: Verify registration fails with an already registered email
    When I attempt to register with the environment user's email
    Then I should see the text "Email already registered"
    Then the URL should contain "/register"

  @dryrun @TS-518 @TC-TC1
  Scenario: Verify registration is blocked with mismatched passwords
    When I fill "First name" with "TestFirstName"
    When I fill "Last name" with "TestLastName"
    When I fill "Email address" with "{{random.email}}"
    When I fill "Age (years)" with "25"
    When I select "Male" from "Gender identity"
    When I check "I accept the terms and conditions"
    When I fill "Account password" with "ValidPass123!"
    When I fill "Confirm password" with "DifferentPass456?"
    When I click the "Create account" button
    Then the "Confirm password" field should be invalid

  @dryrun @TS-514 @TC-TC1 @TC-TC2 @TC-TC3 @TC-TC4 @TC-TC5
  Scenario Outline: Verify registration is blocked with an empty required field
    When I fill all registration fields except "<field>"
    When I click the "Create account" button
    Then the "<field>" field should be invalid

    Examples:
      | field                               |
      | First name                          |
      | Last name                           |
      | Email address                       |
      | Account password                    |
      | I accept the terms and conditions   |
      | Age (years)                         |

  @dryrun @TS-513 @TC-TC1
  Scenario: Verify success message after successful registration
    When I register a new user with valid details
    Then I should see the text "Registration successful"
    Then I should see the "Go to login" link
    Then I should not see the text "First name"

  @dryrun @TS-512 @TC-TC1 @TC-TC2
  Scenario: Unauthorized access to protected pages redirects to login
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
    Then I should see the "Sign in" button
    Given I open the "http://localhost:3000/profile" page
    Then the URL should contain "/login"
    Then I should see the "Sign in" button

  @dryrun @TS-519 @TC-TC1
  Scenario: Verify direct access to OTP page without login redirects to Login page
    Given I open the "http://localhost:3000/otp" page
    Then the URL should contain "/login"
    Then I should see the "Email" textbox
