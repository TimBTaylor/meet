import React, { Component } from 'react';

class Event extends Component {
    state = {
        showingDetails: false
    }

    eventDetails = () => {
        const showingDetails = this.state.showingDetails;
        if (showingDetails === false) {
            this.setState({
                showingDetails: true
            })
        } else {
            this.setState({
                showingDetails: false
            })
        }
    };

    render() {
        const { event } = this.props;
        return <div className="event-container">
            <h1 className="event-summary">{event.summary}</h1>
            <p className="event-date">{event.dateTime}</p>
            <p className="event-timezone">{event.timeZone}</p>
            <p className="event-location">{event.location}</p>
            {this.state.showingDetails ? (<div />) : (<button className="show-hide" onClick={this.eventDetails}>See Details</button>)}
            {this.state.showingDetails ? (<div className="about-event" />) : (<div />)}
        </div>
    }
}

export default Event;