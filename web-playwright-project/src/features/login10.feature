@TS-login10
Feature: User Login
  This feature covers the user login flow, including successful login, handling of invalid credentials, field validation, and security checks.

  Background:
    Given I open the "http://localhost:3000/login" page

  @dryrun @TC-TC1
  Scenario: Successful login with valid credentials
    When I fill "Email" with the value of env "APP_USERNAME"
    And I fill "Password" with the value of env "APP_PASSWORD"
    And I click the "Sign in" button
    Then the URL should contain "/dashboard"

  @TC-TC2
  Scenario: Login attempt with incorrect password
    When I fill "Email" with the value of env "APP_USERNAME"
    And I fill "Password" with "wrongpassword123"
    And I click the "Sign in" button
    Then I should see the text "Invalid credentials"
    And the URL should contain "/login"

  @TC-TC3
  Scenario: Login attempt with non-existent user
    When I fill "Email" with "{{random.email}}"
    And I fill "Password" with "any-password-will-do"
    And I click the "Sign in" button
    Then I should see the text "Invalid credentials"

  @TC-TC5
  Scenario: Login attempt with invalid email format
    When I fill "Email" with "{{negative.email}}"
    And I fill "Password" with the value of env "APP_PASSWORD"
    Then the "Email" field should be invalid

  @TC-TC4
  Scenario Outline: Login attempt with empty required fields
    When I fill "Email" with "<Email>"
    And I fill "Password" with "<Password>"
    And I click the "Sign in" button
    Then the <InvalidField> field should be invalid
    And the URL should contain "/login"

    Examples:
      | Email               | Password       | InvalidField |
      | ""                  | "ValidPass123" | "Email"      |
      | "testuser@test.com" | ""             | "Password"   |
      | ""                  | ""             | "Email"      |

  @TC-TC1
  Scenario: Unauthenticated user is redirected from dashboard to login page
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
    And I should see the "Sign in" button

  @TC-TC1
  Scenario: Authenticated user is redirected from login page to dashboard
    When I fill "Email" with the value of env "APP_USERNAME"
    And I fill "Password" with the value of env "APP_PASSWORD"
    And I click the "Sign in" button
    Then the URL should contain "/dashboard"
    When I open the "http://localhost:3000/login" page
    Then the URL should contain "/dashboard"

  @TC-TC1
  Scenario: Password field masks typed characters
    When I fill "Password" with "TestPassword123!"
    Then the "Password" field should be a password input

  @TC-TC1
  Scenario: Verify keyboard navigation and submission
    When I fill "Email" with the value of env "APP_USERNAME"
    And I press the "Tab" key
    Then the "Password" field should be focused
    When I fill "Password" with the value of env "APP_PASSWORD"
    And I press the "Tab" key
    Then the "Sign in" button should be focused
    When I press the "Enter" key
    Then the URL should contain "/dashboard"

  @TC-TC1
  Scenario: Verify XSS payload in email field is sanitized
    When I fill "Email" with "{{security.comment}}"
    And I fill "Password" with "any-invalid-password"
    And I click the "Sign in" button
    Then I should see the text "Invalid credentials"
    And the URL should contain "/login"
