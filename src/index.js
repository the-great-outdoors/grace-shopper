import React, { useState, useEffect } from "react";

import ReactDOM from "react-dom";

import { Merchandise } from "./components/Merchandise"

import {NavBar} from "./components/Navbar"

import {Hero} from "./components/Hero"

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Jumbotron } from "react-bootstrap";

const App =()=>{

    const [merchandise, setMerchandise]= useState([]);

    return(
        <Router>
            <Hero/>
            <Merchandise
            merchandise={merchandise}
            setMerchandise={setMerchandise}/>
        </Router>

    )
}

ReactDOM.render(<App/>, document.getElementById("app"));