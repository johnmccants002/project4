import React from 'react';
import * as eventsAPI from '../../utilities/events-api'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CommentsList from '../CommentsList/CommentsList'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import * as usersAPI from '../../utilities/users-api';
import moment from 'moment'

export default function EventIdeasItem({event, index, setEventIdeas, user}) {
    const navigate = useNavigate()
    const [newComment, setNewComment] = useState('')
    const [isAttending, setIsAttending] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const [commentButtonTitle, setCommentButtonTitle] = useState('View Comments')
    const [comments, setComments] = useState([])
    const type = "EventIdeas"
    const [attendeeCount, setAttendeeCount] = useState(event.attendees.length)
    

    async function setupComments() {
        let fetchedComments = [];
        for (const comment of event.comments) {
            console.log("This is the comment in loop setupComments: ", comment)
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
       const events = await eventsAPI.attendEvent(event._id, type)
       setEventIdeas(events)


     
       event = await events.find(x => x._id == event._id)
       setIsAttending(event.attendees.includes(user._id) ? true : false)
 
   
       
    }



    async function handleDelete() {
        const events = await eventsAPI.deleteEvent(event._id, type);
        setEventIdeas(events)

        
    }

    function handleCommentChange(event) {
        setNewComment(event.target.value);
    }

    async function addComment() {
        
        const commentData = {
            user: user._id,
            commentText: newComment
        }
       
        
        const updatedEvents = await eventsAPI.addComment(event._id, commentData, type)
        console.log("Updated Events: ", updatedEvents)
        setNewComment('')
        
        setEventIdeas(updatedEvents)
        setTimeout(() => {
            console.log("These are the comments: ", event.comments)
            const newEvent = updatedEvents.find(x => x._id == event._id)
            setupComments()
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
    <p>Details: {event.eventDetails}</p>
    <p>People needed to make happen: {event.attendees.length} / {event.minAttendees}</p>
    <p>Projected Date: {moment(event.eventDate).format('MMM DD, YYYY')}</p>

    {setupDeleteButton()}

    {(event.comments.length > 0) ?
            <button onClick={viewComments}>{commentButtonTitle} ({event.comments.length})</button> : <></> }
        
    
    {showComments ? <CommentsList comments={comments} user={user}/> : <></>}
    
    

    <Button onClick={handleUpdate}>{isAttending ? "Already Down" : "I'm down"}</Button>


    </Card.Body>

    <form onSubmit={addComment}>
        <label>
          <input type="text" value={newComment} onChange={handleCommentChange} />
        </label>
        <input type="submit" value="Add Comment" disabled={!newComment.length > 0}/>
      </form>
    


      </Card>
    </div>)
}