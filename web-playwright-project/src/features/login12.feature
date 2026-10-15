Feature: Login and Navigation

  Background:
    Given I open the "http://localhost:3000/login" page

  @dryrun @TS-168 @TC-TC1
  Scenario: Successful Login, Navigation, and Logout Flow
    When I sign in as the environment user
    Then the URL should contain "/dashboard"
    When I navigate to my profile
    Then the URL should contain "/profile"
    When I navigate back to the dashboard
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"

  @TS-168 @TC-TC2
  Scenario: Login with Invalid Password
    When I attempt to sign in with an invalid password
    Then I should see the text "Invalid email or password."
    And the URL should contain "/login"

  @TS-168 @TC-TC3
  Scenario: Login with Non-Existent Username
    When I attempt to sign in with a non-existent user
    Then I should see the text "Invalid email or password."
    And the URL should contain "/login"

  @TS-168 @TC-TC4
  Scenario: Login Attempt with Empty Username
    When I fill "Password" with the value of env "APP_PASSWORD"
    And I click the "Sign in" button
    Then the "Email" field should be invalid
    And the URL should contain "/login"

  @TS-168 @TC-TC5
  Scenario: Login Attempt with Empty Password
    When I fill "Email" with the value of env "APP_USERNAME"
    And I click the "Sign in" button
    Then the "Password" field should be invalid
    And the URL should contain "/login"

  @TS-169 @TC-TC1
  Scenario: Unauthorized Dashboard access redirects to Login page
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"

  @TS-170 @TC-TC1
  Scenario: Unauthorized access to protected Profile page redirects to Login
    Given I open the "http://localhost:3000/profile" page
    Then the URL should contain "/login"

  @TS-171 @TC-TC1
  Scenario: Navigate from Profile to Dashboard via 'Back to Dashboard' link
    When I sign in as the environment user
    Then the URL should contain "/dashboard"
    When I open the "http://localhost:3000/profile" page
    And I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"