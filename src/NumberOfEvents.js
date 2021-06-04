
import React, { Component } from 'react';

class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 32
    };

    handleInputChanged = (event) => {
        const numberOfEvents = event.target.value;
        this.setState({
            numberOfEvents,
        });
        this.props.updateEventCount(numberOfEvents);
    }

    render() {
        return (
            <div className="number-of-events">
                <h4 className="total-events">Amount of events shown:</h4>
                <input className="events-number" value={this.state.numberOfEvents} type="text" onChange={this.handleInputChanged} />
            </div>
        )
    }
}

export default NumberOfEvents;