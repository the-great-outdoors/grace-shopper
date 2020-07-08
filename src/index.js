import React, { useState, useEffect } from "react";

import ReactDOM from "react-dom";

import { Merchandise } from "./components/Merchandise"

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const App =()=>{

    const [merchandise, setMerchandise]= useState([]);

    return(
        <Router>
            
            <div>
            <h1>Howdy pardner</h1>
            </div>
        </Router>

    )
}

ReactDOM.render(<App/>, document.getElementById("app"));