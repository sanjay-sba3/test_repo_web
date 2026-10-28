Feature: User Registration and Navigation Flow

  @dryrun @TS-319 @TC-TC1
  Scenario: Unauthorized access to dashboard redirects to login
    Given I open the "/dashboard" page
    Then the URL should contain "/login"
    And the page title should contain "DemoApp"

  @dryrun @TS-321 @TC-TC1
  Scenario: Verify navigation from Dashboard to Profile and back
    Given I sign in as the environment user
    Then the URL should contain "/dashboard"
    When I navigate from the dashboard to my profile
    Then the URL should contain "/profile"
    When I navigate from my profile back to the dashboard
    Then the URL should contain "/dashboard"

  @dryrun @TS-318 @TC-TC1
  Scenario: Verify success message and link after registration
    Given I open the "/register" page
    When I successfully register a new user
    Then I should see the text "Registration successful"
    Then I should see the "Go to login" link

  @dryrun @TS-320 @TC-TC1
  Scenario: Attempt registration with an existing email address
    Given I open the "/register" page
    When I attempt to register with the existing environment email
    Then I should see the text "Email already registered"
    Then the URL should contain "/register"

  @dryrun @TS-317 @TC-TC1
  Scenario: Successful User Registration, Login, Navigation, and Logout
    Given I open the "/register" page
    When I register a new user and remember the credentials
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I sign in as the new user
    Then the URL should contain "/dashboard"
    When I navigate from the dashboard to my profile
    Then the URL should contain "/profile"
    When I navigate from my profile back to the dashboard
    Then the URL should contain "/dashboard"
    When I log out from the dashboard
    Then the URL should contain "/login"

  @dryrun @TS-317 @TC-TC2
  Scenario: Attempt Registration with an Existing Email
    Given I open the "/register" page
    When I attempt to register with the existing environment email
    Then I should see the text "Email already registered"
    Then the URL should contain "/register"

  @dryrun @TS-317 @TC-TC3
  Scenario: Verify Protected Page Access After Logout
    Given I sign in as the environment user
    Then the URL should contain "/dashboard"
    When I log out from the dashboard
    Then the URL should contain "/login"
    When I open the "/dashboard" page
    Then the URL should contain "/login"
