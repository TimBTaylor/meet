Feature: Filter events by number

    Scenario: When user hasn't input a number for events, showing 32 events be default
        Given the user opens the app
        When user has not input a number for events to see
        Then the user should see a default number of events

    Scenario: When user inputs a specific number of events to see
        Given the user has the app open
        When the user enters a number in the events to see
        Then the user should receive a specified number of events