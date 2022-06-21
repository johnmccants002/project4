import React from 'react';
import EventItem from '../EventItem/EventItem'

export default function EventsList({events, setEvents, user}) {
    return(<div className="container">
    {events.map((event, index) => <EventItem event={event} index={index}  user={user} setEvents={setEvents}/>) }
    </div>)
}