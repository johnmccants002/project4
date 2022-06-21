
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
    try {
        const event = await Event.create(req.body.formData);
        const events = await Event.find({})
        res.json(events)

    } catch(err) {
        console.log("error creating event: ", err);
        res.status(400).json(err);
    }

}

async function getEvents(req, res) {
    const events = await Event.find({})

    res.json(events)
}

async function attendEvent(req, res) {
    const event = await Event.findById(req.params.eventId)
    if (event.attendees.indexOf(req.user._id) > -1) {     
        let newAttendees = [];
        for (i = 0; i < event.attendees.length; i++) {
            if (event.attendees[i] !== req.user._id) {
                newAttendees.push(event.attendees[i])
            }
        }
        event.attendees = newAttendees
        event.save()
    

    } else {
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
    const event = await Event.findById(req.params.eventId)

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
}

async function deleteComment(req, res) {
    

}