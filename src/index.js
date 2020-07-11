import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {
    CreateUserModal
} from './components';
import { Merchandise } from "./components/Merchandise";
import { NavBar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SearchBar } from './components/SearchBar';


const App = () => {

    const [merchandise, setMerchandise] = useState([]);
    const [results, setResults] = useState([]);

    return (
        <Router>
            <Hero
                results={results}
                setResults={setResults} />
            <Merchandise
                merchandise={merchandise}
                setMerchandise={setMerchandise} />
        </Router>

    )
}

ReactDOM.render(<App />, document.getElementById("app"));