import React from 'react';

function ActiveRoom(props) {
    // console.log(props)
    return (
        <div className="active-room">
            <p>{props.code}</p>
        </div>
    )
}

export default ActiveRoom;