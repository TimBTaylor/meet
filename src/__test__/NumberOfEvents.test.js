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
        expect(NumberOfEventsWrapper.state('query')).toBe(32);
    });
    test('renders text input correctly', () => {
        const query = NumberOfEventsWrapper.state('query');
        expect(NumberOfEventsWrapper.find('.events-number').prop('value')).toBe(query);
    });
    test('change the state when text input changes', () => {
        NumberOfEventsWrapper.setState({
            query: '5'
        });
        const eventObject = { target: { value: '10' } };
        NumberOfEventsWrapper.find('.events-number').simulate('change', eventObject);
        expect(NumberOfEventsWrapper.state('query')).toBe('10');
    });
})