import React from "react";
import {Grid,Container, Card, Header} from "semantic-ui-react";
import './Categories.css';

const Categories=(props)=>{

    return(
        <Grid>
            <Grid.Row columns={3}>
            <Grid.Column>
                    <Container className='category' style={{ backgroundImage:`url('/resources/backpack_AZ.jpg')`}}>
                        <Header className='catHeader' inverted textAlign='center'>Hiking</Header>
                    </Container>
                </Grid.Column>
                <Grid.Column>
                    <Container style={{ height: '400px', backgroundImage:`url('/resources/climbing_snow.jpg')`, backgroundSize:'cover'}}>
                    <Header className='catHeader' inverted textAlign='center'>Clothing</Header>
                    </Container>
                </Grid.Column>
                <Grid.Column>
                    <Container style={{ height: '400px', backgroundImage:`url('/resources/tents_glow.jpg')`, backgroundSize:'cover'}}>
                    <Header className='catHeader' inverted textAlign='center'>Camping</Header>
                    </Container>
                </Grid.Column>
                
            </Grid.Row>
            <Grid.Row columns={2}>
                <Grid.Column width={8}>
                
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )

}

export default Categories;