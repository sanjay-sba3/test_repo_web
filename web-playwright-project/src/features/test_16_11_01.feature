Feature: Web User Flow

  @dryrun @TS-450 @TC-TC1
  Scenario: Verify unauthenticated access to profile page redirects to login
    Given I open the "http://localhost:3000/profile" page
    Then the URL should contain "/login"
    And I should see the text "Sign in"

  @dryrun @TS-449 @TC-TC1
  Scenario: Unauthorized access to dashboard page redirects to login
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
    And I should see the "Sign in" button

  @dryrun @TS-451 @TC-TC1
  Scenario: Verify successful registration message and login button
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "{{random.firstName}}"
    And I fill "Last name" with "{{random.lastName}}"
    And I fill "Email address" with "{{random.email}}"
    And I fill "Age (years)" with "25"
    And I select "Male" from "Gender identity"
    And I fill "Account password" with "aSecurePassword123!"
    And I fill "Confirm password" with "aSecurePassword123!"
    And I check "I accept the terms and conditions"
    And I click the "Create account" button
    Then I should see the text "Registration successful"
    And I should see the "Go to login" link

  # needs-review: The exact error message for a duplicate email is not available in the provided UI discovery captures.
  @dryrun @needs-review @TS-448 @TC-TC1
  Scenario: Verify registration fails with a duplicate email address
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "{{random.firstName}}"
    And I fill "Last name" with "{{random.lastName}}"
    And I fill "Email address" with the value of env "APP_USERNAME"
    And I fill "Age (years)" with "25"
    And I select "Male" from "Gender identity"
    And I fill "Account password" with "ValidPassword123!"
    And I fill "Confirm password" with "ValidPassword123!"
    And I check "I accept the terms and conditions"
    And I click the "Create account" button
    Then I should see the text "Email is already in use"
    And the URL should contain "/register"

  @dryrun @TS-447 @TC-TC1
  Scenario: Successful end-to-end user journey: Register, Login, View Profile, Logout
    Given I open the "http://localhost:3000/register" page
    When I successfully register a new user
    Then I should see the text "Registration successful"
    And I should see the "Go to login" link
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
    And I should see the "Sign in" button
