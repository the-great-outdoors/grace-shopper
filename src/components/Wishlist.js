
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Card, Icon, Item, Image, Rating, Segment, Loader, Dimmer, Container, Header } from "semantic-ui-react";
import axios from 'axios';

import { MerchCards } from '../components';

const Wishlist = ({ user }) => {

  if (!user.user_id) {
    // return <div>
    //   <Segment>
    //     <Dimmer active inverted>
    //       <Loader inverted active>Loading</Loader>
    //     </Dimmer>

    //     <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    //   </Segment>
    // </div>;
  }

  const { user_id } = user;

  const history = useHistory();

  const [wishlist, setWishlist] = useState([]);

  const handleSelect = async (e, data) => {
    history.push(`/wishlist/${data.id}`);

  }

  useEffect(() => {

    if (user_id) {

      axios.get(`/api/wishlist/${user_id}`)
        .then(res => {
          const list = res.data.wishlistItem;
          setWishlist(list);
        })
        .catch(error => console.error("wishlist error", error))

    }

  }, [])

  return (
    user.user_id && wishlist ?
      <Container
        style={{
          backgroundColor: 'lightgrey',
          height: '100vh',
          width: '100vw'
        }}>
        <Container fluid>
          <Container style={{
            background: 'purple',
            height: '150px',
            width: '100vw',
            backgroundImage: `url('/resources/hammocks.jpg')`,
            backgroundSize: 'cover',
          }}>
            <Header inverted color='orange' textAlign='center' style={{ fontFamily: 'Ultra', fontSize: '5rem', paddingTop: '25px' }}>Wishlist for {user.username}</Header>
          </Container>
        </Container>
        <Card.Group itemsPerRow={10} style={{ padding: '.75em .75em', display: 'flex', justifyContent: 'center' }}>
          <MerchCards
            merchandise={wishlist}
          />
        </Card.Group>
      </Container>
      :
      <>
        <Container fluid>
          <Container style={{
            background: 'purple',
            height: '100vh',
            width: '100vw',
            backgroundImage: `url('/resources/hammocks.jpg')`,
            backgroundSize: 'cover',
          }}>
            <Header inverted color='orange' textAlign='center' style={{ fontFamily: 'Ultra', fontSize: '5rem', paddingTop: '25px' }}>Login Required to View Wishlists</Header>
          </Container>
        </Container>
      </>
  )

}

export default Wishlist;