import React from 'react';
import { mount } from 'enzyme';
import { loadFeature, defineFeature } from 'jest-cucumber';
import NumberOfEvents from '../NumberOfEvents';
import App from '../App';
import Event from '../Event';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('When user hasn\'t input a number for events, showing 32 events be default', ({ given, when, then }) => {
        let AppWrapper;
        given('the user opens the app', () => {
            AppWrapper = mount(<App />);
        });

        when('user has not input a number for events to see', () => {
            AppWrapper.update();
            const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
            expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(32);
        });

        then('the user should see a default number of events', () => {
            const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
            expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(32);
        });
    });

    test('When user inputs a specific number of events to see', ({ given, when, then }) => {
        let AppWrapper;
        given('the user has the app open', () => {
            AppWrapper = mount(<App />);
        });

        when('the user enters a number in the events to see', () => {
            AppWrapper.find('.events-number').simulate('change', { target: { value: 5 } });
        });

        then('the user should receive a specified number of events', () => {
            const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
            expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(5);
        });
    });
});