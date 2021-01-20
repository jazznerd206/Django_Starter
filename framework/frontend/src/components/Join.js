import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';


function Join() {

    const [ roomCode, setRoomCode ] = useState('');
    const [ error, setError ] = useState('');

    const handleTextFieldChange = (e) => {
        setRoomCode(e.target.value)
    }

    const roomButtonPressed = () => {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: roomCode,
          }),
        };
        fetch("/api/join-room", requestOptions)
          .then((response) => {
            if (response.ok) {
              props.history.push(`/room/${this.state.roomCode}`);
            } else {
              setError("Room not found.");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }

    
    return (
        <div>
            <Grid 
                item 
                xs={12} 
                align="center"
            >
              <Button 
                variant="contained" 
                color="secondary" 
                to="/" 
                component={Link}
            >
                Back
              </Button>
            </Grid>
        </div>
    )
}

export default Join
