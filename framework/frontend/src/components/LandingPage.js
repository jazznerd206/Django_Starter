import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, } from "react-router-dom";
import { Button, ButtonGroup } from "@material-ui/core";
import JoinRoom from "./JoinRoom.js";
import CreateRoom from "./CreateRoom.js";
import Room from "./Room.js";

function LandingPage() {

    const [ roomCode, setRoomCode ] = useState(null);

    const clearRoomCode = () => {
        setRoomCode(null);
    }

    useEffect(() => {
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
            <div className="select-box">
                <h1>Be in the room.</h1>
                <div className="button"> 
                    <a href="/join">Join a Room</a>
                </div>
                <div className="button">
                    <a href="/create">Start a Room</a>
                </div>
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
            // component={renderPage}
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
