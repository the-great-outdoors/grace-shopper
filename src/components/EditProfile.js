import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Radio, Button, Modal, Grid, Segment, Dimmer, Loader, Image } from 'semantic-ui-react';
import faker from 'faker';
import _ from 'lodash';

import './EditProfile.css';

const EditProfile = ({
    user,
    setUser,
    editMode,
    setEditMode
}) => {

    if (!user.user_id) {
        return <div>
            <Segment>
                <Dimmer active inverted>
                    <Loader inverted>Loading</Loader>
                </Dimmer>
                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
            </Segment>
        </div>;
    };

    // const [firstname, setFirstname] = useState("");
    // const [lastname, setLastname] = useState("");
    // const [streetAddress, setStreetAddress] = useState("");
    // const [city, setCity] = useState("");
    // const [state, setState] = useState("");
    // const [zip, setZip] = useState("");
    // const [shipping, setShipping] = useState('USPS');


    console.log('Logged-in User: ', user);
    const { firstname, lastname, userPreferences } = user;

    const addressDefinitions = faker.definitions.address
    const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
        key: addressDefinitions.state_abbr[index],
        text: state,
        value: addressDefinitions.state_abbr[index],
    }));


    const handleChange = (e, param) => {
        console.log('Handle Change', param.value)
        setShipping(param.value)
    };

    const toggleEditMode = (e, data) => {
        console.log('Toggle Edit Mode', data);
        setEditMode(false);
    };

    const editUserProfile = () => {
        console.log('In edit user preferences!!')

        console.log('Edit User Preferences is being called!');
        axios.patch(`/api/userprefs/${user.user_id}`, { firstname, lastname, street: streetAddress, city, state, zip, shipping })
            .then(res => {
                console.log('New User Profile: ', res.data);
                setUser(res.data.user);
            })
            .catch(error => {
                console.error('Error updating user preferences!', error);
            });
    };

    return (

        <div
            style={{
                backgroundColor: 'lightgrey'
            }}
        >
            <Grid celled='internally'>
                <Grid.Column
                    className='column-one'
                    width={3}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'space-between'
                    }}
                >
                    <Grid.Row
                        style={{
                            height: '400px'
                        }}
                    >
                        <Image src='http://placeimg.com/400/400/nature' />
                    </Grid.Row>
                    <Grid.Row
                        style={{
                            height: '400px'
                        }}
                    >
                        <Image src='https://picsum.photos/400/400' />
                    </Grid.Row>
                </Grid.Column>

                <Grid.Column
                    width={10}
                    style={{
                        height: '100%'
                    }}
                >
                    <Segment.Group>
                        <Segment
                            style={{
                                backgroundColor: 'olivedrab',
                            }}
                        >
                            Edit Your Profile
                        </Segment>

                        <Segment>
                            <p> First Name:</p>
                            <Input
                                defaultValue={firstname}>
                            </Input>
                        </Segment>
                        <Segment>
                            <p>Last Name:</p>
                            <Input
                                defaultValue={lastname}
                            >
                            </Input>
                        </Segment>

                        <Segment>
                            <p>Street Address:</p>
                            <Input
                                defaultValue={user.userPreferences.street}
                            >
                            </Input>
                        </Segment>

                        <Segment.Group
                            horizontal
                            style={{
                                backgroundColor: 'white'
                            }}
                        >
                            <Segment>
                                <p>City:</p>
                                <Input
                                    defaultValue={user.userPreferences.city}
                                >
                                </Input>
                            </Segment>

                            <Segment>
                                <p>State:</p>
                                <Input
                                    defaultValue={user.userPreferences.state}
                                >
                                </Input>
                            </Segment>

                            <Segment>
                                <p>Zip Code:</p>
                                <Input
                                    defaultValue={user.userPreferences.zip}
                                >
                                </Input>
                            </Segment>
                        </Segment.Group>

                        <Segment>
                            <p>Preferred Shipping Method:</p>
                            <Input
                                defaultValue={user.userPreferences.shipping}
                            >
                            </Input>
                        </Segment>
                    </Segment.Group>

                    <Segment>
                        <Button
                            onClick={toggleEditMode}
                        >Cancel</Button>
                        <Button>Submit</Button>
                    </Segment>

                </Grid.Column>

                <Grid.Column width={3}>
                    <Grid.Row
                        style={{
                            height: '400px'
                        }}
                    >
                        <Image src='https://source.unsplash.com/400x400/?nature' />
                    </Grid.Row>
                    <Grid.Row
                        style={{
                            height: '400px'
                        }}
                    >
                        <Image src='https://loremflickr.com/g/400/400/forest' />
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default EditProfile;