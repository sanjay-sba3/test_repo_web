Feature: User Registration and Management

  @dryrun @TS-222 @TC-TC1
  Scenario: E2E User Registration, Login, Profile Navigation, and Logout
    Given I open the "http://localhost:3000/register" page
    When I register a new user with unique details
    Then I should see the text "Registration successful"
    When I click the "Login" link
    Then the URL should contain "/login"
    When I log in as the newly registered user
    Then the URL should contain "/dashboard"
    When I navigate to my profile from the dashboard
    Then the URL should contain "/profile"
    When I navigate back to the dashboard from my profile
    Then the URL should contain "/dashboard"
    When I log out from the dashboard
    Then the URL should contain "/login"

  @TS-224 @TC-TC1
  Scenario: Unauthorized access to dashboard redirects to login
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"

  @TS-225 @TC-TC1
  Scenario: Verify registration fails with an empty email field
    Given I open the "http://localhost:3000/register" page
    When I fill the registration form but omit the email address
    And I click the "Create account" button
    Then the "Email address" field should be invalid
    And the URL should contain "/register"

  @TS-223 @TC-TC1
  Scenario: Register with existing email fails
    Given I register a new user with a unique email
    When I open the "http://localhost:3000/register" page
    And I attempt to register again with the same email
    Then the URL should contain "/register"
    And the URL should not contain "/dashboard"

  @TS-223 @TC-TC2
  Scenario: Register with case-variant of existing email fails
    Given I register a new user with a unique email
    When I open the "http://localhost:3000/register" page
    And I attempt to register again with a case-variant of the same email
    Then the URL should contain "/register"
    And the URL should not contain "/dashboard"

  @TS-226 @TC-TC1
  Scenario: Verify XSS script in registration form field is not executed
    Given I open the "http://localhost:3000/register" page
    When I register a new user with an XSS string in the first name
    Then I should see the text "Registration successful"
    When I click the "Login" link
    And I log in as the newly registered user
    Then the URL should contain "/dashboard"
    When I navigate to my profile from the dashboard
    Then the URL should contain "/profile"
    And I should see the text "<script>alert(1)</script>"
