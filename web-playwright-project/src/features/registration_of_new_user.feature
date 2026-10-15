Feature: Registration of new user
  This feature covers the end-to-end user registration flow, including happy path, validation, and navigation.

  @dryrun @TS-172 @TC-TC1
  Scenario: Successful user registration, login, profile navigation, and logout
    Given I open the "http://localhost:3000/register" page
    When I register a new user
    Then I should see the text "Registration successful"
    When I click the "Sign in" link
    Then the URL should contain "/login"
    When I log in as the new user
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"

  @TS-174 @TC-TC2
  Scenario: Unauthorized access to dashboard redirects to login
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
    Then I should see the "Sign in" button

  @TS-173 @TC-TC1
  Scenario: Attempt to register with an already existing email
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with the environment user's email
    # Test case specifies "Email already exists", which is not in a snapshot. Asserting this text.
    Then I should see the text "Email already exists"
    Then the URL should not contain "/dashboard"

  @TS-174 @TC-TC5
  Scenario: Attempt to register with mismatched passwords
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with mismatched passwords
    Then the "Confirm password" field should be invalid

  @TS-172 @TC-TC4
  Scenario: Attempt to register with a blank email
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with a blank email
    Then the "Email address" field should be invalid

  @TS-174 @TC-TC4
  Scenario: Attempt to register with a blank password
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with a blank password
    Then the "Account password" field should be invalid

  @TS-172 @TC-TC5
  Scenario: Verify XSS protection on a registration text field
    Given I open the "http://localhost:3000/register" page
    When I register a new user with a script in the first name
    Then I should see the text "Registration successful"
    When I click the "Sign in" link
    Then the URL should contain "/login"
    When I log in as the new user
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    Then I should see the text "<script>alert(1)</script>"

  @TS-176 @TC-TC1
  Scenario: Verify navigation between Dashboard and Profile for a logged-in user
    Given I am logged in as the environment user
    When I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"