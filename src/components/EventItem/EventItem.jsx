import React from 'react';
import * as eventsAPI from '../../utilities/events-api'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CommentsList from '../CommentsList/CommentsList'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import * as usersAPI from '../../utilities/users-api';
import moment from 'moment'


export default function EventItem({event, index, setEvents, user}) {
    const navigate = useNavigate()
    const [newComment, setNewComment] = useState('')
    const [isAttending, setIsAttending] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const [commentButtonTitle, setCommentButtonTitle] = useState('View Comments')
    const [comments, setComments] = useState([])


    async function setupComments(event) {
        let fetchedComments = [];
        for (const comment of event.comments) {
            const commentUser = await usersAPI.getUserInfo(comment.user)
            let newComment = {
                commentText: comment.commentText,
                user: commentUser
            }
            console.log('This is the comment in setup Comments', newComment)
            fetchedComments.push(newComment)
        }
        setComments(fetchedComments)
    }

    async function checkAttending() {
        setIsAttending(event.attendees.includes(user._id) ? true : false)
    }



    useEffect(function () {

        checkAttending()

        setupComments()

        
    }, [])
    
  

    async function handleUpdate() {
        const type = "Events"
        const events = await eventsAPI.attendEvent(event._id, type)
        setEvents(events)
        let updatedEvent = events.find(x => x._id == event._id)
        checkAttending()
        
    }



    async function handleDelete() {
        const type = "Events"
        const events = await eventsAPI.deleteEvent(event._id, type);
        setEvents(events)

        
    }

    function handleCommentChange(event) {
        setNewComment(event.target.value);
    }

    async function addComment() {
        const commentData = {
            user: user._id,
            commentText: newComment
        }
        const type = "Events"

        const events = await eventsAPI.addComment(event._id, commentData, type)
        setNewComment('')
        setEvents(events)
        setTimeout(() => {
            console.log("These are the comments: ", event.comments)
            const newEvent = events.find(x => x._id == event._id)
            setupComments(newEvent)
          }, 100);
    }

    function viewComments() {
        if (commentButtonTitle == 'View Comments') {
            setShowComments(true)
            setCommentButtonTitle('Hide Comments')

        } else if(commentButtonTitle == 'Hide Comments') {
            setShowComments(false)
            setCommentButtonTitle('View Comments')
        }
        


    }


    function setupDeleteButton() {
        if (event.user == user._id) {
            return <button className="deleteButton" onClick={handleDelete}>Delete</button>
        } else {
            console.log("Event user does not equal user")
        }
    }


    return (<div>
    <Card>
        <Card.Body>
    <h4>{event.eventTitle}</h4>
    <div className="eventDetails">
    <p>Details: {event.eventDetails}</p>
    <p>Attendees: {event.attendees.length}</p>
    <p>Event Date: {moment(event.eventDate).format('MMM DD, YYYY')}</p>
    </div>

    {setupDeleteButton()}

    {(event.comments.length > 0) ?
            <button onClick={viewComments}>{commentButtonTitle} ({event.comments.length})</button> : <></> }
        
    
    {showComments ? <CommentsList comments={comments} user={user}/> : <></>}
    
    

    {isAttending ? <Button onClick={handleUpdate} >Attending</Button> : <Button onClick={handleUpdate}>Attend</Button>}


    </Card.Body>

    <form onSubmit={addComment}>
        <label>
          <input type="textArea" value={newComment} onChange={handleCommentChange} />
        </label>
        <input type="submit" value="Add Comment" disabled={!newComment.length > 0} />
      </form>
    


      </Card>
    </div>)
}