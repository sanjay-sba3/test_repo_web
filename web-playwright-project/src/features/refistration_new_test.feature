Feature: New User Registration and Login Flow

  Background:
    Given I open the "http://localhost:3000/register" page

  @dryrun @TS-178 @TC-TC1
  Scenario: Successful end-to-end user registration, login, and navigation
    When I register a new user
    Then I should see the text "Registration successful"
    # The post-registration link name is from the failed dry run log, to fix ambiguity
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

  @TS-178 @TC-TC2
  Scenario: Attempt registration with a duplicate email address
    When I attempt to register with a duplicate email
    Then I should see the "Create account" button
    And the URL should contain "/register"
    And the URL should not contain "/dashboard"

  @TS-178 @TC-TC3
  Scenario: Attempt registration with an invalid email format
    When I attempt to register with an invalid email format
    Then the "Email address" field should be invalid

  @TS-178 @TC-TC4
  Scenario: Attempt registration with an empty password field
    When I attempt to register with an empty password
    Then the "Account password" field should be invalid

  @TS-180 @TC-TC3
  Scenario: Attempt registration with mismatched passwords
    When I attempt to register with mismatched passwords
    Then the "Confirm password" field should be invalid

  @TS-178 @TC-TC5
  Scenario: Verify registration form fields are protected against XSS
    When I register with an XSS payload in the first name field
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    When I log in as the new user
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    Then I should see the text "<script>alert(1)</script> User"

  @TS-177 @TC-TC4
  Scenario: Attempt login with correct email but incorrect password
    Given I open the "http://localhost:3000/login" page
    When I fill "Email" with the value of env "APP_USERNAME"
    When I fill "Password" with "{{negative.password}}"
    When I click the "Sign in" button
    Then I should see the "Sign in" button
    And the URL should contain "/login"

  @TS-177 @TC-TC5
  Scenario: Attempt to access a protected page without being logged in
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
    And I should see the "Sign in" button
