Feature: Demo App User Journeys

  Background:
    Given I open the "http://localhost:3000/" page

  @dryrun @TS-542 @TC-TC1 @TC-TC2 @TS-544
  Scenario Outline: Unauthenticated user is redirected to login page from protected routes
    Given I open the "<page_path>" page
    Then the URL should contain "/login"
    And I should see the text "Sign in"

    Examples:
      | page_path   |
      | /dashboard  |
      | /profile    |
      | /otp        |

  @dryrun @TS-542 @TC-TC3
  Scenario: Unauthenticated user is not redirected from a non-existent protected sub-route
    Given I open the "/dashboard/settings" page
    Then the URL should contain "/dashboard/settings"
    And the URL should not contain "/login"

  @dryrun @TS-543 @TC-TC1
  Scenario: Verify successful registration shows success message and login link
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "Test"
    And I fill "Last name" with "User"
    And I fill "Email address" with "{{random.email}}"
    And I fill "Age (years)" with "25"
    And I select "Male" from "Gender identity"
    And I fill "Account password" with "password123"
    And I fill "Confirm password" with "password123"
    And I check "I accept the terms and conditions"
    And I click the "Create account" button
    Then I should see the text "Registration successful"
    And I should see the "Go to login" link

  @dryrun @TS-541 @TC-TC1
  Scenario: Verify registration fails with an existing email address
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "Test"
    And I fill "Last name" with "User"
    And I fill "Email address" with the value of env "APP_USERNAME"
    And I fill "Age (years)" with "25"
    And I select "Male" from "Gender identity"
    And I fill "Account password" with "validPassword123"
    And I fill "Confirm password" with "validPassword123"
    And I check "I accept the terms and conditions"
    And I click the "Create account" button
    Then I should see the text "Email already registered"

  @dryrun @TS-540 @TC-TC1
  Scenario: E2E - Successful User Registration, Login, Navigation, and Logout
    Given I register a new user with default valid details
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I sign in as the newly registered user
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"
    And I should see the text "Sign in"

  @dryrun @TS-540 @TC-TC2
  Scenario: Register and Verify Profile with Optional Mobile Number
    Given I register a new user with a mobile number
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I sign in as the newly registered user
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    And I should see the text "+1-202-555-0149"

  @dryrun @TS-540 @TC-TC3
  Scenario: Register User at Minimum Age Boundary (13)
    Given I register a new user with age "13"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I sign in as the newly registered user
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    And I should see the text "Age"
    And I should see the text "13"

  @dryrun @TS-540 @TC-TC4
  Scenario: Register User with Minimum Length Password (6 characters)
    Given I register a new user with a 6-character password
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I sign in as the newly registered user
    Then the URL should contain "/dashboard"
