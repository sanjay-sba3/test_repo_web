Feature: User Authentication and Profile Management

  @dryrun @TS-449 @TC-TC1
  Scenario Outline: Unauthenticated access to protected pages redirects to login
    Given I open the "<page>" page
    Then the URL should contain "/login"
    And I should see the "Sign in" button

    Examples:
      | page                            |
      | http://localhost:3000/dashboard |
      | http://localhost:3000/profile   |

  @dryrun @TS-451 @TC-TC1
  Scenario: Successful registration displays a success message
    Given I open the "http://localhost:3000/register" page
    When I register with valid and unique data
    Then I should see the text "Registration successful"
    And I should see the "Go to login" link

  @dryrun @TS-453 @TC-TC1
  Scenario: Registration with a duplicate email is rejected
    Given I have registered a new user
    When I attempt to register again with the same email
    Then I should see the text "Email already registered"
    And the URL should contain "/register"

  @dryrun @TS-456 @TC-TC1
  Scenario: A logged-in user can navigate between dashboard and profile
    Given I sign in as the environment user
    Then the URL should contain "/dashboard"
    When I navigate from the dashboard to the profile page and back
    Then the URL should contain "/dashboard"

  @dryrun @TS-447 @TC-TC1
  Scenario: End-to-end user journey: Register, Login, Navigate, and Logout
    Given I open the "http://localhost:3000/register" page
    When I register with valid and unique data
    And I click the "Go to login" link
    Then the URL should contain "/login"
    When I sign in as the new user
    Then the URL should contain "/dashboard"
    When I navigate from the dashboard to the profile page and back
    And I log out
    Then I should see the "Sign in" button
    And the URL should contain "/login"
