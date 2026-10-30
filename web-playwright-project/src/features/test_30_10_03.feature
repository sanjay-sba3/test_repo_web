Feature: User Authentication and Profile Management

  Background:
    Given I open the "https://www.mocktestzone.in/register" page

  @dryrun @TS-393 @TC-TC1
  Scenario: Attempt registration with an already existing email
    When I attempt to register with the environment user's email
    # needs-review: UI discovery does not confirm the error message for duplicate email registration. Assuming a common error message text.
    Then I should see the text "Email is already registered"
    Then the URL should contain "/register"

  @dryrun @TS-392 @TC-TC1
  Scenario: Successful user registration, login, navigation, and logout
    When I register a new user
    Then I should see the text "Registration Successful!"
    # needs-review: UI discovery for successful registration does not show a "Go to Login" button. Navigating to login page directly based on requirement flow.
    Given I open the "https://www.mocktestzone.in/login" page
    When I sign in as the new user
    Then the URL should contain "/dashboard"
    When I navigate to the profile page from the account menu
    Then the URL should contain "/profile"
    When I navigate to the dashboard page from the account menu
    Then the URL should contain "/dashboard"
    When I log out from the account menu
    Then I should see the "Login" link
    Then the URL should contain "/login"

  @dryrun @TS-395 @TC-TC1
  Scenario: Login with valid email and incorrect password fails
    Given I open the "https://www.mocktestzone.in/login" page
    When I fill "Email Address" with the value of env "APP_USERNAME"
    When I fill "Password" with "{{negative.password}}"
    When I click the "Sign In with Email" button
    Then I should see the text "Invalid email or password"
    Then the URL should contain "/login"

  @dryrun @TS-394 @TC-TC1
  Scenario: Unauthenticated user is redirected from dashboard to login page
    Given I open the "https://www.mocktestzone.in/dashboard" page
    Then the URL should contain "/login"

  @dryrun @TS-396 @TC-TC1
  Scenario: Unauthenticated access to profile page redirects to login
    Given I open the "https://www.mocktestzone.in/profile" page
    Then the URL should contain "/login"
    Then I should see the "Login" link
