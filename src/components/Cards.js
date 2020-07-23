import React, { } from "react";
import { Card, Rating, Icon, Item, Image, Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const MerchCards = ({ merchandise }) => {


  const history = useHistory();

  const handleSelect = async (e, data) => {
    e.preventDefault();
    console.log('entered handle select', data.id);
    history.push(`/productpage/${data.id}`);
  }

  return (
    merchandise.map((item) => {
      return (
        <Card onClick={handleSelect} key={item.merch_id} id={item.merch_id}>
          <Image src='http://placeimg.com/300/300/nature' wrapped ui={false} />
          <Card.Content>
            <Card.Header>{item.name}</Card.Header>
            <Card.Meta>
              ${item.price}
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
    })
  )
}

export default MerchCards;