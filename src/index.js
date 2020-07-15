import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import {
    CreateUserModal
} from './components';
import { Merchandise } from "./components/Merchandise";
import { NavBar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SearchBar } from './components/SearchBar';
import { ProductPage } from "./components/ProductPage";

const App = () => {

    const [merchandise, setMerchandise] = useState([]);
    const [results, setResults] = useState([]);

    return (
        <Router>
            <div><Link to="/productpage">Product Page</Link></div>
            <NavBar
                    results={results}
                    setResults={setResults} />
            <Switch>
                <Route path="/productpage">    
                    <ProductPage />  
                </Route>
                <Route path='/'>
                    <Hero
                        results={results}
                        setResults={setResults} />
                    <Merchandise
                        merchandise={merchandise}
                        setMerchandise={setMerchandise} />
                </Route>
            </Switch>  
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById("app"));