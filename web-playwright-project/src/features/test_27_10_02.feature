Feature: User Registration and Authentication Flow

  @dryrun @TS-309 @TC-TC1
  Scenario: Verify registration is blocked for an existing email address
    Given I open the "http://localhost:3000/register" page
    When I create a user with email "test.duplicate@example.com"
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with email "test.duplicate@example.com"
    Then I should see the text "Email already registered"
    And the URL should contain "/register"

  @dryrun @TS-311 @TC-TC1
  Scenario: Registration with empty required fields
    Given I open the "http://localhost:3000/register" page
    When I click the "Create account" button
    Then the URL should contain "/register"
    And the "Email address" field should be invalid
    And the "Account password" field should be invalid
    And the "First name" field should be invalid

  @dryrun @TS-307 @TC-TC1
  Scenario: Successful end-to-end user journey: Register, Login, Navigate, Logout
    Given I open the "http://localhost:3000/register" page
    When I register a new user with valid details
    Then I should see the text "Registration successful"
    And I should see the "Go to login" link
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in as the newly registered user
    Then the URL should contain "/dashboard"
    When I navigate from the dashboard to the profile page and back
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"

  @dryrun @TS-307 @TC-TC2
  Scenario: Attempt registration with an already existing email
    Given I open the "http://localhost:3000/register" page
    When I create a user with the environment email
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with the environment email
    Then I should see the text "Email already registered"
    And the URL should contain "/register"

  @dryrun @TS-307 @TC-TC3
  Scenario: Attempt registration with mismatched passwords
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with mismatched passwords
    Then the "Confirm password" field should be invalid
    And the URL should contain "/register"

  @dryrun @TS-307 @TC-TC4
  Scenario: Attempt to log in with incorrect password for a newly registered user
    Given I open the "http://localhost:3000/register" page
    When I register a new user with valid details
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    When I attempt to log in as the newly registered user with a wrong password
    Then I should see the text "Please enter a valid email and password"
    And the URL should contain "/login"

  @dryrun @TS-307 @TC-TC5
  Scenario: Attempt to access a protected page without being logged in
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"

  @dryrun @TS-308 @TC-TC1
  Scenario: Successful user registration, login, profile navigation, and logout
    Given I open the "http://localhost:3000/register" page
    When I register a new user with valid details
    Then I should see the text "Registration successful"
    And I should see the "Go to login" link
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in as the newly registered user
    Then the URL should contain "/dashboard"
    When I navigate from the dashboard to the profile page and back
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"

  @dryrun @TS-308 @TC-TC2
  Scenario: Unauthenticated user is redirected to login when accessing dashboard
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"

  @dryrun @TS-308 @TC-TC3
  Scenario: User cannot register with an existing email address
    Given I open the "http://localhost:3000/register" page
    When I create a user with the environment email
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with the environment email
    Then I should see the text "Email already registered"
    And the URL should contain "/register"

  @dryrun @TS-308 @TC-TC4
  Scenario: User cannot log in with an incorrect password
    Given I open the "http://localhost:3000/login" page
    When I fill "Email" with the value of env "APP_USERNAME"
    And I fill "Password" with "wrong-password-123"
    And I click the "Sign in" button
    Then I should see the text "Please enter a valid email and password"
    And the URL should contain "/login"

  @dryrun @TS-308 @TC-TC5
  Scenario: User cannot register if passwords do not match
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with mismatched passwords
    Then the "Confirm password" field should be invalid
    And the URL should contain "/register"

  @dryrun @TS-310 @TC-TC1
  Scenario: Verify successful registration message and login button
    Given I open the "http://localhost:3000/register" page
    When I register a new user with valid details
    Then I should see the text "Registration successful"
    And I should see the "Go to login" link

  @dryrun @TS-310 @TC-TC2
  Scenario: Verify end-to-end user flow from registration to logout
    Given I open the "http://localhost:3000/register" page
    When I register a new user with valid details
    Then I should see the text "Registration successful"
    And I should see the "Go to login" link
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in as the newly registered user
    Then the URL should contain "/dashboard"
    When I navigate from the dashboard to the profile page and back
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"

  @dryrun @TS-310 @TC-TC3
  Scenario: Verify registration fails with a duplicate email
    Given I open the "http://localhost:3000/register" page
    When I create a user with the environment email
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with the environment email
    Then I should see the text "Email already registered"
    And the URL should contain "/register"
