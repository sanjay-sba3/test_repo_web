Feature: User Registration and Authentication

  @dryrun @TS-252 @TC-TC1
  Scenario: Successful end-to-end user journey: register, login, navigate, logout
    Given I open the "http://localhost:3000/register" page
    When I register a new user with valid details
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in as the new user
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"

  # needs-review: The exact error message for a duplicate email is not specified. Assuming "Email address already exists".
  @needs-review @TS-253 @TC-TC1
  Scenario: Attempt registration with an existing email
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with a duplicate email
    Then I should see the text "Email address already exists"
    Then the URL should not contain "/dashboard"

  @TS-252 @TC-TC3
  Scenario: Attempt registration with mismatched passwords
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with mismatched passwords
    Then the "Confirm password" field should be invalid

  @TS-254 @TC-TC5
  Scenario: Attempt registration with an invalid email format
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with an invalid email format
    Then the "Email address" field should be invalid

  @TS-256 @TC-TC3
  Scenario: Verify script injection is sanitized
    Given I open the "http://localhost:3000/register" page
    When I register a new user with a script in the first name
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in as the new user
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    Then I should see the text "<script>alert(1)</script>"

  @TS-254 @TC-TC2
  Scenario: Unauthorized access to protected pages redirects to login
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
    Given I open the "http://localhost:3000/profile" page
    Then the URL should contain "/login"

  @TS-254 @TC-TC4
  Scenario: Logged out user cannot access protected pages via browser history
    When I sign in as the environment user
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"
    When I go back in the browser history
    Then the URL should contain "/login"