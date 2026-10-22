Feature: User Registration and Authentication Flow

  Background:
    Given I open the "http://192.168.0.133:3000/register" page

  @dryrun @TS-241 @TC-TC1
  Scenario: Successful end-to-end user journey: register, login, navigate, logout
    When I register a new user with valid details
    Then I should see the text "Registration successful"
    When I click the "Go to Login" link
    Then the URL should contain "/login"
    When I log in as the newly registered user
    Then the URL should contain "/dashboard"
    When I navigate from dashboard to profile and back
    When I log out
    Then the URL should contain "/login"

  @TS-241 @TC-TC2
  Scenario: Attempt to register with an existing email address
    When I attempt to register with a duplicate email
    # needs-review: The exact error message for a duplicate email is not specified in the snapshots. Assuming "Email already in use".
    Then I should see the text "Email already in use"

  @TS-241 @TC-TC3
  Scenario: Attempt to register with mismatched passwords
    When I attempt to register with mismatched passwords
    Then the "Confirm password" field should be invalid

  @TS-241 @TC-TC4
  Scenario: Attempt to register with an invalid email format
    When I attempt to register with an invalid email format
    Then the "Email address" field should be invalid

  @TS-241 @TC-TC5
  Scenario: Attempt to register with a required field empty
    When I attempt to register with the "First name" field empty
    Then the "First name" field should be invalid

  @TS-239 @TC-TC1
  Scenario: Unauthenticated user is redirected from dashboard to login
    Given I open the "http://192.168.0.133:3000/dashboard" page
    Then the URL should contain "/login"

  @TS-240 @TC-TC1
  Scenario: Unauthenticated user is redirected from profile to login
    Given I open the "http://192.168.0.133:3000/profile" page
    Then the URL should contain "/login"

  @TS-237 @TC-TC4
  Scenario: Login with incorrect password after successful registration
    When I register a new user with valid details
    Then I should see the text "Registration successful"
    When I click the "Go to Login" link
    Then the URL should contain "/login"
    When I attempt to log in with an incorrect password
    # needs-review: The exact error message for invalid credentials is not specified in the snapshots. Assuming "Invalid credentials".
    Then I should see the text "Invalid credentials"
    Then the URL should contain "/login"
