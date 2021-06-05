Feature: As a user, I should be able to "press a button to show/hide an event's details" so that I can get more details about a specific event or hide them.


    Scenario: When user clicks Show Details button
        Given the main page is open
        When the user clicks Show Details
        Then the user should receive the details of an event

    Scenario: When user clicks Hide Details
        Given user has clicked 'Show Details' button
        And the details of event are showing
        When the user selects Hide Details
        Then the user should see the event without description