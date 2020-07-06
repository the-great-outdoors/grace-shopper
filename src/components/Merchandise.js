import React, {useState, useEffect} from  "react";
import {Card, Icon, Item, Image} from "semantic-ui-react";
import faker from "faker";
import axios from "axios";


const Merchandise = ({merchandise, setMerchandise})=>{

    console.log('Entered Component Merchandise: ', merchandise);

    useEffect(()=>{
        axios.get('/api/merchandise')
            .then((res)=>{

                const merch = res.data.merch;
                console.log('getallmerchandise:', merch);
                return setMerchandise(merch)
            })

    }, [])

    const extra = (
        <a>
          <Icon name='user' />
          16 Friends
        </a>
      )


    return(
        <Card.Group itemsPerRow={6}>
            {merchandise.map((item)=>{
               return(
                <Card key={item.merch_id}>
                  <Image src='https://media.self.com/photos/5b048339fb856d7d3d02375d/4:3/w_2560%2Cc_limit/first-backpacking-trip.jpg' size='mini' wrapped ui={false} />
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
                    <a>
                      <Icon name='user' />
                      {item.rating}
                    </a>
                  </Card.Content>
                </Card>
              )
            })}
        </Card.Group>

        
       

    )

}

export {Merchandise}

