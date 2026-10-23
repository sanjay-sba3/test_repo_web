Feature: User Registration and Authentication Flow

  Background:
    Given I open the "http://localhost:3000/register" page

  # needs-review: still failing after verification -- And I should see the "Go to login" link -- undefined
  @needs-review @TS-278 @TC-TC1
  Scenario: Successful end-to-end user flow from registration to logout
    When I register a new user with valid details
    Then I should see the text "Registration successful"
    And I should see the "Go to login" link
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I sign in as the new user
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"

  @TS-279 @TC-TC1
  Scenario: Unauthorized access to dashboard URL redirects to login page
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"

  # needs-review: still failing after verification -- Then I should see the text "Email is already in use" -- Error: expect(locator).toBeVisible() failed
  @needs-review @TS-280 @TC-TC3
  Scenario: Registration fails with a non-unique email address
    Given I register a new user with valid details
    When I open the "http://localhost:3000/register" page
    And I attempt to register again with the same email
    Then I should see the text "Email is already in use"

  @TS-280 @TC-TC4
  Scenario: Registration fails if passwords do not match
    When I fill the registration form with mismatched passwords
    And I click the "Create account" button
    Then the "Confirm password" field should be invalid

  @TS-278 @TC-TC4
  Scenario: Registration with an invalid email format fails
    When I fill "Email address" with "{{negative.email}}"
    And I click the "Create account" button
    Then the "Email address" field should be invalid

  # needs-review: still failing after verification -- When I click the "← Back to dashboard" link -- ambiguous
  @needs-review @TS-281 @TC-TC1
  Scenario: Verify Back to Dashboard link from Profile page
    Given I sign in as the environment user
    And I open the "http://localhost:3000/profile" page
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    And I should see the "View profile →" link
