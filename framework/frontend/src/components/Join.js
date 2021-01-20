import React, { useState, useEffect } from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';


function Join(props) {

    const [ roomCode, setRoomCode ] = useState('');
    const [ error, setError ] = useState('');

    const handleTextFieldChange = (e) => {
        setRoomCode(e.target.value)
    }
    
    console.log(roomCode)
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
              props.history.push(`/room/${roomCode}`);
            } else {
              setError("Room not found.");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }

    
    return (
        <div className="join-code">
            <Grid 
                item 
                xs={12} 
                align="center">
              <TextField
                autoFocus
                color="secondary"
                error={error}
                label="Code"
                placeholder="Enter a Room Code"
                value={roomCode}
                id="text-field"
                helperText={error}
                variant="outlined"
                onChange={e => handleTextFieldChange(e)}
              />
            </Grid>
            <Grid 
                item 
                xs={12} 
                align="center">
              <Button
                variant="contained"
                color="primary"
                onClick={roomButtonPressed}
              >
                Enter Room
              </Button>
            </Grid>
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
