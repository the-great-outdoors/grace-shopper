import React, { useState, useEffect } from "react";
import { Card, Icon, Item, Image, Rating } from "semantic-ui-react";
import axios from "axios";
import MerchCards from "./Cards";


const Merchandise = ({ merchandise, setMerchandise, searchTerm }) => {

  useEffect(() => {

    if (searchTerm.value.length) {

      try {
        axios.post('/api/merchandise/search', searchTerm)
          .then((res) => {
            const results = res.data.data;
            if (results) {
              setMerchandise(results);
            }
          })


      } catch (error) {
        throw error;
      }

    } else {
      try {
        axios.get('/api/merchandise')
          .then((res) => {
            const merch = res.data.merch;
            return setMerchandise(merch)
          })
      } catch (error) {
        throw error;
      }

    }

  }, [searchTerm])

  return (
    <Card.Group itemsPerRow={4} style={{ marginTop: '1em' }}>
      {merchandise ? <MerchCards merchandise={merchandise} /> :
        ''}
    </Card.Group>

  )

}

export default Merchandise;