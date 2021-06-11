import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './App.css';
import './nprogress.css';
import icon from './images/github-logo.svg';
import linkedin from './images/linkedin_icon.svg';
import { OfflineAlert } from './Alert';

class App extends Component {

  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    eventsByLocation: null,
    currentLocation: 'all'
  }

  componentDidMount() {
    this.mounted = true;
    const { numberOfEvents } = this.state;
    if(!navigator.onLine) {
      this.setState({offlineWarning: 'No network connection. Events might be outdated'});
      console.log('state is false')
    }
    else {
      this.setState({offlineWarning: ''});
      console.log('state is true')
    }

    getEvents().then(events => {
      if (this.mounted) {
        this.setState({
          events: events.slice(0, numberOfEvents),
          locations: extractLocations(events),
          eventsByLocation: events.length
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = location => {
    getEvents().then(events => {
      const locationEvents = (location === 'all')
        ? events
        : events.filter(event => event.location === location);
      const { numberOfEvents } = this.state;
      const filteredEvents = locationEvents.slice(0, numberOfEvents);
      const eventsByLocation = locationEvents.length;
      this.setState({
        events: filteredEvents,
        eventsByLocation: eventsByLocation,
        currentLocation: location
      });
    });
  }

  updateEventCount = eventCount => {
    const { currentLocation } = this.state;
    this.setState({
      numberOfEvents: eventCount
    });
    this.updateEvents(currentLocation);
  }

  render() {
    return (
      <div className="App">
        <div className="icons">
          <a target="_blank" rel="noreferrer" className="github-logo" href="https://github.com/TimBTaylor/meet"><img className="github-logo" src={icon} alt="github logo" ></img></a>
          <a target="_blank" rel="noreferrer" className="linkedin-logo" href="https://www.linkedin.com/in/tim-taylor-aaa970207/"><img className="linkedin-logo" src={linkedin} alt="linkedin logo"></img></a>
        </div>
        <OfflineAlert text={this.state.offlineWarning} />
        <h1 className="intro">Meet App</h1>
        <CitySearch updateEvents={this.updateEvents} locations={this.state.locations} />
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEventCount={this.updateEventCount} />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;