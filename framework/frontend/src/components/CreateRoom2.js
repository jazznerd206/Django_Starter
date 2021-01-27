import React, { useState } from 'react';
import { Button, Grid, Typography, TextField, Collapse, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import Alert from "@material-ui/lab/Alert";
import { Link } from 'react-router-dom';

function CreateRoom2(props) {

    const [ guestCanPause, setGuestCanPause ] = useState(false);
    const [ votesToSkip, setVotesToSkip ] = useState(2);
    const [ errorMsg, setErrorMsg ] = useState('');
    const [ successMsg, setSuccessMessage ] = useState('');
    const [ update, setUpdate ] = useState(false);
    const [ roomCode, setRoomCode ] = useState(null);

    const title = update ? "Update Room" : "Create a Room";
    const updateCallback = () => {};

    // IDEALLY EACH OF THE FOLLOWING SECTIONS WILL BE BROKEN OUT 
    // INTO ITS OWN COMPONENT TO INCREASE REUSABILITY AND TESTABILITY
    // =============================================================
    // ============== RENDER CREATE/UPDATTE BUTTONS ================
    // =============================================================
    const renderCreateButtons = () => {
        return (
          <Grid container spacing={1}>
            <Grid item xs={12} align="center">
              <div
                className="button"
                onClick={handleRoomButtonPressed}
              >
                <a>Create A Room</a>
              </div>
            </Grid>
            <Grid item xs={12} align="center">
                <div className="button">
                    <a href="/">
                        Back
                    </a>
                </div>
            </Grid>
          </Grid>
        );
    }
    const renderUpdateButtons = () => {
        return (
          <Grid item xs={12} align="center">
            <div
              onClick={handleUpdateButtonPressed}
            >
              Update Room
            </div>
          </Grid>
        );
    }
    // =============================================================
    // ================ ON CLICK FUNCTIONS =========================
    // =============================================================
    const handleRoomButtonPressed = () => {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            votes_to_skip: votesToSkip,
            guest_can_pause: guestCanPause,
          }),
        };
        fetch("/api/create-room", requestOptions)
          .then((response) => response.json())
          .then((data) => props.history.push("/room/" + data.code));
    }
    const handleUpdateButtonPressed = () => {
        const requestOptions = {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            votes_to_skip: votesToSkip,
            guest_can_pause: guestCanPause,
            code: roomCode,
          }),
        };
        fetch("/api/update-room", requestOptions).then((response) => {
            if (response.ok) {
                console.log('yay')
                setSuccessMessage("We updated the room!! Head on back.")
            } else {
                console.log('oops')
                setErrorMsg("Oops!! We couldn't update the room. Are you sure you have permission?")
            }
            updateCallback();
        });
      }
    // =============================================================
    // ================ STATE MANAGEMENT ===========================
    // =============================================================
    const handleVotesChange = e => {
        setVotesToSkip(e.target.value)
    }
    const handleGuestCanPauseChange = e => {
        setGuestCanPause(e.target.value === true ? true : false)
    }


    return (
        <div className="new-container">
            <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Collapse
                in={errorMsg != "" || successMsg != ""}
                >
                {successMsg != "" ? (
                    <Alert
                    severity="success"
                    onClose={() => {
                        setSuccessMessage('');
                    }}
                    >
                    {successMsg}
                    </Alert>
                ) : (
                    <Alert
                    severity="error"
                    onClose={() => {
                        setErrorMsg('');
                    }}
                    >
                    {errorMsg}
                    </Alert>
                )}
                </Collapse>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                {title}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                <FormHelperText>
                    <div align="center">Guest Control of Playback State</div>
                </FormHelperText>
                <RadioGroup
                    row
                    defaultValue={guestCanPause.toString()}
                    onChange={handleGuestCanPauseChange}
                >
                    <FormControlLabel
                    value={"true"}
                    control={<Radio color="primary" />}
                    label="Play/Pause"
                    labelPlacement="bottom"
                    />
                    <FormControlLabel
                    value="false"
                    control={<Radio color="secondary" />}
                    label="No Control"
                    labelPlacement="bottom"
                    />
                </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                <TextField
                    required={true}
                    type="number"
                    onChange={handleVotesChange}
                    defaultValue={votesToSkip}
                    inputProps={{
                    min: 1,
                    style: { textAlign: "center" },
                    }}
                />
                <FormHelperText>
                    <div align="center">Votes Required To Skip Song</div>
                </FormHelperText>
                </FormControl>
            </Grid>
            {update
                ? renderUpdateButtons()
                : renderCreateButtons()}
            </Grid>
        </div>
    )
}

export default CreateRoom2;