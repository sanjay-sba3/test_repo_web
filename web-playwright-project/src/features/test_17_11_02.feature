Feature: Web User Flow

  Background:
    Given I open the "http://localhost:3000/login" page

  @dryrun @TS-464 @TC-TC1
  Scenario: Unauthenticated access to dashboard redirects to login
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"

  @dryrun @TS-465 @TC-TC1
  Scenario: Unauthenticated access to profile page redirects to login
    Given I open the "http://localhost:3000/profile" page
    Then the URL should contain "/login"

  # needs-review: registration page at /regiser returns 404; cannot verify form fields "Name", "Email", "Password" or buttons "Register", "Go to Login".
  @dryrun @needs-review @TS-466 @TC-TC1
  Scenario: Verify success message and Go to Login button after registration
    Given I open the "http://localhost:3000/regiser" page
    When I fill "Name" with "Test User"
    And I fill "Email" with "{{random.email}}"
    And I fill "Password" with "ValidPassword123!"
    And I click the "Register" button
    Then I should see the text "Registration successful"
    And I should see the "Go to Login" button

  # needs-review: registration page at /regiser returns 404; cannot verify form fields. Also, cannot fill 'every other field' without knowing what they are.
  @dryrun @needs-review @TS-463 @TC-TC1
  Scenario: Verify registration fails with an already registered email
    Given I open the "http://localhost:3000/regiser" page
    When I fill "Email" with the value of env "APP_USERNAME"
    # And I fill every other field on the form with valid values.
    And I fill "Name" with "Dummy Name"
    And I fill "Password" with "ValidPassword123!"
    And I click the "Register" button
    Then I should see the text "Email already registered"

  # needs-review: registration page at /register is missing or returns 404; cannot verify form fields. Also, /verify page for OTP is not captured.
  # needs-review: This scenario requires storing the generated email/password between steps, which needs custom step definitions.
  @dryrun @needs-review @TS-462 @TC-TC1
  Scenario: Successful E2E user flow: Register, Login, Navigate, Logout
    Given I open the "http://localhost:3000/register" page
    When I fill "Email" with "{{random.email}}"
    And I fill "Password" with "ValidNewUserP@ssw0rd1!"
    And I fill "Confirm Password" with "ValidNewUserP@ssw0rd1!"
    And I click the "Register" button
    Then I should see the text "Registration successful"
    When I click the "Go to Login" button
    # The following step needs the email from the registration step above.
    And I fill "Email" with "the_generated_email"
    And I fill "Password" with "ValidNewUserP@ssw0rd1!"
    And I click the "Sign in" button
    Then the URL should contain "/verify"
    When I fill "One-time code" with the value of env "APP_OTP"
    And I click the "Verify code" button
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then I should see the "Login" link
