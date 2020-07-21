import React, { Component, useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Link, Switch, useHistory } from "react-router-dom";
import { Menu, Segment, Input, Icon, Button, Container, Item, Select } from 'semantic-ui-react'

import {
  CreateUserModal,
  LoginModal,
  SearchBar,
  UserProfile,
} from '../components';

const NavBar = ({
  results,
  setResults,
  login,
  setLogin,
  setUser,
  setSearchTerm,
  cart
}) => {

  const [quantity, setQuantity] = useState('');
  
  useEffect(()=>{
    // setQuantity(cart.length);
     setQuantity(cart.length);
  }, [cart.length])


  const [state, setState] = useState({ activeItem: 'home' });
  const history = useHistory();
  const [registerShow, registerSetShow] = useState(false);
  const [loginShow, loginSetShow] = useState(false);

  const options = [
    { key: 'all', text: 'All', value: 'all' },
    { key: 'clothing', text: 'clothing', value: 'clothing' },
    { key: 'climbing', text: 'climbing', value: 'climbing' },
    { key: 'hiking', text: 'hiking', value: 'hiking' },
    { key: 'sports', text: 'sports', value: 'sports' },
    { key: 'camping', text: 'camping', value: 'camping' },
  ]

  const handleItemClick = (e, { name }) => {
    e.preventDefault();
    console.log('In Navbar link: ', name);
    setState({ activeItem: name });
    let path = `/${name}`;
    history.push(path);
  };

  const registerButtonClick = (e, data) => {
    console.log('Entered Register Button Click Handler!');
    registerSetShow(true);
  };

  const loginButtonClick = (e, data) => {
    console.log('Entered Login Button Click Handler!');
    loginSetShow(true);
  };

  const logoutButtonClick = (e, data) => {
    console.log('Entered Logout Button Click Handler!');
    setLogin(false);
    setUser({});
    handleItemClick(e, name = 'home');
    localStorage.clear('token');
  };

  return (
    <Segment inverted>
      <Menu inverted pointing secondary>
        <Menu.Item
          name='home'
          active={state.activeItem === 'home'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='categories'
          active={state.activeItem === 'categories'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='stories'
          active={state.activeItem === 'stories'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='about'
          active={state.activeItem === 'about'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='contact us'
          active={state.activeItem === 'contact us'}
          onClick={handleItemClick}
        />

        <Menu.Item position='right'>
          <a href='https://www.facebook.com'><Icon inverted color='teal' name='facebook f' /></a>
        </Menu.Item>
        <Menu.Item>
          <a href='https://twitter.com/explore'><Icon inverted color='teal' name='twitter' /></a>
        </Menu.Item>
        <Menu.Item>
          <a href='https://www.pinterest.com/'><Icon inverted color='teal' name='pinterest p' /></a>
        </Menu.Item>
        <Menu.Item >
          <a href='https://www.snapchat.com/'><Icon inverted color='teal' name='snapchat ghost' /></a>
        </Menu.Item>


      </Menu>
      <Menu inverted pointing secondary size='large'>
        <Menu.Item>
          <SearchBar
            setSearchTerm={setSearchTerm} />
        </Menu.Item>
        <Menu.Item position='right'>

          {loginShow ?
            <LoginModal
              loginShow={loginShow}
              loginSetShow={loginSetShow}
              login={login}
              setLogin={setLogin}
              setUser={setUser} />
            : ''
          }

          {!login ?
            <Button
              as='a'
              inverted
              animated
              primary
              onClick={loginButtonClick}
            >
              <Button.Content visible>Log In</Button.Content>
              <Button.Content hidden><Icon name='user circle' /></Button.Content>
            </Button> :
            <Button
              as='a'
              inverted
              name='home'
              active={state.activeItem === 'home'}
              onClick={logoutButtonClick}
            >
              Log Out
            </Button>
          }

          {registerShow ?

            <CreateUserModal
              registerShow={registerShow}
              registerSetShow={registerSetShow}
              setLogin={setLogin}
              setUser={setUser} />
            : ''
          }

          {!login ?
            <Button
              as='a'
              animated
              inverted
              style={{ marginLeft: '0.5em' }}
              onClick={registerButtonClick}
            >

              <Button.Content visible><Icon name='signup' /></Button.Content>
              <Button.Content hidden>Sign Up</Button.Content>
            </Button> :
            <Button
              as='a'
              inverted
              style={{ marginLeft: '0.5em' }}
              name='userprofile'
              active={state.activeItem === 'userprofile'}
              onClick={handleItemClick}
            >
              Profile
          </Button>
          }
          <Button animated='vertical' inverted style={{ marginLeft: '0.5em' }} onClick={() => {
            history.push('/wishlist');
          }}>
            <Button.Content hidden>Wishlist</Button.Content>
            <Button.Content visible><Icon name='gift' /></Button.Content>
          </Button>
        {cart.length? <Button name='orders' inverted style={{marginLeft:'0.5em'}} onClick={handleItemClick} Icon='shop'>
            <Button.Content visible>
              <span><Icon name='shop' /></span>
              {quantity}
            </Button.Content>
        </Button>:
          <Button name='orders' animated='vertical' inverted style={{ marginLeft: '0.5em' }} onClick={handleItemClick}>
            <Button.Content hidden>Cart</Button.Content>
            <Button.Content visible>
              <Icon name='shop' />
            </Button.Content>
          </Button>}
        </Menu.Item>
      </Menu>
    </Segment>
  )

}

export default NavBar;