import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
    let EventWrapper;
    beforeAll(() => {
        EventWrapper = shallow(<Event event={mockData[0]} />)
    })
    test('rendered event container', () => {
        expect(EventWrapper.find('.event-container')).toHaveLength(1);
    });
    test('rendered event summary, date, timezone, location', () => {
        expect(EventWrapper.find('.event-summary')).toHaveLength(1);
        expect(EventWrapper.find('.event-date')).toHaveLength(1);
        expect(EventWrapper.find('.event-location')).toHaveLength(1);
    });
    test('renders see details button when necessary', () => {
        EventWrapper.setState({
            showingDetails: false
        });
        expect(EventWrapper.find('.show-hide')).toHaveLength(1);
    });
    test('state changes and event details show when see details button is click', () => {
        EventWrapper.find('.show-hide').simulate('click');
        expect(EventWrapper.state('showingDetails')).toBe(true);
        expect(EventWrapper.find('.about-event')).toHaveLength(1);
    });
})
