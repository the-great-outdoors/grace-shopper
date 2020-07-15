import React, { useState} from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { ProductPage } from "./components/ProductPage";

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
    const [searchTerm, setSearchTerm] = useState({value:'',category:''});

    return (
        <Router>
            <div><Link to="/productpage">Product Page</Link></div>
            <Sticky>
              <NavBar 
                setSearchTerm={setSearchTerm}
                setLogin={setLogin}
                login={login}
                user={user}
                setUser={setUser}/>
            </Sticky>
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
            
            <Switch>
                <Route path='/categories'>
                    <Categories/>
                <Redirect from='/home' to='/'/>
                </Switch>
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById("app"));