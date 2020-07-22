import React, { useState } from "react";
import { Grid, Card, Header, Container } from "semantic-ui-react";
import './Categories.css';
import { } from "react-router-dom";
import axios from "axios";
import MerchCards from "./Cards";

const Categories = ({ setMerchandise, merchandise }) => {

    const [displayCats, setDisplayCats] = useState(true)

    const handleClick = async (event, data) => {
        console.log('you clicked category:', data);
        const param = data.value;
        const res = await axios.get(`/api/merchandise/category/${param}`);
        console.log('returned merchandise?', res.data.data);
        setMerchandise(res.data.data);
        setDisplayCats(false);

    }

    return (
        displayCats ?
            <Grid>
                <Grid.Row columns={3}>
                    <Grid.Column>
                        <Card fluid value={3} name='hiking' onClick={handleClick} className='category' style={{ backgroundImage: `url('/resources/backpack_AZ.jpg')` }}>
                            <Header className='catHeader' inverted textAlign='center'>Hiking</Header>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card value={1} fluid style={{ height: '400px', backgroundImage: `url('/resources/climbing_snow.jpg')`, backgroundSize: 'cover' }} onClick={handleClick}>
                            <Header className='catHeader' inverted textAlign='center'>Clothing</Header>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card value={5} fluid style={{ height: '400px', backgroundImage: `url('/resources/tents_glow.jpg')`, backgroundSize: 'cover' }} onClick={handleClick}>
                            <Header className='catHeader' inverted textAlign='center'>Camping</Header>
                        </Card>
                    </Grid.Column>

                </Grid.Row>
                <Grid.Row columns={2}>
                    <Grid.Column width={8}>

                        <Container style={{ height: '400px', backgroundImage: `url('/resources/rock_man_clouds.jpg')`, backgroundSize: 'cover' }}>
                            <Header className='catHeader' inverted textAlign='center'>Climbing</Header>
                        </Container>


                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Card value={4} fluid style={{ height: '400px', backgroundImage: `url('/resources/kayak.jpeg')`, backgroundSize: 'cover' }} onClick={handleClick}>
                            <Header className='catHeader' inverted textAlign='center' >Sports</Header>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            :
            <Card.Group itemsPerRow={4} style={{ marginTop: '1em' }}>
                <MerchCards merchandise={merchandise} />
            </Card.Group>
    )
}

export default Categories;