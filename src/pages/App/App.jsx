import './App.css';
import { getUser } from '../../utilities/users-service';
import { useState } from 'react';
import { Route, Routes } from 'react-router';
import AuthPage from '../AuthPage/AuthPage';
import EventIdeasPage from '../EventIdeasPage/EventIdeasPage';
import EventsPage from '../EventsPage/EventsPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import NewEventPage from '../NewEventPage/NewEventPage';
import NavBar from "../../components/NavBar/NavBar";


export default function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main className="App">
        { user ?
        <>
        <NavBar user={user} setUser={setUser}/>
          <Routes>
            <Route path="/events/new" element={<NewEventPage user={user} setUser={setUser} />} />      
            <Route path="/events" element={<EventsPage user={user} setUser={setUser}/>} />
            <Route path="/profile" element={<ProfilePage user={user} setUser={setUser}/>} />
            <Route path="/eventIdeas" element ={<EventIdeasPage user={user} setUser={setUser}/>} />
          
            </Routes>

        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}

