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
        const eventISODateTime = new Date(event.start.dateTime);
        const date = eventISODateTime.toDateString();
        return <div className="event-container">
            <h1 className="event-summary">{event.summary}</h1>
            <p className="event-date">{date} </p>
            <p className="event-location">{event.location}</p>
            {this.state.showingDetails && (
                <div className="event-details">
                    <h3 className="about-event">About event:</h3>
                    <a className="details-link" target="_blank" rel="noreferrer" href={event.htmlLink}>See details on Google Calendar</a>
                    <p className="event-description">{event.description}</p>
                </div>
            )}
            <button className="show-hide" onClick={() => this.eventDetails()}> {this.state.showingDetails ? 'hide description' : 'show description'} </button>
        </div >
    }
}

export default Event;