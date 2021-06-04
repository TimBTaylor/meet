import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />)
    });
    test('render text input', () => {
        expect(NumberOfEventsWrapper.find('.events-number')).toHaveLength(1);
    });
    test('default events set to 32', () => {
        expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(32);
    });
    test('renders text input correctly', () => {
        const numberOfEvents = NumberOfEventsWrapper.state('numberOfEvents');
        expect(NumberOfEventsWrapper.find('.events-number').prop('value')).toBe(numberOfEvents);
    });
})