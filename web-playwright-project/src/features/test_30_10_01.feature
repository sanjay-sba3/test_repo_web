Feature: User Authentication and Navigation Flow

  Background:
    Given I open the "https://www.mocktestzone.in/login" page

  @dryrun @TS-375 @TC-TC1
  Scenario: Unauthorized access to profile page redirects to login
    Given I open the "https://www.mocktestzone.in/profile" page
    Then the URL should contain "/login"
    And I should see the "Sign In with Email" button

  @dryrun @TS-374 @TC-TC1
  Scenario: Verify direct access to dashboard by a logged-out user redirects to login
    Given I open the "https://www.mocktestzone.in/dashboard" page
    Then the URL should contain "/login"
    And I should see the "Sign In with Email" button

  # needs-review: no registration page snapshot provided; fields "Full Name", "Email", "Password" and button "Register" are assumed from the test case.
  @dryrun @needs-review @TS-373 @TC-TC1
  Scenario: Register with an already existing email address
    Given I open the "https://www.mocktestzone.in/register" page
    When I fill "Full Name" with "{{random.name}}"
    And I fill "Email" with the value of env "APP_USERNAME"
    And I fill "Password" with "ValidPassword123!"
    And I click the "Register" button
    Then I should see the text "Email is already in use"
    And the URL should contain "/register"

  @dryrun @TS-376 @TC-TC1
  Scenario: Login with correct email and incorrect password
    When I fill "Email Address" with the value of env "APP_USERNAME"
    And I fill "Password" with "ThisIsAnIncorrectPassword123!"
    And I click the "Sign In with Email" button
    Then I should see the text "Invalid credentials"
    And the URL should contain "/login"

  # needs-review: no registration page snapshot provided; fields "Email", "Password", "Confirm Password", button "Register", success message "Registration successful", and link "Go to Login" are assumed.
  @dryrun @needs-review @TS-372 @TC-TC1
  Scenario: Successful end-to-end user journey: register, login, navigate, and logout
    Given I register a new user with a generated email and password from test data
    Then I should see the text "Registration successful"
    When I proceed to the login page from registration success
    And I sign in as the new user
    Then the URL should contain "/dashboard"
    When I click the "Account menu" button
    And I click the "Profile" link
    Then the URL should contain "/profile"
    When I click the "Account menu" button
    And I click the "Dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Account menu" button
    And I click the "Logout" link
    Then I should see the "Login" link

  @dryrun @TS-377 @TC-TC1
  Scenario: Successful login, navigation, and logout
    Given I sign in as the environment user
    Then the URL should contain "/dashboard"
    When I click the "Account menu" button
    And I click the "Profile" link
    Then the URL should contain "/profile"
    When I click the "Account menu" button
    And I click the "Dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Account menu" button
    And I click the "Logout" link
    Then I should see the "Login" link

  @dryrun @TS-379 @TC-TC1
  Scenario: Unauthorized access to Dashboard page redirects to Login
    Given I open the "https://www.mocktestzone.in/dashboard" page
    Then the URL should contain "/login"

  @dryrun @TS-380 @TC-TC1
  Scenario: Unauthenticated access to Profile page redirects to Login
    Given I open the "https://www.mocktestzone.in/profile" page
    Then the URL should contain "/login"
    And I should see the "Sign In with Email" button

  @dryrun @TS-381 @TC-TC1
  Scenario: Verify username dropdown menu contents on Dashboard
    Given I sign in as the environment user
    And I open the "https://www.mocktestzone.in/dashboard" page
    When I click the "Account menu" button
    Then I should see the "Profile" link
    And I should see the "Logout" link

  @dryrun @TS-378 @TC-TC1
  Scenario: Login with valid username and invalid password
    When I fill "Email Address" with the value of env "APP_USERNAME"
    And I fill "Password" with "invalidpassword123"
    And I click the "Sign In with Email" button
    Then I should see the text "Invalid credentials"
    And the URL should contain "/login"

  @dryrun @TS-378 @TC-TC2
  Scenario: Login with invalid username and valid password
    When I fill "Email Address" with "{{random.email}}"
    And I fill "Password" with the value of env "APP_PASSWORD"
    And I click the "Sign In with Email" button
    Then I should see the text "Invalid credentials"
    And the URL should contain "/login"

  @dryrun @TS-378 @TC-TC3
  Scenario: Login with empty password field
    When I fill "Email Address" with the value of env "APP_USERNAME"
    And I click the "Sign In with Email" button
    Then the "Password" field should be invalid
    And the URL should contain "/login"

  @dryrun @TS-378 @TC-TC4
  Scenario: Login with empty username field
    When I fill "Password" with the value of env "APP_PASSWORD"
    And I click the "Sign In with Email" button
    Then the "Email Address" field should be invalid
    And the URL should contain "/login"

  @dryrun @TS-383 @TC-TC1
  Scenario: Verify unauthenticated access to dashboard redirects to login page
    Given I open the "https://www.mocktestzone.in/dashboard" page
    Then the URL should contain "/login"

  @dryrun @TS-386 @TC-TC1
  Scenario: User successfully logs out from the dashboard
    Given I sign in as the environment user
    And I open the "https://www.mocktestzone.in/dashboard" page
    When I click the "Account menu" button
    And I click the "Logout" link
    Then the URL should not contain "/dashboard"
    And I should see the "Login" link

  @dryrun @TS-385 @TC-TC1
  Scenario: Navigate from Profile to Dashboard via Account Menu
    Given I sign in as the environment user
    And I open the "https://www.mocktestzone.in/profile" page
    When I click the "Account menu" button
    And I click the "Dashboard" link
    Then the URL should contain "/dashboard"
    And I should see the "Account menu" button

  @dryrun @TS-384 @TC-TC1
  Scenario: Navigate from Dashboard to Profile via Account Menu
    Given I sign in as the environment user
    And I open the "https://www.mocktestzone.in/dashboard" page
    When I click the "Account menu" button
    And I click the "Profile" link
    Then the URL should contain "/profile"

  @dryrun @TS-382 @TC-TC1
  Scenario: E2E User Flow: Login, Navigate Dashboard-Profile-Dashboard, and Logout
    Given I sign in as the environment user
    Then the URL should contain "/dashboard"
    And I should see the text "Welcome,"
    When I click the "Account menu" button
    And I click the "Profile" link
    Then the URL should contain "/profile"
    When I click the "Account menu" button
    And I click the "Dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Account menu" button
    And I click the "Logout" link
    Then I should see the "Login" link
