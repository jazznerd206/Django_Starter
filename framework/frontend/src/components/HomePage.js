import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import CreateRoom from "./CreateRoom.js";
import JoinRoom from "./JoinRoom.js";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/"><p>THis iS tHe hOmePaGe</p></Route>
                    <Route path="/newRoom" component={CreateRoom} />
                    <Route path="/join" component={JoinRoom} />
                </Switch>
            </Router>
        )
    }
}
