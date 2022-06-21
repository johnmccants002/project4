import React from 'react';
import './Profile.css'
import Card from 'react-bootstrap/Card'
export default function Profile({user, setUser}) {

    return (
        <Card>
        <h4>Email: {user.email}</h4>
        <h4>Name: {user.name}</h4>

        </Card>
        
        
    )
}