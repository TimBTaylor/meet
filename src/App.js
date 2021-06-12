import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import './App.css';
import './nprogress.css';
import icon from './images/github-logo.svg';
import linkedin from './images/linkedin_icon.svg';
import { OfflineAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import EventGenre from './EventGenre';

class App extends Component {

  state = {
    events: [],
    locations: [],
    numberOfEvents: 10,
    eventsByLocation: null,
    currentLocation: 'all',
    showWelomeScreen: undefined
  }

  componentDidMount() {
    this.mounted = true;
    const { numberOfEvents } = this.state;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen : !(code || isTokenValid )});
    if ((code || isTokenValid) && this.mounted) {
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
    if(!navigator.onLine) {
      this.setState({offlineWarning: 'No network connection. Events might be outdated'});
    }
    else {
      this.setState({offlineWarning: ''});
    }
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

  getData = () => {
    const {locations, events } = this.state;
    const data = locations.map((location ) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(',').shift()
      return  { city, number };
    })
    return data;
  };

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
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
        <div className="data-vis-wrapper" >
          <EventGenre events={this.state.events} /> 
          <ResponsiveContainer height={400} >
          <ScatterChart
            margin={{
              top: 20, right: 20, bottom: 20, left: 20,
            }}>
            <CartesianGrid />
            <XAxis type="category" dataKey="city" name="Location" />
            <YAxis type="number" dataKey="number" name="Number of events"  />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <EventList events={this.state.events} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }}/>
      </div>
    );
  }
}

export default App;