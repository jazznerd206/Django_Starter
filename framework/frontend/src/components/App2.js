import React from 'react';
import { render } from 'react-dom';
import LandingPage from "./LandingPage.js";

export default function App() {

    return (
        <div className="landingPage">
            <LandingPage />
        </div>
    )
}

const appDiv = document.getElementById('app');
render(<App />, appDiv); 