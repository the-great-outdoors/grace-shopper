import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
            <Hero
                results={results}
                setResults={setResults} 
                // username={username}
                // setUsername={setUsername}
                // hashpassword={hashpassword}
                // setHashpassword={setHashpassword}
                setLogin={setLogin}
                login={login}
                user={user}
                setUser={setUser}
                token={token}
                setToken={setToken} />
                setSearchTerm={setSearchTerm}/>
            <Merchandise
                searchTerm={searchTerm}
                merchandise={merchandise}
                setMerchandise={setMerchandise} />
        </Router>

    )
}

ReactDOM.render(<App />, document.getElementById("app"));