Feature: Login and Navigation

  @dryrun @TS-167 @TC-TC1
  Scenario: Successful Login, Navigation, and Logout Flow
    Given I open the "http://localhost:3000/login" page
    When I fill "Email" with the value of env "APP_USERNAME"
    When I fill "Password" with the value of env "APP_PASSWORD"
    When I click the "Sign in" button
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"

  @TS-171 @TC-TC1
  Scenario: Navigate from Profile to Dashboard via 'Back to Dashboard' link
    Given I open the "http://localhost:3000/login" page
    When I fill "Email" with the value of env "APP_USERNAME"
    When I fill "Password" with the value of env "APP_PASSWORD"
    When I click the "Sign in" button
    Then the URL should contain "/dashboard"
    Given I open the "http://localhost:3000/profile" page
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"

  @TS-170 @TC-TC1
  Scenario: Unauthorized access to protected Profile page redirects to Login
    Given I open the "http://localhost:3000/profile" page
    Then the URL should contain "/login"

  @TS-169 @TC-TC1
  Scenario: Unauthorized Dashboard access redirects to Login page
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"

  @TS-168 @TC-TC2
  Scenario: Login with Invalid Password
    Given I open the "http://localhost:3000/login" page
    When I fill "Email" with the value of env "APP_USERNAME"
    When I fill "Password" with "invalid-password-123"
    When I click the "Sign in" button
    Then I should see the text "Invalid email or password"
    Then the URL should contain "/login"

  @TS-168 @TC-TC3
  Scenario: Login with Non-Existent Username
    Given I open the "http://localhost:3000/login" page
    When I fill "Email" with "{{random.email}}"
    When I fill "Password" with "any-valid-password"
    When I click the "Sign in" button
    Then I should see the text "Invalid email or password"
    Then the URL should contain "/login"

  @TS-168 @TC-TC4
  Scenario: Login Attempt with Empty Username
    Given I open the "http://localhost:3000/login" page
    When I fill "Password" with the value of env "APP_PASSWORD"
    When I click the "Sign in" button
    Then the "Email" field should be invalid
    Then the URL should contain "/login"

  @TS-168 @TC-TC5
  Scenario: Login Attempt with Empty Password
    Given I open the "http://localhost:3000/login" page
    When I fill "Email" with the value of env "APP_USERNAME"
    When I click the "Sign in" button
    Then the "Password" field should be invalid
    Then the URL should contain "/login"
