@TS-login8
Feature: Login Functionality
  This feature covers the user login flow, including successful login, handling of invalid credentials, and input validation, to ensure secure and reliable access to the application dashboard.

  @dryrun @TC-TC1
  Scenario: Successful login with valid credentials
    Given I open the "http://192.168.0.133:3000/login" page
    When I fill "Email" with the value of env "APP_USERNAME"
    When I fill "Password" with the value of env "APP_PASSWORD"
    When I click the "Sign in" button
    Then the URL should contain "/dashboard"

  @TC-TC1
  Scenario: Verify login via keyboard navigation and Enter key submission
    Given I open the "http://192.168.0.133:3000/login" page
    When I fill "Email" with the value of env "APP_USERNAME"
    When I press the "Tab" key
    Then the "Password" field should have focus
    When I fill "Password" with the value of env "APP_PASSWORD"
    When I press the "Tab" key
    Then the "Sign in" button should have focus
    When I press the "Enter" key
    Then the URL should contain "/dashboard"

  @TC-TC2
  Scenario: Login attempt with invalid password
    Given I open the "http://192.168.0.133:3000/login" page
    When I fill "Email" with the value of env "APP_USERNAME"
    When I fill "Password" with "wrong-password-123"
    When I click the "Sign in" button
    Then I should see the text "Invalid credentials"
    Then the URL should contain "/login"

  @TC-TC3
  Scenario: Login attempt with a non-existent username
    Given I open the "http://192.168.0.133:3000/login" page
    When I fill "Email" with "{{random.email}}"
    When I fill "Password" with "any-password"
    When I click the "Sign in" button
    Then I should see the text "Invalid credentials"
    Then the URL should contain "/login"

  @TC-TC4
  Scenario: Login attempt with empty credentials
    Given I open the "http://192.168.0.133:3000/login" page
    When I click the "Sign in" button
    Then the "Email" field should be invalid
    Then the "Password" field should be invalid

  @TC-TC5
  Scenario: Login attempt with XSS payload in username field
    Given I open the "http://192.168.0.133:3000/login" page
    When I fill "Email" with "{{security.comment}}"
    When I fill "Password" with "any-password"
    When I click the "Sign in" button
    Then I should see the text "Invalid credentials"
    Then the URL should contain "/login"

  @TC-TC1
  Scenario: Login attempt with empty username
    Given I open the "http://192.168.0.133:3000/login" page
    When I fill "Password" with the value of env "APP_PASSWORD"
    When I click the "Sign in" button
    Then the "Email" field should be invalid
    Then the URL should contain "/login"

  @TC-TC2
  Scenario: Login attempt with empty password
    Given I open the "http://192.168.0.133:3000/login" page
    When I fill "Email" with the value of env "APP_USERNAME"
    When I click the "Sign in" button
    Then the "Password" field should be invalid
    Then the URL should contain "/login"

  @TC-TC3
  Scenario: Login attempt with both username and password empty
    Given I open the "http://192.168.0.133:3000/login" page
    When I click the "Sign in" button
    Then the "Email" field should be invalid
    Then the "Password" field should be invalid
    Then the URL should contain "/login"

  @TC-TC1
  Scenario: Verify password field masks character input
    Given I open the "http://192.168.0.133:3000/login" page
    When I fill "Password" with "MySecretP@ssw0rd!"
    Then the "Password" field should be a password field

  @TC-TC1
  Scenario: Login with script injection attempt in username and password fields
    Given I open the "http://192.168.0.133:3000/login" page
    When I fill "Email" with "{{security.comment}}"
    When I fill "Password" with "{{security.comment}}"
    When I click the "Sign in" button
    Then I should see the text "Invalid credentials"

  @TC-TC1
  Scenario: Successful login with valid credentials (variant 2)
    Given I open the "http://192.168.0.133:3000/login" page
    When I fill "Email" with the value of env "APP_USERNAME"
    When I fill "Password" with the value of env "APP_PASSWORD"
    When I click the "Sign in" button
    Then the URL should contain "/dashboard"

  @TC-TC2
  Scenario: Login attempt with invalid credentials
    Given I open the "http://192.168.0.133:3000/login" page
    When I fill "Email" with the value of env "APP_USERNAME"
    When I fill "Password" with "invalidPassword123!"
    When I click the "Sign in" button
    Then I should see the text "Invalid credentials"
    Then the URL should contain "/login"

  @TC-TC3
  Scenario: Login attempt with empty email field
    Given I open the "http://192.168.0.133:3000/login" page
    When I fill "Password" with "somepassword"
    When I click the "Sign in" button
    Then the "Email" field should be invalid

  @TC-TC4
  Scenario: Login attempt with empty password field
    Given I open the "http://192.168.0.133:3000/login" page
    When I fill "Email" with the value of env "APP_USERNAME"
    When I click the "Sign in" button
    Then the "Password" field should be invalid

  @TC-TC5
  Scenario: Login attempt with invalid email format
    Given I open the "http://192.168.0.133:3000/login" page
    When I fill "Email" with "{{negative.email}}"
    When I fill "Password" with "somepassword"
    When I click the "Sign in" button
    Then the "Email" field should be invalid

  @TC-TC1
  Scenario: Unauthenticated user is redirected from dashboard to login
    Given I open the "http://192.168.0.133:3000/dashboard" page
    Then the URL should contain "/login"

  @TC-TC2
  Scenario: Successful login with valid credentials (variant 3)
    Given I open the "http://192.168.0.133:3000/login" page
    When I fill "Email" with the value of env "APP_USERNAME"
    When I fill "Password" with the value of env "APP_PASSWORD"
    When I click the "Sign in" button
    Then the URL should contain "/dashboard"

  @TC-TC3
  Scenario: Login attempt with invalid password (variant 2)
    Given I open the "http://192.168.0.133:3000/login" page
    When I fill "Email" with the value of env "APP_USERNAME"
    When I fill "Password" with "wrongpassword123"
    When I click the "Sign in" button
    Then I should see the text "Invalid credentials"
    Then the URL should contain "/login"

  @TC-TC4
  Scenario: Login attempt with a non-existent email
    Given I open the "http://192.168.0.133:3000/login" page
    When I fill "Email" with "{{random.email}}"
    When I fill "Password" with "anyPassword123"
    When I click the "Sign in" button
    Then I should see the text "Invalid credentials"
    Then the URL should contain "/login"

  @TC-TC5
  Scenario: Login attempt with empty credentials (variant 2)
    Given I open the "http://192.168.0.133:3000/login" page
    When I click the "Sign in" button
    Then the "Email" field should be invalid
    Then the "Password" field should be invalid

  @TC-TC1
  Scenario: Successful login with valid credentials (variant 4)
    Given I open the "http://192.168.0.133:3000/login" page
    When I fill "Email" with the value of env "APP_USERNAME"
    When I fill "Password" with the value of env "APP_PASSWORD"
    When I click the "Sign in" button
    Then the URL should contain "/dashboard"

  @TC-TC2
  Scenario: Verify login page UI elements are present
    Given I open the "http://192.168.0.133:3000/login" page
    Then I should see the text "Email"
    Then I should see the text "Password"
    Then I should see the "Sign in" button

  @TC-TC3
  Scenario: Login attempt with valid username and invalid password
    Given I open the "http://192.168.0.133:3000/login" page
    When I fill "Email" with the value of env "APP_USERNAME"
    When I fill "Password" with "invalid-password-123!"
    When I click the "Sign in" button
    Then I should see the text "Invalid credentials"
    Then the URL should contain "/login"

  @TC-TC4
  Scenario: Login attempt with non-existent username (variant 2)
    Given I open the "http://192.168.0.133:3000/login" page
    When I fill "Email" with "{{random.email}}"
    When I fill "Password" with "any-password"
    When I click the "Sign in" button
    Then I should see the text "Invalid credentials"
    Then the URL should contain "/login"

  @TC-TC5
  Scenario: Login attempt with empty credentials (variant 3)
    Given I open the "http://192.168.0.133:3000/login" page
    When I click the "Sign in" button
    Then the "Email" field should be invalid
    Then the "Password" field should be invalid
