Feature: Web User Flows

  Background:
    Given I open the "http://localhost:3000/" page

  @dryrun @TS-449 @TS-450 @TS-454 @TC-TC1
  Scenario Outline: Unauthenticated access to protected pages is redirected to login
    Given I open the "http://localhost:3000<Page>" page
    Then the URL should contain "/login"
    Then I should see the "Sign in" button

    Examples:
      | Page        |
      | /dashboard  |
      | /profile    |

  @dryrun @TS-451 @TS-455 @TC-TC1
  Scenario: Successful registration shows a confirmation message
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "{{random.firstName}}"
    When I fill "Last name" with "{{random.lastName}}"
    When I fill "Email address" with "{{random.email}}"
    When I fill "Age (years)" with "25"
    When I select "Male" from "Gender identity"
    When I fill "Account password" with "S3cureP@ssw0rd!"
    When I fill "Confirm password" with "S3cureP@ssw0rd!"
    When I check "I accept the terms and conditions"
    When I click the "Create account" button
    Then I should see the text "Registration successful"
    Then I should see the "Go to login" link

  @dryrun @TS-448 @TS-453 @TC-TC1
  Scenario: Registration with an already registered email is rejected
    Given I open the "http://localhost:3000/register" page
    When I register a new user
    Given I open the "http://localhost:3000/register" page
    When I attempt to register again with the same email
    Then I should see the text "Email already registered"
    Then the URL should contain "/register"

  @dryrun @TS-456 @TC-TC1
  Scenario: A logged-in user can navigate between dashboard and profile
    When I sign in as the environment user
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"

  @dryrun @TS-447 @TS-452 @TC-TC1
  Scenario: End-to-end user journey from registration to logout
    Given I open the "http://localhost:3000/register" page
    When I register a new user
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I sign in as that new user
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"
    Then I should see the "Login" link
