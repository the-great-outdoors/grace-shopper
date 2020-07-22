import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Sticky } from 'semantic-ui-react';
import axios from 'axios';

import {
    Categories,
    CreateUserModal,
    EditProfile,
    Hero,
    LoginModal,
    Merchandise,
    NavBar,
    SearchBar,
    ProductPage,
    UserProfile,
    Wishlist,
    AboutUsPage,
    Orders,
    Shipping,
    Stories
} from './components';

const App = () => {

    const [merchandise, setMerchandise] = useState([]);
    const [results, setResults] = useState([]);
    const [user, setUser] = useState({});
    const [login, setLogin] = useState(false);
    const [searchTerm, setSearchTerm] = useState({ value: '', category: '' });
    const [editMode, setEditMode] = useState(false);
    const [item, setItem] = useState({});
    const [cart, setCart] = useState([]);

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

    useEffect(() => {
        if (!cart || !cart.length) {

            const savedCart = JSON.parse(localStorage.getItem('activeCart'));
            console.log(savedCart);
            if (savedCart) {
                console.log('After parsing', savedCart);
                setCart(savedCart);
            }
        }
    }, [])

    return (
        <Router>
            <Sticky>
                <NavBar
                    setSearchTerm={setSearchTerm}
                    setLogin={setLogin}
                    login={login}
                    user={user}
                    setUser={setUser}
                    cart={cart} />
            </Sticky>
            <Switch>
                <Route path='/categories'>
                    <Categories
                        setMerchandise={setMerchandise}
                        merchandise={merchandise} />
                </Route>
                <Route path='/stories'>
                    <Stories />
                </Route>
                <Route path='/about'>
                    <AboutUsPage />
                </Route>
                <Route path='/userprofile'>
                    <UserProfile
                        user={user}
                        setUser={setUser}
                        editMode={editMode}
                        setEditMode={setEditMode} />
                </Route>
                <Route path="/productpage/:id">
                    <ProductPage
                        item={item}
                        setItem={setItem}
                        setCart={setCart}
                        cart={cart} />
                </Route>
                <Route path='/wishlist'>
                    <Wishlist
                        user={user} />
                </Route>
                <Route path='/orders'>
                    <Orders
                        cart={cart}
                        setCart={setCart}
                        user={user} />
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
                <Redirect from='/home' to='/' />
            </Switch>
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById("app"));