import React, { useState} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Merchandise } from "./components/Merchandise";
import { NavBar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import Categories from './components/Categories'
import {Sticky} from 'semantic-ui-react';


const App = () => {

    const [merchandise, setMerchandise] = useState([]);
    const [searchTerm, setSearchTerm] = useState({value:'',category:''});

    return (
        <Router>
            <Sticky>
            <NavBar setSearchTerm={setSearchTerm}/>
            </Sticky>
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