import React, { Component, useState, useEffect } from "react";

import { Menu, Segment, Icon, Button, Container, Item, Select } from 'semantic-ui-react'

import { SearchBar } from './SearchBar';
import CreateUserModal from './CreateUserModal';


const NavBar = ({
  setMerchandise
}) => {

  const [state, setState] = useState({ activeItem: 'home' });
  const [login, setLogin] = useState(false);
  const [show, setShow] = useState(false);

  const options = [
    { key: 'all', text: 'All', value: 'all' },
    { key: 'tents', text: 'tents', value: 'tents' },
    { key: 'climbing', text: 'climbing', value: 'climbing' },
    { key: 'hiking', text: 'hiking', value: 'hiking' },
    { key: 'sports', text: 'sports', value: 'sports' },
    { key: 'camping', text: 'camping', value: 'camping' },
  ]


  const handleItemClick = (e, { name }) => setState({ activeItem: name });
  const registerButtonClick = (e, data) => {
    console.log("Entered Register Button Click Handler!");
    setShow(true);
  };

  console.log('Entered navbar.js component');

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
        <Container>
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
        </Container>
      </Menu>
      <Menu fixed inverted pointing secondary size='large'>
        <Menu.Item>
          <SearchBar
            setMerchandise={setMerchandise}/>
        </Menu.Item>
        <Menu.Item position='right'>
          {!login ?
            <Button as='a' inverted animated primary>
              <Button.Content visible>Log In</Button.Content>
              <Button.Content hidden><Icon name='user circle' /></Button.Content>
            </Button> :
            <Button as='a' inverted>
              Log Out
            </Button>
          }
          {show ?
            <CreateUserModal
              show={show}
              setShow={setShow} />
            : ''
            }

          <Button as='a' animated inverted style={{ marginLeft: '0.5em' }} onClick={registerButtonClick}>
            <Button.Content visible><Icon name='signup' /></Button.Content>
            <Button.Content hidden>Sign Up</Button.Content>
          </Button>
          <Button animated='vertical' inverted style={{ marginLeft: '0.5em' }}>
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

export { NavBar };