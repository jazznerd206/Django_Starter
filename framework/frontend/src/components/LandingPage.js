import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, } from "react-router-dom";
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
            <div className="center landingPage">
                <h1>Welcome</h1>
            </div>
        )
    }


    return (
        <div className="center">
            <div className="landingPage">
                <h1>Welcome</h1>
            </div>
        {renderPage}
        <Router>    
            <Switch>
                {/* <Route
                    exact
                    path="/"
                    render={() => {
                    return this.state.roomCode ? (
                        <Redirect to={`/room/${}`} />
                    ) : (
                        this.renderHomePage()
                    );
                }}
                /> */}
                <Route 
                    path="/join" 
                    component={JoinRoom} 
                />
                <Route 
                    path="/create" 
                    component={CreateRoom} 
                />
                <Route
                    path="/room/:roomCode"
                    render={(props) => {
                    return <Room {...props} leaveRoomCallback={} />;
                }}
                />
            </Switch>
        </Router>
            
        </div>
    )
}

export default LandingPage;
