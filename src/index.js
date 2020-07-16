import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import {Sticky} from 'semantic-ui-react';
import axios from 'axios';

import {
    CreateUserModal,
    Hero,
    LoginModal,
    Merchandise,
    NavBar,
    SearchBar,
    ProductPage,
    Categories
} from './components';

const App = () => {

    const [merchandise, setMerchandise] = useState([]);
    const [results, setResults] = useState([]);
    const [user, setUser] = useState({});
    const [login, setLogin] = useState(false);
    const [searchTerm, setSearchTerm] = useState({value:'',category:''});

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && token.length) {
            axios.post('/api/users/token', { token })
                .then(res => {
                    if (res.data.user_id) {
                        setUser(res.data);
                        setLogin(true);
                    }
                })
                .catch(error => console.error(error));
        }
    }, []);

    return (
        <Router>
<<<<<<< HEAD
            <Route path = '/' exact= {true}>
            <Hero
                results={results}
                setResults={setResults} 
            />
            <Merchandise
                merchandise={merchandise}
                setMerchandise={setMerchandise} 
            />
            </Route>
            <Route path = '/wishlist'>
                <NavBar
                    results={results}
                    setResults={setResults}
                />
            </Route>
        </Router>
=======
            <Sticky>
              <NavBar 
                setSearchTerm={setSearchTerm}
                setLogin={setLogin}
                login={login}
                user={user}
                setUser={setUser} />
            </Sticky>
            <Switch>
                <Route path='/categories'>
                    <Categories />
                </Route>
                <Route path="/productpage/:id">    
                    <ProductPage />  
                </Route>
                <Route path='/'>
                    <Hero
                        results={results}
                        setResults={setResults} />
                    <Merchandise
                        merchandise={merchandise}
                        setMerchandise={setMerchandise}
                        searchTerm={searchTerm} />
                </Route>
>>>>>>> 2283edabc791f219775caf5743b6a530aefc8575

                <Redirect from='/home' to='/'/>
            </Switch>          
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById("app"));