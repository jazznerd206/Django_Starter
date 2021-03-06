import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, } from "react-router-dom";
import { Button, ButtonGroup } from "@material-ui/core";
import RoomsView from './RoomsView.js'
import Join from "./Join.js";
import Room2 from "./Room2.js";
import CreateRoom2 from "./CreateRoom2.js";

function LandingPage() {

    const [ roomCode, setRoomCode ] = useState(null);
    const [ rooms, setRooms ] = useState([]);

    const clearRoomCode = () => {
        setRoomCode(null);
    }

    const fetchRooms = () => {
        fetch('/api/room')
            .then(response => response.json())
            .then(data => {
                if (!data) {
                    console.log('no data')
                }
                setRooms(data)
        })
    }

    useEffect(() => {
        fetchRooms();
        fetch("/api/user-in-room")
            .then((response) => response.json())
            .then((data) => {
                if(!data.code) {
                    console.log('no room')
                }
                setRoomCode(data.code)
        });
    }, [])


    const renderPage = () => {
        return (
            <div>
                <div className="select-box">
                    <h1>The Bassment Club</h1>
                    <div className="button"> 
                        <a href="/join">Join a Party</a>
                    </div>
                    <div className="button">
                        <a href="/newRoom">Start a Party</a>
                    </div>
                </div>
                <RoomsView rooms={rooms}/>
            </div>
        )
    }


    return (
        <Router>
            <Switch>
            <Route
                exact
                path="/"
                render={() => {
                    return roomCode ? (
                    <Redirect to={`/room/${roomCode}`} />
                    ) : (
                    renderPage()
                    );
                }}
                />
            <Route path="/join" component={Join} />
            <Route path="/newRoom" component={CreateRoom2} />
            <Route
                path="/room/:roomCode"
                render={(props) => {
                return <Room2 {...props} leaveRoomCallback={clearRoomCode} />;
                }}
            />
            </Switch>
        </Router>
    )
}

export default LandingPage;
