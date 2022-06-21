import { Link } from 'react-router-dom';
import * as usersService from '../../utilities/users-service';
import { useState, useEffect } from 'react';
import Profile from '../../components/Profile/Profile'

export default function ProfilePage({user, setUser}) {

    return (
        <main>
            <Profile user={user} setUser={setUser}/>
        </main>
    );
}