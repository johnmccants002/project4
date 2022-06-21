import React from 'react';
import * as usersService from '../../utilities/users-service';
import { useState, useEffect } from 'react';
import NewEventForm from '../../components/NewEventForm/NewEventForm';
import { useNavigate } from 'react-router-dom';


export default function NewEventPage({user, setUser}) {
    const navigate = useNavigate()
    return (
        <>
        <NewEventForm user={user} navigate={navigate}/>
        </>
    );
}