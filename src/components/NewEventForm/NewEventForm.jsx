import React from 'react';
import { Component } from 'react';
import { useState } from 'react';
import * as eventsAPI from '../../utilities/events-api'




export default class NewEventForm extends Component {

    state = {
        eventTitle: '',
        eventDetails: '',
        minimumAttendees: 2,
        eventDate: new Date(),
    }

    handleChange = (evt) => {
        this.setState({ 
            [evt.target.name]: evt.target.value
        });
        console.log(this.state)
    };

    handleSubmit = async (evt) => {
        console.log("Submit tapped: ", evt)
        evt.preventDefault();

        const formData = {
            user: this.props.user._id,
            eventTitle: this.state.eventTitle,
            eventDetails: this.state.eventDetails,
            minAttendees: this.state.minimumAttendees,
            eventDate: this.state.eventDate
        }

        await eventsAPI.createEvent(formData);

        this.props.navigate('/events')

    }



    render() {
        console.log(this.props.navigate)
       
        return (

            <div>
            <div className="form-container">
              <form autoComplete="off" onSubmit={this.handleSubmit}>
                <label>Event Title</label>
                <input type="text" name="eventTitle" value={this.state.eventTitle} onChange={this.handleChange} required />
                <label>Event Details</label>
                <input type="text" name="eventDetails" value={this.state.eventDetails} onChange={this.handleChange} required />
                <label>Event Projected Date</label>
                <input type="date" name="eventDate" value={this.state.eventDate} onChange={this.handleChange} required />
                <label>Minimum Attendees</label>
                <input type="number" name="minimumAttendees" value={this.state.minimumAttendees} onChange={this.handleChange} required />
               <button type="submit" >Post Event Idea</button>
              </form>
            </div>
            <p className="error-message">&nbsp;{this.state.error}</p>
          </div>
        );
    }
}