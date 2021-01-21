import React, { useState } from 'react'

function CreateRoom2() {

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
    // ========= RENDER CREATE/UPDATTE BUTTONS =====================
    // =============================================================
    const renderCreateButtons = () => {
        return (
          <Grid container spacing={1}>
            <Grid item xs={12} align="center">
              <Button
                color="primary"
                variant="contained"
                onClick={handleRoomButtonPressed}
              >
                Create A Room
              </Button>
            </Grid>
            <Grid item xs={12} align="center">
              <Button color="secondary" variant="contained" to="/" component={Link}>
                Back
              </Button>
            </Grid>
          </Grid>
        );
    }
    const renderUpdateButtons = () => {
        return (
          <Grid item xs={12} align="center">
            <Button
              color="primary"
              variant="contained"
              onClick={this.handleUpdateButtonPressed}
            >
              Update Room
            </Button>
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
        <div>
            
        </div>
    )
}

export default CreateRoom2;
