
import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 10
    };

    handleInputChanged = (event) => {
        const numberOfEvents = event.target.value;
        this.setState({
            numberOfEvents,
        });
        if (numberOfEvents.toUpperCase() !== numberOfEvents.toLowerCase() ) {
            this.setState({
                errorText: 'Please enter a number',
                numberOfEvents: 0,
            })
            this.props.updateEventCount(0);
        }else if (numberOfEvents < 1) {
            this.setState({
                errorText: 'Please enter a larger number',
                numberOfEvents: 0,
            })
            this.props.updateEventCount(0);
        }else if (numberOfEvents > 32) {
            this.setState({
                errorText: 'Please enter a smaller number',
                numberOfEvents: 0,
            })
            this.props.updateEventCount(0);
        } else {
            this.props.updateEventCount(numberOfEvents);
            this.setState({
                errorText: ''
            })
        }
    }

    render() {
        return (
            <div className="number-of-events">
                <h4 className="total-events">Events shown:</h4>
                <input className="events-number" type="text" onChange={this.handleInputChanged} />
                <ErrorAlert text={this.state.errorText} />
            </div>
        )
    }
}

export default NumberOfEvents;