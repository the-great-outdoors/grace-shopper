import React, { useState, useEffect } from 'react';
import { Grid, Segment, Image } from 'semantic-ui-react'
import axios from 'axios';
import './UserProfile.css'

const UserProfile = ({
    user,
}) => {

    // const [preferences, setPreferences] = useState();

    console.log('Logged-in User: ', user);
    const { firstname, lastname, userPreferences } = user;

    console.log('UUUUU', userPreferences);
    // console.log('STREET', street);
    // console.log('Logged-in User Preferences: ', user.userPreferences);

    // useEffect(() => {
    //     console.log('Getting Logged-in User Preferences!');
    //     axios.get(`api/userprefs/${ user_id }`, { user_id })
    //         .then(res => {
    //             console.log('Please be the logged-in user preferences!', res.data.userPreferences);
    //             const data = res.data.userPreferences;
    //             console.log('User Preferences?', data);

    //             setPreferences(data);
    //             console.log('State preferences', preferences);
    //         })
    //         // .then(() => console.log('User Preferences?', preferences))
    //         .catch(error => console.error(error));

    // }, [user_id]);

    if (!user.user_id) {
        return <div>Loading...</div>;
    }


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
                            User Profile
                        </Segment>
                        {/* <Segment.Group> */}
                        <Segment>
                            <p> First Name:</p>
                            <p>{firstname}</p>
                        </Segment>
                        <Segment>
                            <p> Last Name:</p>
                            <p>{lastname}</p>
                        </Segment>
                        <Segment>
                            <p>Street Address:</p>
                            <p>{user.userPreferences.street}</p>
                        </Segment>
                        {/* </Segment.Group> */}
                        <Segment.Group
                            horizontal
                            style={{
                                backgroundColor: 'white'
                            }}
                        >
                            <Segment>
                                <p>City:</p>
                                <p>{user.userPreferences.city}</p>
                            </Segment>
                            <Segment>
                                <p>State:</p>
                                <p>{user.userPreferences.state}</p>
                            </Segment>
                            <Segment>
                                <p>Zip Code:</p>
                                <p>{user.userPreferences.zip}</p>
                            </Segment>
                        </Segment.Group>
                        <Segment>
                            <p>Preferred Shipping Method:</p>
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

export default UserProfile;