import React, { Component, useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Link, Switch, useHistory } from "react-router-dom";
import { Menu, Segment, Input, Icon, Button, Container, Item, Select } from 'semantic-ui-react'

import {
  CreateUserModal,
  LoginModal,
  SearchBar
} from '../components';

const NavBar = ({
  results,
  setResults,
  login,
  setLogin,
  setUser,
  token,
  setToken,
  setSearchTerm
}) => {

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
    console.log('In Navbar link: ', name);
    setState({ activeItem: name });
    let path=`/${name}`;
    history.push(path);

  }

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
            <Icon inverted color='teal' name='facebook f' />
          </Menu.Item>
          <Menu.Item>
            <Icon inverted color='teal' name='twitter' />
          </Menu.Item>
          <Menu.Item>
            <Icon inverted color='teal' name='pinterest p' />
          </Menu.Item>
          <Menu.Item >
            <Icon inverted color='teal' name='snapchat ghost' />
          </Menu.Item>
      </Menu>
      <Menu fixed inverted pointing secondary size='large'>
        <Menu.Item>
          <SearchBar
            setSearchTerm={setSearchTerm}/>
        </Menu.Item>
        <Menu.Item position='right'>

          {loginShow ?
            <LoginModal
              loginShow={loginShow}
              loginSetShow={loginSetShow}
              login={login}
              setLogin={setLogin}
              setUser={setUser}
              token={token}
              setToken={setToken} />
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
              setUser={setUser}
              token={token}
              setToken={setToken} />
            : ''
          }
    
          <Button
            as='a'
            animated
            inverted
            style={{ marginLeft: '0.5em' }}
            onClick={registerButtonClick}
          >

            <Button.Content visible><Icon name='signup' /></Button.Content>
            <Button.Content hidden>Sign Up</Button.Content>
          </Button>
          <Button animated='vertical' inverted style={{ marginLeft: '0.5em' }} onClick = {() => {
            history.push('/wishlist');
          }}>
            <Button.Content hidden>Wishlist</Button.Content>
            <Button.Content visible><Icon name='gift' /></Button.Content>
          </Button>
          <Button animated='vertical' inverted style={{ marginLeft: '0.5em' }}>
            <Button.Content hidden>Shop</Button.Content>
            <Button.Content visible>
              <Icon name='shop' />
            </Button.Content>
          </Button>
        </Menu.Item>
      </Menu>
    </Segment>
  )

}

export default NavBar;