Feature: User Authentication and Navigation

  @dryrun @TS-402 @TC-TC1
  Scenario: Successful user journey: Login, navigate between pages, and Logout
    Given I open the "https://www.mocktestzone.in/login" page
    When I sign in as the environment user
    Then the URL should contain "/dashboard"
    When I navigate to the profile page from the dashboard
    Then the URL should contain "/profile"
    When I navigate to the dashboard from the profile page
    Then the URL should contain "/dashboard"
    When I log out from the dashboard
    Then the URL should not contain "/dashboard"
    Then I should see the "Login" link

  @dryrun @TS-406 @TC-TC1
  Scenario: Navigate from Profile to Dashboard
    Given I am logged in and on the profile page
    When I navigate to the dashboard from the profile page
    Then the URL should contain "/dashboard"

  @dryrun @TS-403 @TC-TC1
  Scenario: Unauthenticated user is redirected from dashboard to login
    Given I open the "https://www.mocktestzone.in/dashboard" page
    Then the URL should contain "/login"
    Then I should see the text "Welcome Back"

  @dryrun @TS-404 @TC-TC1
  Scenario: Unauthenticated user is redirected from profile to login
    Given I open the "https://www.mocktestzone.in/profile" page
    Then the URL should contain "/login"
    Then I should see the text "Welcome Back"

  @dryrun @TS-405 @TC-TC1
  Scenario: Login with valid username and invalid password
    Given I open the "https://www.mocktestzone.in/login" page
    When I fill "Email Address" with the value of env "APP_USERNAME"
    When I fill "Password" with "invalidpassword123"
    When I click the "Sign In with Email" button
    Then I should see the text "Invalid email or password"
    Then the URL should contain "/login"

  @dryrun @TS-405 @TC-TC2
  Scenario: Login with non-existent username
    Given I open the "https://www.mocktestzone.in/login" page
    When I fill "Email Address" with "{{random.email}}"
    When I fill "Password" with the value of env "APP_PASSWORD"
    When I click the "Sign In with Email" button
    Then I should see the text "Invalid email or password"
    Then the URL should contain "/login"

  @dryrun @TS-405 @TC-TC3
  Scenario: Login with empty password field
    Given I open the "https://www.mocktestzone.in/login" page
    When I fill "Email Address" with the value of env "APP_USERNAME"
    When I click the "Sign In with Email" button
    Then the "Password" field should be invalid

  @dryrun @TS-405 @TC-TC4
  Scenario: Login with empty email field
    Given I open the "https://www.mocktestzone.in/login" page
    When I fill "Password" with the value of env "APP_PASSWORD"
    When I click the "Sign In with Email" button
    Then the "Email Address" field should be invalid

  @dryrun @TS-405 @TC-TC5
  Scenario: Login with incorrectly formatted email
    Given I open the "https://www.mocktestzone.in/login" page
    When I fill "Email Address" with "{{negative.email}}"
    When I fill "Password" with the value of env "APP_PASSWORD"
    When I click the "Sign In with Email" button
    Then the "Email Address" field should be invalid
