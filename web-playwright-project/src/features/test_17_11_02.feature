Feature: Web User Flow E2E

  @dryrun @TS-464 @TC-TC1
  Scenario: Unauthenticated access to dashboard redirects to login
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
    And I should see the text "Sign in"

  @dryrun @TS-465 @TC-TC1
  Scenario: Unauthenticated access to profile redirects to login
    Given I open the "http://localhost:3000/profile" page
    Then the URL should contain "/login"
    And I should see the text "Sign in"

  @dryrun @TS-466 @TC-TC1
  Scenario: Successful registration shows success message and login link
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "{{random.firstName}}"
    And I fill "Last name" with "{{random.lastName}}"
    And I fill "Email address" with "{{random.email}}"
    And I fill "Age (years)" with "30"
    And I select "Male" from "Gender identity"
    And I fill "Account password" with "ValidPassword123!"
    And I fill "Confirm password" with "ValidPassword123!"
    And I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then I should see the text "Registration successful"
    And I should see the "Go to login" link

  @dryrun @TS-463 @TC-TC1
  Scenario: Registration fails with an already registered email
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "{{random.firstName}}"
    And I fill "Last name" with "{{random.lastName}}"
    And I fill "Email address" with the value of env "APP_USERNAME"
    And I fill "Age (years)" with "30"
    And I select "Male" from "Gender identity"
    And I fill "Account password" with "ValidPassword123!"
    And I fill "Confirm password" with "ValidPassword123!"
    And I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then I should see the text "Email already registered"

  @dryrun @TS-462 @TC-TC1
  Scenario: Successful E2E user flow from registration to logout
    When I register a new user
    Then I should see the text "Registration successful"
    And I should see the "Go to login" link
    When I go to login and sign in as the new user
    Then the URL should contain "/dashboard"
    When I navigate from dashboard to profile and back
    Then the URL should contain "/dashboard"
    When I log out
    Then I should see the "Login" link
