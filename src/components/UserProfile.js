import React, { useState, useEffect } from 'react';
import { Grid, Segment, Image, Button, Dimmer, Loader } from 'semantic-ui-react'
import axios from 'axios';
import './UserProfile.css'

import { EditProfile } from '../components';

const UserProfile = ({
    user,
    editMode,
    setEditMode,
    editUserProfile
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

    // const [editProfileShow, editProfileSetShow] = useState(false);

    console.log('Logged-in User: ', user);
    const { firstname, lastname, userPreferences } = user;

    console.log('User Preferences: ', userPreferences);


    const editProfileButtonClick = (e, data) => {
        console.log('Entered Edit Profile Click Handler!');
        setEditMode(true);
    };

    if (editMode === true) {

        return (

            <EditProfile
                user={user}
                setEditMode={setEditMode}
                editUserProfile={editUserProfile} />

        )

    } else {

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
                                {/* {editProfileShow ?
                                    <EditProfile
                                        editProfileShow={editProfileShow}
                                        editProfileSetShow={editProfileSetShow} />
                                    : ''
                                } */}
                            User Profile
                            <Button
                                    icon='edit'
                                    compact={true}
                                    size='mini'
                                    floated='right'
                                    onClick={editProfileButtonClick} >
                                </Button>
                            </Segment>

                            <Segment>
                                <label> First Name:</label>
                                <p>{firstname}</p>
                            </Segment>
                            <Segment>
                                <label> Last Name:</label>
                                <p>{lastname}</p>
                            </Segment>
                            <Segment>
                                <label>Street Address:</label>
                                <p>{user.userPreferences.street}</p>
                            </Segment>
                            <Segment.Group
                                horizontal
                                style={{
                                    backgroundColor: 'white'
                                }}
                            >
                                <Segment>
                                    <label>City:</label>
                                    <p>{user.userPreferences.city}</p>
                                </Segment>
                                <Segment>
                                    <label>State:</label>
                                    <p>{user.userPreferences.state}</p>
                                </Segment>
                                <Segment>
                                    <label>Zip Code:</label>
                                    <p>{user.userPreferences.zip}</p>
                                </Segment>
                            </Segment.Group>
                            <Segment>
                                <label>Preferred Shipping Method:</label>
                                <p>{user.userPreferences.shipping}</p>
                            </Segment>
                        </Segment.Group>

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

}

export default UserProfile;