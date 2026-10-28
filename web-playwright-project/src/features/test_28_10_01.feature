Feature: User Registration and Authentication Flow

  Background:
    Given I open the "http://localhost:3000/register" page

  @dryrun @TS-312 @TC-TC1
  Scenario: Successful E2E user flow: register, login, navigate, and logout
    When I register a new user
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in as the new user
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"

  @dryrun @TS-312 @TC-TC2
  Scenario: Attempt registration with a duplicate email address
    When I register a new user
    Then I should see the text "Registration successful"
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with the same user details again
    Then I should see the text "Email already registered"
    And the URL should contain "/register"

  @dryrun @TS-312 @TC-TC3
  Scenario: Attempt registration with an invalid email format
    When I fill out the registration form with an invalid email
    And I click the "Create account" button
    Then the "Email address" field should be invalid

  @dryrun @TS-312 @TC-TC4
  Scenario: Attempt to log in with a valid user and an incorrect password
    Given I open the "http://localhost:3000/login" page
    When I attempt to log in with the environment user and a wrong password
    Then I should see the text "Please enter a valid email and password"
    And the URL should contain "/login"

  @dryrun @TS-312 @TC-TC5
  Scenario: Attempt registration with a cross-site scripting (XSS) probe in a name field
    When I register a new user with an XSS probe in the first name
    Then I should see the text "Registration successful"
    When I log in as the new user
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    Then I should not see the text "<script>"

  @dryrun @TS-313 @TC-TC1
  Scenario: Verify successful registration shows success message and login button
    When I register a new user
    Then I should see the text "Registration successful"
    And I should see the "Go to login" link

  @dryrun @TS-314 @TC-TC1
  Scenario: Unauthenticated access to Dashboard redirects to Login page
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
    And the URL should not contain "/dashboard"

  @dryrun @TS-316 @TC-TC1 @TC-TC2
  Scenario Outline: Verify registration is blocked with an empty required field
    When I fill out the registration form but leave the "<field>" empty
    And I click the "Create account" button
    Then the "<field>" field should be invalid

    Examples:
      | field            |
      | Email address    |
      | Account password |