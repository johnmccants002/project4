import { Link } from 'react-router-dom';
import * as usersService from '../../utilities/users-service';
import { useState, useEffect } from 'react';
import * as eventsAPI from '../../utilities/events-api'
import EventList from '../../components/EventsList/EventsList'
import EventIdeasList from '../../components/EventIdeasList/EventIdeasList'
import {ButtonGroup, ToggleButton} from 'react-bootstrap'
export default function EventsPage({user, setUser}) {

    const [events, setEvents] = useState([]);
    const [eventIdeas, setEventIdeas] = useState([]);
    const [radioValue, setRadioValue] = useState('2')
    const radios = [ 
        { name: 'Event Ideas', value: '2'},
        { name: 'Events', value: '1'}
    ]

    useEffect(() => {
        async function getAllEvents() {
            const events = await eventsAPI.getEvents()
            let filteredEvents = [];
            let filteredEventIdeas = [];
            events.map((event, index) => 
                event.attendees.length >= event.minAttendees ? 
                    filteredEvents.push(event) : filteredEventIdeas.push(event)
                
            )

            console.log('These are the filteredEvents', filteredEvents)
            console.log('These are the filteredEventIdeas', filteredEventIdeas)

            setEvents(filteredEvents);
            setEventIdeas(filteredEventIdeas);
        }
        getAllEvents();
    }, []);




    return(
        <div>
    <ButtonGroup className='mb-2'>
    {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={'outline-success'}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}

    </ButtonGroup>

        {radioValue == '1' ? <EventList events={events} user={user} setEvents={setEvents}/> : <EventIdeasList eventIdeas={eventIdeas} user={user} setEventIdeas={setEventIdeas} />}
    
        </div>

    );
}