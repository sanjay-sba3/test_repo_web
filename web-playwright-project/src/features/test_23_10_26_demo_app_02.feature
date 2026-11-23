Feature: Demo App User Registration and Authentication

  Background:
    Given I open the "http://localhost:3000/register" page

  @dryrun @TS-536 @TC-TC1
  Scenario: Verify registration fails with an already registered email
    When I attempt to register with an existing email
    Then I should see the text "Email already registered"
    And the URL should contain "/register"

  @dryrun @TS-538 @TC-TC1
  Scenario Outline: Verify registration is blocked with an empty required field
    When I fill all fields for a valid registration but leave "<field>" empty
    And I click the "Create account" button
    Then the "<field>" field should be invalid

    Examples:
      | field                             |
      | First name                        |
      | Last name                         |
      | Email address                     |
      | Account password                  |
      | I accept the terms and conditions |
      | Age (years)                       |

  @dryrun @TS-537 @TC-TC1
  Scenario: Unauthenticated access to dashboard redirects to login
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
    And I should see the text "Sign in"

  @dryrun @TS-537 @TC-TC2
  Scenario: Unauthenticated access to profile redirects to login
    Given I open the "http://localhost:3000/profile" page
    Then the URL should contain "/login"
    And I should see the text "Sign in"

  @dryrun @TS-537 @TC-TC3
  Scenario: Unauthenticated access to otp redirects to login
    Given I open the "http://localhost:3000/otp" page
    Then the URL should contain "/login"
    And I should see the text "Sign in"

  @dryrun @TS-539 @TC-TC1
  Scenario: Register with age below the minimum of 13
    When I fill all fields for a valid registration but with age "12"
    And I click the "Create account" button
    Then the "Age (years)" field should be invalid

  @dryrun @TS-539 @TC-TC2
  Scenario: Register with the minimum allowed age of 13
    When I fill all fields for a valid registration but with age "13"
    And I click the "Create account" button
    Then I should see the text "Registration successful"
    And I should see the "Go to login" link

  @dryrun @TS-539 @TC-TC3
  Scenario: Register with age above the maximum of 120
    When I fill all fields for a valid registration but with age "121"
    And I click the "Create account" button
    Then the "Age (years)" field should be invalid

  @dryrun @TS-539 @TC-TC4
  Scenario: Register with a non-numeric value for age
    When I fill all fields for a valid registration but with age "abc"
    And I click the "Create account" button
    Then the "Age (years)" field should be invalid

  @dryrun @TS-535 @TC-TC1
  Scenario: E2E - Successful Registration, Login, Navigation, and Logout
    When I register a new user
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in as the new user
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

  @dryrun @TS-535 @TC-TC2
  Scenario: E2E - Registration with Optional Mobile Number
    When I register a new user with a mobile number
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in as the new user
    Then the URL should contain "/otp"
    When I enter the OTP code
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"
    And I should see the text "Sign in"

  @dryrun @TS-535 @TC-TC3
  Scenario: E2E - Login with "Remember my email" functionality
    When I register a new user
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in as the new user with remember me enabled
    Then the URL should contain "/otp"
    When I enter the OTP code
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"
    Then the "Email" field should contain my registered email

  # needs-review: The /verify page is not in the captured pages. Locators for OTP input and Verify button are assumed.
  @dryrun @needs-review @TS-535 @TC-TC4
  Scenario: E2E - Successful login via alternate single-field OTP page
    Given I open the "http://localhost:3000/login" page
    When I fill "Email" with the value of env "APP_USERNAME"
    And I fill "Password" with the value of env "APP_PASSWORD"
    And I click the "Sign in" button
    Then the URL should contain "/otp"
    When I click the "Use single field" link
    Then the URL should contain "/verify"
    When I enter the OTP code on the verify page
    Then the URL should contain "/dashboard"
    And I should see the text "Welcome back"
