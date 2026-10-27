Feature: User Registration and Authentication

  Background:
    Given I open the "http://localhost:3000/register" page

  @dryrun @TS-302 @TC-TC1
  Scenario: Successful user registration, login, profile navigation, and logout
    When I register a new user with valid details
    Then I should see the text "Registration successful"
    And the URL should not contain "/register"
    When I sign in as the new user
    Then the URL should contain "/dashboard"
    When I navigate from the dashboard to the profile page and back
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"

  @dryrun @TS-304 @TC-TC2
  Scenario: Registration fails with an existing email address
    When I attempt to register with an existing email
    Then I should see the text "email already exists"
    And the URL should contain "/register"

  @dryrun @TS-304 @TC-TC3
  Scenario: Registration fails with empty required fields
    When I attempt to register with an empty first name
    Then the "First name" field should be invalid
    And the URL should contain "/register"

  @dryrun @TS-305 @TC-TC2
  Scenario: Registration fails with mismatched passwords
    When I attempt to register with mismatched passwords
    Then the "Confirm password" field should be invalid
    And the URL should contain "/register"

  @dryrun @TS-304 @TC-TC5
  Scenario: Registration fails with a password shorter than the minimum length
    When I attempt to register with a password shorter than 6 characters
    Then the "Account password" field should be invalid
    And the URL should contain "/register"

  @dryrun @TS-305 @TC-TC4
  Scenario: Registration fails without accepting terms and conditions
    When I attempt to register without accepting terms
    Then the "I accept the terms and conditions" field should be invalid
    And the URL should contain "/register"

  @dryrun @TS-305 @TC-TC5
  Scenario: Registration fails with invalid email format
    When I attempt to register with an invalid email format
    Then the "Email address" field should be invalid
    And the URL should contain "/register"

  @dryrun @TS-306 @TC-TC5
  Scenario: Registration form prevents Cross-Site Scripting (XSS) in text fields
    When I register a new user with an XSS payload in the first name
    Then I should see the text "Registration successful"
    When I sign in as the new user
    Then the URL should contain "/dashboard"
    And I should see the text "<script>alert(1)</script>"
