Feature: Demo App User Flows

  Background:
    Given I open the "http://localhost:3000/login" page

  @dryrun @TS-544 @TC-TC1
  Scenario: Direct Access to OTP Page Redirects to Login
    Given I open the "http://localhost:3000/otp" page
    Then the URL should contain "/login"
    And I should see the text "Sign in"

  @dryrun @TS-542 @TC-TC1
  Scenario: Unauthenticated user is redirected from /dashboard to /login
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
    And I should see the text "Sign in"

  @dryrun @TS-542 @TC-TC2
  Scenario: Unauthenticated user is redirected from /profile to /login
    Given I open the "http://localhost:3000/profile" page
    Then the URL should contain "/login"
    And I should see the text "Sign in"

  @dryrun @TS-542 @TC-TC3
  Scenario: Unauthenticated user is not redirected from a non-existent protected sub-route
    Given I open the "http://localhost:3000/dashboard/settings" page
    Then the URL should contain "/dashboard/settings"
    And the URL should not contain "/login"

  @dryrun @TS-543 @TC-TC1
  Scenario: Verify successful registration shows success message and login link
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "Test"
    And I fill "Last name" with "User"
    And I fill "Email address" with "{{random.email}}"
    And I fill "Age (years)" with "25"
    And I select "Male" from "Gender identity"
    And I fill "Account password" with "password123"
    And I fill "Confirm password" with "password123"
    And I check "I accept the terms and conditions"
    And I click the "Create account" button
    Then I should see the text "Registration successful"
    And I should see the "Go to login" link

  @dryrun @TS-541 @TC-TC1
  Scenario: Verify registration fails with an existing email address
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "Test"
    And I fill "Last name" with "User"
    And I fill "Email address" with the value of env "APP_USERNAME"
    And I fill "Age (years)" with "25"
    And I select "Male" from "Gender identity"
    And I fill "Account password" with "validPassword123"
    And I fill "Confirm password" with "validPassword123"
    And I check "I accept the terms and conditions"
    And I click the "Create account" button
    Then I should see the text "Email already registered"

  @dryrun @TS-540 @TC-TC1
  Scenario: E2E: Successful User Registration, Login, Navigation, and Logout
    When I register a new user for the E2E journey
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I sign in as the new user
    Then the URL should contain "/otp"
    When I enter the OTP code
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"
    And I should see the text "Sign in"

  @dryrun @TS-540 @TC-TC2
  Scenario: Register and Verify Profile with Optional Mobile Number
    When I register a new user with mobile number "+1-202-555-0149"
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    When I sign in as the new user
    When I enter the OTP code
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    And I should see "+1-202-555-0149" for the "Mobile" detail on the profile page

  @dryrun @TS-540 @TC-TC3
  Scenario: Register User at Minimum Age Boundary (13)
    When I register a new user with age "13"
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    When I sign in as the new user
    When I enter the OTP code
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then I should see "13" for the "Age" detail on the profile page

  @dryrun @TS-540 @TC-TC4
  Scenario: Register User with Minimum Length Password (6 characters)
    When I register a new user with a minimum length password "aB1#dE"
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    When I sign in as the new user
    Then the URL should contain "/otp"
    When I enter the OTP code
    Then the URL should contain "/dashboard"
