Feature: Registration of new user

  Background:
    Given I open the "http://localhost:3000/register" page

  @dryrun @TS-172 @TC-TC1
  Scenario: Successful user registration, login, profile navigation, and logout
    When I register a new user with valid details
    Then I should see the text "Registration successful"
    Given I open the "http://localhost:3000/login" page
    When I sign in as the newly registered user
    Then the URL should contain "/dashboard"
    When I navigate from dashboard to profile
    Then the URL should contain "/profile"
    When I navigate from profile to dashboard
    Then the URL should contain "/dashboard"
    When I logout from the application
    Then the URL should contain "/login"

  @TS-173 @TC-TC1
  Scenario: Verify registration fails when using an existing email
    When I attempt to register with an existing email
    Then I should see the text "Email already exists"
    Then the URL should contain "/register"

  @TS-172 @TC-TC3
  Scenario: Attempt registration with mismatched passwords
    When I attempt to register with mismatched passwords
    Then the "Confirm password" field should be invalid

  @TS-172 @TC-TC4
  Scenario Outline: Attempt registration with a blank required field
    When I attempt to register leaving the "<field>" field blank
    Then the "<field>" field should be invalid

    Examples:
      | field            |
      | Email address    |
      | Account password |

  @TS-172 @TC-TC5
  Scenario: Verify XSS protection on a registration text field
    When I register a user with a script in the first name
    Then I should see the text "Registration successful"
    Given I open the "http://localhost:3000/login" page
    When I sign in as the newly registered user
    Then the URL should contain "/dashboard"
    When I navigate from dashboard to profile
    Then the URL should contain "/profile"
    Then I should see the script as plain text in the profile

  @TS-174 @TC-TC2
  Scenario: Unauthorized access to dashboard redirects to login
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"

  @TS-175 @TC-TC3
  Scenario: Verify navigation from Dashboard to Profile page
    When I sign in as the environment user
    Then the URL should contain "/dashboard"
    When I navigate from dashboard to profile
    Then the URL should contain "/profile"

  @TS-175 @TC-TC4
  Scenario: Verify navigation from Profile back to Dashboard page
    When I sign in as the environment user
    Then the URL should contain "/dashboard"
    Given I open the "http://localhost:3000/profile" page
    When I navigate from profile to dashboard
    Then the URL should contain "/dashboard"