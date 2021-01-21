import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import MusicPlayer from './MusicPlayer';


function Room2(props) {

    const [ song, setSong ] = useState({})
    const [ votesToSkip, setVotesToSkip ] = useState(2);
    const [ guestCanPause, setGuestCanPause ] = useState(false);
    const [ isHost, setIsHost ] = useState(false);
    const [ spotifyAuthenticated, setSpotifyAuthenticated ] = useState(false);
    const roomCode = props.match.params.roomCode;
    // console.log(roomCode);

    const authenticateSpotify = () => {
      fetch("/spotify/is-authenticated")
        .then((response) => response.json())
        .then((data) => {
          console.log('status from spot: ' + data.status);
          setSpotifyAuthenticated(data.status)
          if (!data.status) {
            fetch("/spotify/get-auth-url")
              .then((response) => response.json())
              .then((data) => {
                window.location.replace(data.url);
              });
          }
      });
    }


    const getRoomDetails = () => {
      return fetch("/api/get-room" + "?code=" + roomCode)
        .then((response) => {
          if (!response.ok) {
            props.leaveRoomCallback;
            props.history.push("/");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setVotesToSkip(data.votes_to_skip);
          setIsHost(data.is_host);
          setGuestCanPause(data.guest_can_pause);
        });
      }
    
    const getCurrentSong = () => {
      fetch("/spotify/current-song")
        .then((response) => {
          if (!response.ok) {
            return {};
          } else {
            return response.json();
          }
        })
        .then((data) => {
            console.log(data)
          setSong(data)
        });
      }


    const leaveButtonPressed = () => {
      const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
      };
      fetch("/api/leave-room", requestOptions).then((_response) => {
          props.leaveRoomCallback;
          props.history.push("/");
      });
    }

    useEffect(() => {
      getRoomDetails();
      if (isHost) {
        console.log('authenticate spot here')
        authenticateSpotify();
      }
      let interval = setInterval(getCurrentSong, 1000);
      return () => {
          clearInterval(interval);
      }
    }, [])

    useEffect(() => {
      if (isHost) {
        console.log('authenticate spot here')
        authenticateSpotify();
      }
    }, [isHost])
    
    return (
      <div className="room-container">
          <MusicPlayer {...song}/>
          <Grid item xs={12} align="center">
              <Button
                  variant="contained"
                  color="secondary"
                  onClick={leaveButtonPressed}
              >
                  Leave Room
              </Button>
          </Grid>
      </div>
    )
  }

export default Room2;
