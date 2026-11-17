Feature: User Authentication and Flow

  @dryrun @TS-449 @TC-TC1
  Scenario Outline: Unauthenticated access to protected pages is redirected to login
    Given I open the "http://localhost:3000<page>" page
    Then the URL should contain "/login"
    And I should see the "Sign in" button

    Examples:
      | page       |
      | /dashboard |
      | /profile   |

  @dryrun @TS-451 @TC-TC1
  Scenario: Successful registration shows a success message
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "{{random.firstName}}"
    And I fill "Last name" with "{{random.lastName}}"
    And I fill "Email address" with "{{random.email}}"
    And I fill "Age (years)" with "25"
    And I select "Male" from "Gender identity"
    And I fill "Account password" with "S3cureP@ssw0rd!"
    And I fill "Confirm password" with "S3cureP@ssw0rd!"
    And I check "I accept the terms and conditions"
    And I click the "Create account" button
    Then I should see the text "Registration successful"
    And I should see the "Go to login" link

  @dryrun @TS-448 @TC-TC1
  Scenario: Registration fails with an already registered email
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "{{random.firstName}}"
    And I fill "Last name" with "{{random.lastName}}"
    And I fill "Email address" with the value of env "APP_USERNAME"
    And I fill "Age (years)" with "30"
    And I select "Female" from "Gender identity"
    And I fill "Account password" with "ValidPassword123!"
    And I fill "Confirm password" with "ValidPassword123!"
    And I check "I accept the terms and conditions"
    And I click the "Create account" button
    Then I should see the text "Email already registered"
    And the URL should contain "/register"

  @dryrun @TS-456 @TC-TC1
  Scenario: A logged-in user can navigate from Dashboard to Profile and back
    Given I sign in as the environment user
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"

  @dryrun @TS-447 @TC-TC1
  Scenario: End-to-end user journey from registration to logout
    Given I register a new user
    When I click the "Go to login" link
    And I sign in as the new user
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"
    And I should see the "Sign in" button
