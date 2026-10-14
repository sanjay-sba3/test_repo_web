@TS-159
Feature: Login, Profile Navigation, and Logout Flow
  As a user, I want to be able to log in, navigate my profile, and log out securely.

  @dryrun @TC-TC5
  Scenario: Unauthenticated user is redirected from dashboard
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"

  # needs-review: "View Profile" link and "Logout" button are not in the dashboard snapshot. "Back to Dashboard" link is not in the profile snapshot.
  @needs-review @TC-TC1
  Scenario: Successful login, profile navigation, and logout
    Given I open the "http://localhost:3000/login" page
    When I fill "Email" with the value of env "APP_USERNAME"
    And I fill "Password" with the value of env "APP_PASSWORD"
    And I click the "Sign in" button
    Then the URL should contain "/dashboard"
    When I click the "View Profile" link
    Then the URL should contain "/profile"
    When I click the "Back to Dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"

  @TC-TC2
  Scenario Outline: Login with invalid credentials
    Given I open the "http://localhost:3000/login" page
    When I fill "Email" with "<Email>"
    And I fill "Password" with "<Password>"
    And I click the "Sign in" button
    Then I should see the text "Invalid username or password"
    And the URL should contain "/login"
    Examples:
      | Email                     | Password             | Description              |
      | ${APP_USERNAME}           | invalidPassword123   | Valid user, invalid pass |
      | {{random.email}}          | any-valid-password   | Non-existent user        |

  @TC-TC3
  Scenario: Unauthenticated user is redirected from profile
    Given I open the "http://localhost:3000/profile" page
    Then the URL should contain "/login"

  # needs-review: "Logout" button is not in the dashboard snapshot.
  @needs-review @TC-TC4
  Scenario: Logged-out user cannot access protected pages via browser history
    Given I open the "http://localhost:3000/login" page
    When I fill "Email" with the value of env "APP_USERNAME"
    And I fill "Password" with the value of env "APP_PASSWORD"
    And I click the "Sign in" button
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"
    When I use the browser's 'Back' button
    Then the URL should contain "/login"

  @TC-TC5
  Scenario Outline: Login form validation
    Given I open the "http://localhost:3000/login" page
    When I fill "Email" with "<Email>"
    And I fill "Password" with "<Password>"
    And I click the "Sign in" button
    Then the "<Field>" field should be invalid
    Examples:
      | Email              | Password      | Field    | Description              |
      |                    | some-password | Email    | Empty email              |
      | test@test.com      |               | Password | Empty password           |
      | {{negative.email}} | some-password | Email    | Malformed email          |
