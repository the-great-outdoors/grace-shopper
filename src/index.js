import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import {
    CreateUserModal
} from './components';
import { Merchandise } from "./components/Merchandise";
import { NavBar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SearchBar } from './components/SearchBar';
import Categories from './components/Categories'


const App = () => {

    const [merchandise, setMerchandise] = useState([]);
    const [searchTerm, setSearchTerm] = useState({value:'',category:''});

    return (
        <Router>
            
            <Switch>
                <Route path='/categories'>
                    <Categories/>
                </Route>
                <Route exact path='/'>
                <Hero
                    setSearchTerm={setSearchTerm}/>
                
                <Merchandise
                    searchTerm={searchTerm}
                    merchandise={merchandise}
                    setMerchandise={setMerchandise} />
                </Route>
                <Redirect from='/home' to='/'/>
            </Switch>
        </Router>

    )
}

ReactDOM.render(<App />, document.getElementById("app"));