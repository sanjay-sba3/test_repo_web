Feature: Login and User Flow

  # Happy path for successful login, verifiable with current snapshots.
  @dryrun @TS-161 @TC-TC1
  Scenario: Successful user login and redirection to dashboard
    Given I open the "http://localhost:3000/login" page
    When I fill "Email" with the value of env "APP_USERNAME"
    When I fill "Password" with the value of env "APP_PASSWORD"
    When I click the "Sign in" button
    Then the URL should contain "/dashboard"

  # The main E2E flow, blocked by missing elements in snapshots.
  # needs-review: 'View Profile' link not found in dashboard snapshot.
  # needs-review: 'Back to Dashboard' link not found in profile snapshot.
  # needs-review: 'Logout' button not found in dashboard or profile snapshots.
  @needs-review @TS-160 @TC-TC1
  Scenario: Successful login, navigation between dashboard and profile, and logout
    Given I open the "http://localhost:3000/login" page
    When I fill "Email" with the value of env "APP_USERNAME"
    When I fill "Password" with the value of env "APP_PASSWORD"
    When I click the "Sign in" button
    Then the URL should contain "/dashboard"
    When I click the "View Profile" link
    Then the URL should contain "/profile"
    When I click the "Back to Dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"

  # Covers TC2/160, TC1/165, TC5/161
  @TS-160 @TC-TC2
  Scenario: Login attempt with invalid password
    Given I open the "http://localhost:3000/login" page
    When I fill "Email" with the value of env "APP_USERNAME"
    When I fill "Password" with "IncorrectPassword123!"
    When I click the "Sign in" button
    Then I should see the text "Invalid credentials"
    Then the URL should contain "/login"

  # Covers TC2/165
  @TS-165 @TC-TC2
  Scenario: Login with a non-existent username
    Given I open the "http://localhost:3000/login" page
    When I fill "Email" with "{{random.email}}"
    When I fill "Password" with "anypassword"
    When I click the "Sign in" button
    Then I should see the text "Invalid credentials"
    Then the URL should contain "/login"

  # Covers TC1/166, TC5/160, TC3/165
  @TS-166 @TC-TC1
  Scenario: Login attempt with empty credentials
    Given I open the "http://localhost:3000/login" page
    When I click the "Sign in" button
    Then the "Email" field should be invalid
    Then the "Password" field should be invalid
    Then the URL should contain "/login"

  # Covers TC4/165
  @TS-165 @TC-TC4
  Scenario: Login attempt with XSS payload in email field
    Given I open the "http://localhost:3000/login" page
    When I fill "Email" with "{{security.comment}}"
    When I fill "Password" with "anypassword"
    When I click the "Sign in" button
    Then I should see the text "Invalid credentials"
    Then the URL should contain "/login"

  # Covers TC1/163, TC3/160, TC2/161
  @TS-163 @TC-TC1
  Scenario: Unauthenticated access to dashboard page redirects to login
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"

  # Covers TC1/164, TC4/160
  @TS-164 @TC-TC1
  Scenario: Unauthenticated access to profile page redirects to login
    Given I open the "http://localhost:3000/profile" page
    Then the URL should contain "/login"

  # Covers TC3/161. Needs login first.
  # needs-review: 'View Profile' link not found in dashboard snapshot.
  @needs-review @TS-161 @TC-TC3
  Scenario: Navigate from Dashboard to Profile page
    Given I open the "http://localhost:3000/login" page
    When I fill "Email" with the value of env "APP_USERNAME"
    When I fill "Password" with the value of env "APP_PASSWORD"
    When I click the "Sign in" button
    Then the URL should contain "/dashboard"
    When I click the "View Profile" link
    Then the URL should contain "/profile"

  # Covers TC1/162. Needs login first.
  # needs-review: 'Back to Dashboard' link not found in profile snapshot.
  @needs-review @TS-162 @TC-TC1
  Scenario: Verify 'Back to Dashboard' link navigates from Profile to Dashboard page
    Given I open the "http://localhost:3000/login" page
    When I fill "Email" with the value of env "APP_USERNAME"
    When I fill "Password" with the value of env "APP_PASSWORD"
    When I click the "Sign in" button
    Then the URL should contain "/dashboard"
    Given I open the "http://localhost:3000/profile" page
    Then the URL should contain "/profile"
    When I click the "Back to Dashboard" link
    Then the URL should contain "/dashboard"

  # Covers TC4/161. Needs login first.
  # needs-review: 'Back to Dashboard' link not found in profile snapshot.
  # needs-review: 'Logout' button not found in dashboard or profile snapshots.
  @needs-review @TS-161 @TC-TC4
  Scenario: Navigate from Profile to Dashboard and then Logout
    Given I open the "http://localhost:3000/login" page
    When I fill "Email" with the value of env "APP_USERNAME"
    When I fill "Password" with the value of env "APP_PASSWORD"
    When I click the "Sign in" button
    Then the URL should contain "/dashboard"
    Given I open the "http://localhost:3000/profile" page
    Then the URL should contain "/profile"
    When I click the "Back to Dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"
