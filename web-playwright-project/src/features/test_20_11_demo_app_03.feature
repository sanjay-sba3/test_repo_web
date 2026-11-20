Feature: User Authentication and Registration Flow

  Background:
    Given I open the "http://localhost:3000/register" page

  @dryrun @TS-510 @TC-TC1 @TS-515
  Scenario: Successful end-to-end user flow
    When I register a new user
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in as the new user
    Then the URL should contain "/otp"
    When I enter the OTP
    Then the URL should contain "/dashboard"
    Then I should see the text "Welcome back"
    When I navigate from the dashboard to the profile page and back
    Then the URL should contain "/dashboard"
    When I log out from the dashboard
    Then the URL should contain "/login"
    Then I should see the "Login" link

  @dryrun @TS-513 @TC-TC1
  Scenario: Verify success message after registration
    When I successfully register a new user
    Then I should see the text "Registration successful"
    Then I should see the "Go to login" link
    Then I should not see the text "First name"

  @dryrun @TS-511 @TC-TC1 @TS-516
  Scenario: Verify error message when registering with an existing email
    When I attempt to register with the environment user's email
    Then I should see the text "Email already registered"
    Then the URL should contain "/register"

  @dryrun @TS-518 @TC-TC1
  Scenario: Verify registration is blocked with mismatched passwords
    When I attempt to register with mismatched passwords
    Then the "Confirm password" field should be invalid

  @dryrun @TS-514
  Scenario Outline: Verify registration is blocked with empty required fields
    When I attempt to register leaving the "<Field>" field empty
    Then the "<Field>" field should be invalid

    @TC-TC1
    Examples:
      | Field          |
      | First name     |
      | Last name      |

    @TC-TC2
    Examples:
      | Field          |
      | Email address  |

    @TC-TC3
    Examples:
      | Field            |
      | Account password |

    @TC-TC4
    Examples:
      | Field                             |
      | I accept the terms and conditions |

    @TC-TC5
    Examples:
      | Field       |
      | Age (years) |

  @dryrun @TS-512 @TS-517 @TS-519
  Scenario Outline: Verify unauthorized access to protected pages redirects to login
    Given I open the "http://localhost:3000<Page>" page
    Then the URL should contain "/login"
    Then I should see the "Sign in" button

    @TC-TC1 @TC-TC2
    Examples:
      | Page        |
      | /dashboard  |
      | /profile    |
      | /otp        |
