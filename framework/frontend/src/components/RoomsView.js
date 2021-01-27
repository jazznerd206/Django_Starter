import React from 'react';
import ActiveRoom from './ActiveRoom.js';

function RoomsView(props) {

    // console.log(props.rooms)
    return (
        <div className="view-container">
            <div className="view-title">
                <h3>Available Parties</h3>
            </div>
            <div className="view-grid">
                {props.rooms ? (props.rooms.map(room => (
                    <ActiveRoom 
                        key={room.id}
                        code={room.code}
                    ></ActiveRoom>
                )))
                :
                (
                    null
                )}
            </div>
        </div>
    )
}

export default RoomsView;