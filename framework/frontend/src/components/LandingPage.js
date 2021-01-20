import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, } from "react-router-dom";
import { Button, ButtonGroup } from "@material-ui/core";
import RoomsView from './RoomsView.js'
import JoinRoom from "./JoinRoom.js";
import CreateRoom from "./CreateRoom.js";
import Room from "./Room.js";

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
                    <h1>Be where the tunes are</h1>
                    <div className="button"> 
                        <a href="/join">Join a Room</a>
                    </div>
                    <div className="button">
                        <a href="/newRoom">Start a Room</a>
                    </div>
                </div>
                <RoomsView rooms={rooms}/>
            </div>
        )
    }


    return (
    <Router>
        <div className="container">
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
          <Route path="/join" component={JoinRoom} />
          <Route path="/create" component={CreateRoom} />
          <Route
            path="/room/:roomCode"
            render={(props) => {
              return <Room {...props} leaveRoomCallback={clearRoomCode} />;
            }}
          />
        </Switch>
        </div>
      </Router>
    )
}

export default LandingPage;
