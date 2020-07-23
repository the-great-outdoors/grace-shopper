
import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import { Card, Icon, Item, Image, Rating } from "semantic-ui-react";
import axios from 'axios';

const Wishlist = ({ user }) => {
    const { user_id } = user;

    const history=useHistory();

    const [wishlist, setWishlist] = useState([]);
  
    const handleSelect = async (e, data) => {
      history.push(`/wishlist/${data.id}`);
  
    }
  
    useEffect(() => {
      
      if (user_id) {

          axios.get(`/api/wishlist/${ user_id }`, {user_id})
        .then(res => {
          const list = res.data.wishlistitem;
          setWishlist(list);
        })
        .catch(error => console.error("wishlist error", error)) 
       
    } 
        
},[])

    return ( 
      user.user_id && wishlist ? 
      <Card.Group itemsPerRow={4} style={{ marginTop: '1em' }}>
        {wishlist.map((item) => {
          return (
            <Card onClick={handleSelect} key={item.merch_id} id={item.merch_id}>
              <Image src='http://placeimg.com/300/300/nature' wrapped ui={false} />
              <Card.Content>
                <Card.Header>{item.name}</Card.Header>
                <Card.Meta>
                  {item.price}
                </Card.Meta>
                <Card.Description>
                  {item.description}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Rating icon='star' defaultRating={3} maxRating={4} />
              </Card.Content>
            </Card>
          )
        })}
      </Card.Group>
      : <div>
      <h1> "Guest Users cannot have a wishlist. Or if you are logged in please create a wishlist to proceed." </h1>
      </div>
    )
  
  }
  
  export default Wishlist;