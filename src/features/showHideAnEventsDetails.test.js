import React from 'react';
import { mount, shallow } from 'enzyme';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import Event from '../Event';
import EventList from '../EventList';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    test('When user clicks Show Details button', ({ given, when, then }) => {
        let AppWrapper;
        given('the main page is open', () => {
            AppWrapper = mount(<App />);
        });

        when('the user clicks Show Details', () => {
            AppWrapper.update();
            AppWrapper.find('.show-hide').at(0).simulate('click');
        });
        then('the user should receive the details of an event', () => {
            expect(AppWrapper.find('.details-link')).toHaveLength(1);
        });
    });

    test('When user clicks Hide Details', ({ given, and, when, then }) => {
        let AppWrapper;
        AppWrapper = mount(<App />);
        given('user has clicked \'Show Details\' button', () => {
            AppWrapper.update();
            AppWrapper.find('.event-container .show-hide').at(0).simulate('click');
        });

        and('the details of event are showing', () => {
            expect(AppWrapper.find('.details-link')).toHaveLength(1);
        });

        when('the user selects Hide Details', () => {
            AppWrapper.find('.event-container .show-hide').at(0).simulate('click');
        });

        then('the user should see the event without description', () => {
            expect(AppWrapper.find('.details-link')).toHaveLength(0);
        });
    });
});