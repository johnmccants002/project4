
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const Event = require('../../models/event')
const Comment = require('../../models/comment');


module.exports = {
    createEvent,
    getEvents,
    attendEvent,
    deleteEvent,
    getComments,
    addComment
}
async function createEvent(req, res) {
    console.log("this is the req.body: ", req.body);
    try {
        const event = await Event.create(req.body.formData);
        console.log("Event has been created")
        const events = await Event.find({})
        res.json(events)

    } catch(err) {
        console.log("error creating event: ", err);
        res.status(400).json(err);
    }

}

async function getEvents(req, res) {
    const events = await Event.find({})
    console.log("Events from API Controller: ", events);

    res.json(events)

}

async function attendEvent(req, res) {
    console.log("This is the user id: ", req.user._id, req.params.eventId)
    const event = await Event.findById(req.params.eventId)
    if (event.attendees.indexOf(req.user._id) > -1) {
        console.log("Attendee already in event removing attendee")
        let newAttendees = [];
        for (i = 0; i < event.attendees.length; i++) {
            if (event.attendees[i] !== req.user._id) {
                newAttendees.push(event.attendees[i])
            }
        }
        event.attendees = newAttendees
        event.save()
    

    } else {
        console.log("New attendee")
        event.attendees.push(req.user._id)
        event.save()
    
    } 

    const events = await Event.find({})

    if (req.body.type == "Events") {
        let filteredEventIdeas = [];
        for (const event of events) {
            if (event.attendees.length >= event.minAttendees) {
                filteredEventIdeas.push(event)
            }
        }
        res.json(filteredEventIdeas)
    } else if (req.body.type == "EventIdeas"){
        let filteredEvents = [];
        for (const event of events) {
            if (event.attendees.length < event.minAttendees) {
                filteredEvents.push(event)
            }
        }
        res.json(filteredEvents)
    }
}

async function deleteEvent(req, res) {
    await Event.findByIdAndDelete(req.params.eventId)
    const events = await Event.find({})

    if (req.body.type == "Events") {
        let filteredEventIdeas = [];
        for (const event of events) {
            if (event.attendees.length >= event.minAttendees) {
                filteredEventIdeas.push(event)
            }
        }
        res.json(filteredEventIdeas)
    } else if (req.body.type == "EventIdeas"){
        let filteredEvents = [];
        for (const event of events) {
            if (event.attendees.length < event.minAttendees) {
                filteredEvents.push(event)
            }
        }
        res.json(filteredEvents)
    }

   
}

async function getComments(req, res) {
    const event = await Event.findById(req.params.eventId)
    let eventComments = [];
    for (let i =0; i < event.comments.length; i++) {
        const comment = await Comment.findById(event.comments[i])
        eventComments.push(comment)
    }

    const events = await Event.find({})
    res.json(events)
}

async function addComment(req, res) {
    console.log("This is the req.body.commentData", req.body.commentData)
    console.log("this is the req.body.type", req.body.type)
    console.log("This is req.params.eventId", req.params.eventId)
    const event = await Event.findById(req.params.eventId)
    console.log('This is the event: ', event)
    console.log("This is the commentData user", req.body.commentData.user)


    const comment = await Comment.create({
        user: req.body.commentData.user,
        commentText: req.body.commentData.commentText
    })

    event.addCommentToEvent(comment);



            const updatedEvents = await Event.find({});

            if (req.body.type == "Events") {
                let filteredEventIdeas = [];
                for (const event of updatedEvents) {
                    if (event.attendees.length >= event.minAttendees) {
                        filteredEventIdeas.push(event);
                    }
                }
                res.json(filteredEventIdeas);
            } else if (req.body.type == "EventIdeas") {
                let filteredEvents = [];
                for (const event of updatedEvents) {
                    if (event.attendees.length < event.minAttendees) {
                        filteredEvents.push(event);
                    }
                }
                res.json(filteredEvents);
            }
            console.log("Updated Events", updatedEvents);
        
    
    
  

}

async function deleteComment(req, res) {
    

}