import EventIdeasItem from '../EventIdeasItem/EventIdeasItem'


export default function EventIdeasList({eventIdeas, setEventIdeas, user}) {
    return(<div className="container">
        
    {eventIdeas.map((event, index) => <> <EventIdeasItem event={event} index={index}  user={user} setEventIdeas={setEventIdeas}/> <br></br> </>)}
    
        </div>
    )
}