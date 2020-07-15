import React, { useState} from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Categories from './components/Categories'
import {Sticky} from 'semantic-ui-react';

import {
    CreateUserModal,
    Hero,
    LoginModal,
    Merchandise,
    NavBar,
    SearchBar
} from './components';

const App = () => {

    const [merchandise, setMerchandise] = useState([]);
    const [results, setResults] = useState([]);
    const [user, setUser] = useState({});
    const [login, setLogin] = useState(false);
    const [token, setToken] = useState('');

    // const loggedIn = JSON.parse(localStorage.getItem('token'));
    const [searchTerm, setSearchTerm] = useState({value:'',category:''});

    return (
        <Router>
            <Sticky>
              <NavBar 
                setSearchTerm={setSearchTerm}
                setLogin={setLogin}
                login={login}
                user={user}
                setUser={setUser}/>
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