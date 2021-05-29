import { times } from 'lodash';
import React, { Component } from 'react';

class NumberOfEvents extends Component {
    state = {
        query: 32
    };

    handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({
            query: value
        })
    }
    render() {
        return (
            <div className="number-of-events">
                <input className="events-number" type="text" value={this.state.query} onChange={this.handleInputChanged} />
            </div>
        )
    }
}

export default NumberOfEvents;