import React, { useState } from 'react';
// import { BrowserRouter as Router, Switch, Route, Link, Redirect, } from "react-router-dom";
// import JoinRoom from "./JoinRoom.js";
// import CreateRoom from "./CreateRoom.js";
// import Room from "./Room.js";

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
        <div className="center landingPage">
            <div className="">
                <h1>Welcome</h1>
            </div>
            {renderPage}    
        </div>
    )
}

export default LandingPage;
