import React from 'react';
import { render } from 'react-dom';
import LandingPage from "./LandingPage.js";

export default function App() {

    const renderPage = () => {
        return(
            <h1>Lander</h1>
        )
    }
    return (
        <div className="landingPage">
            {renderPage()}
        </div>
    )
}

 const appDiv = document.getElementById('app');
render(<App />, appDiv);