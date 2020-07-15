import React, { useState, useEffect } from 'react';
import { Image, Segment, Grid, Header, Rating, Divider, Button, Input, Breadcrumb } from 'semantic-ui-react';
import { SideBySideMagnifier } from 'react-image-magnifiers';
import axios from 'axios';

const ProductPage = (props) => {

    const sections = [
        { key: 'Home', content: 'Home', link: true },
        { key: 'Store', content: 'Store', link: true },
        { key: 'Backpack', content: 'Backpack', active: true },
    ]

   return(
    <>   
        <Breadcrumb icon='right angle' sections={sections} style={{ marginTop: '3rem', marginLeft: '3rem' }} />
       <div style={{ marginTop: '5rem',  }}>
            <Grid centered style={{ marginLeft: '5rem' }} >
                <Grid.Column width={8} style={{ marginRight: '1rem' }}>
                    <SideBySideMagnifier imageSrc='/resources/backpack_AZ.jpg' imageAlt='Example' alwaysInPlace />
                </Grid.Column>
                <Grid.Column width={3} textAlign='right' > 
                    <Header as='h1'>Backpack</Header>
                    <Header as='h5' color='grey' >Item #123456</Header>
                    <Rating defaultRating={4} maxRating={5}></Rating>
                    <Header as='h1' >$150.00</Header>
                    <Header as='h1'>Look at this cool backpack!!</Header>
                    <Input type='number' style={{ marginBottom: '1rem' }}></Input>
                    <Button size='huge'
                        color='teal'
                        icon='cart'
                        content='Checkout - $150.00' 
                    />
                    <Button basic style={{ marginTop: '1rem' }}>Add to wishlist</Button>
                </Grid.Column>
            </Grid>
            <Grid centered>
                <Grid.Column textAlign='center' style={{ marginTop: '3rem' }}>
                    <h1>Blogs rendering soon!</h1>
                    <Divider />
                    <h1>Blogs rendering soon!</h1>
                    <Divider />
                    <h1>Blogs rendering soon!</h1>
                    <Divider />
                </Grid.Column>
            </Grid>
        </div>
    </>    
   )
}

export { ProductPage };