
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Card, Icon, Item, Image, Rating } from "semantic-ui-react";
import axios from 'axios';

import { MerchCards } from '../components';

const Wishlist = ({ user }) => {

  if (!user.user_id) {
    return <div>
      <Segment>
        <Dimmer active inverted>
          <Loader inverted active>Loading</Loader>
        </Dimmer>

        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
      </Segment>
    </div>;
  };

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
      <Card.Group itemsPerRow={4} style={{ marginTop: '1em' }}>
        <MerchCards
          merchandise={wishlist}
        />
      </Card.Group>
      :
      <div>
        <h1> "Guest Users cannot have a wishlist. Or if you are logged in please create a wishlist to proceed." </h1>
      </div>
  )

}

export default Wishlist;