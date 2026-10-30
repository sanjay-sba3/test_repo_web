Feature: User Authentication and Navigation

  Background:
    Given I open the "https://www.mocktestzone.in/login" page

  @dryrun @TS-379 @TC-TC1
  Scenario: Unauthorized access to Dashboard page redirects to Login
    Given I open the "https://www.mocktestzone.in/dashboard" page
    Then the URL should contain "/login"
    Then I should see the "Sign In with Email" button

  @dryrun @TS-380 @TC-TC1
  Scenario: Unauthorized access to Profile page redirects to Login
    Given I open the "https://www.mocktestzone.in/profile" page
    Then the URL should contain "/login"
    Then I should see the "Sign In with Email" button

  @dryrun @TS-376 @TC-TC1
  Scenario: Login with correct email and incorrect password
    When I fill "Email Address" with the value of env "APP_USERNAME"
    When I fill "Password" with "ThisIsAnIncorrectPassword123!"
    When I click the "Sign In with Email" button
    Then I should see an invalid credentials error message
    And the URL should contain "/login"

  @dryrun @TS-378 @TC-TC2
  Scenario: Login with invalid email and valid password
    When I fill "Email Address" with "{{random.email}}"
    When I fill "Password" with the value of env "APP_PASSWORD"
    When I click the "Sign In with Email" button
    Then I should see an invalid credentials error message
    And the URL should contain "/login"

  @dryrun @TS-378 @TC-TC3
  Scenario: Login with empty password field
    When I fill "Email Address" with the value of env "APP_USERNAME"
    When I click the "Sign In with Email" button
    Then the "Password" field should be invalid
    And the URL should contain "/login"

  @dryrun @TS-378 @TC-TC4
  Scenario: Login with empty email field
    When I fill "Password" with the value of env "APP_PASSWORD"
    When I click the "Sign In with Email" button
    Then the "Email Address" field should be invalid
    And the URL should contain "/login"

  # needs-review: The 'Account menu' dropdown contents ('Profile' link, 'Dashboard' link, 'Logout' link) are not in the page snapshots.
  @dryrun @needs-review @TS-377 @TC-TC1
  Scenario: Successful login, navigation, and logout
    When I sign in as the environment user
    Then the URL should contain "/dashboard"
    When I click the "Account menu" button
    And I should see the "Profile" link
    And I click the "Profile" link
    Then the URL should contain "/profile"
    When I click the "Account menu" button
    And I should see the "Dashboard" link
    And I click the "Dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Account menu" button
    And I should see the "Logout" link
    And I click the "Logout" link
    Then I should see the "Login" link

  # needs-review: The /register page snapshot is missing. Field names 'Full Name', 'Email', 'Password' and button 'Register' are assumed.
  @dryrun @needs-review @TS-373 @TC-TC1
  Scenario: Register with an already existing email address
    Given I open the "https://www.mocktestzone.in/register" page
    When I fill "Full Name" with "{{random.name}}"
    And I fill "Email" with the value of env "APP_USERNAME"
    And I fill "Password" with "ValidPassword123!"
    When I click the "Register" button
    Then I should see the text "Email is already in use"
    And the URL should contain "/register"

  # needs-review: The /register page and its success state are not in the snapshots. Elements 'Go to Login' button, 'View Profile' link, 'Back to Dashboard' link are assumed.
  @dryrun @needs-review @TS-372 @TC-TC1
  Scenario: Successful end-to-end user journey: register, login, navigate, and logout
    Given I open the "https://www.mocktestzone.in/register" page
    When I fill "Email" with "{{random.email}}"
    And I fill "Password" with "aVeryS3cureP@ssword!"
    And I fill "Confirm Password" with "aVeryS3cureP@ssword!"
    When I click the "Register" button
    Then I should see the text "Registration successful"
    When I click the "Go to Login" button
    Then the URL should contain "/login"
    When I fill "Email Address" with the stored "email"
    And I fill "Password" with "aVeryS3cureP@ssword!"
    When I click the "Sign In with Email" button
    Then the URL should contain "/dashboard"
    When I click the "View Profile" link
    Then the URL should contain "/profile"
    When I click the "Back to Dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" link
    Then I should see the "Login" link