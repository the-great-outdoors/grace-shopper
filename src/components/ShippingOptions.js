import React, { useState, useEffect } from "react";
import { Grid, Segment, Button, Input, Dropdown, Dimmer, Loader, Image } from "semantic-ui-react";
import { ShippingEdit } from './ShippingEdit';
import { Shipping } from '../components';

const ShippingOptions = ({ user, setStep }) => {
    const [editMode, setEditMode] = useState(false);
    const [shippingInfo, setShipping] = useState({});

    // if (!user.user_id) {
    //     return <div>
    //         <Segment>
    //             <Dimmer active inverted>
    //                 <Loader inverted active>Loading</Loader>
    //             </Dimmer>

    //             <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    //         </Segment>
    //     </div>;
    // };

    useEffect(() => {
        if (user.user_id) {
            console.log('setting setShipping');
            const { firstname, lastname, userPreferences: { street, city, state, zip, shipping } } = user;

            setShipping({ firstname, lastname, street, city, state, zip, shipping });
        } else {
            console.log('guest user');
        }

    }, []);



    return (

        user

            ?

            <Grid>
                {
                    editMode ?
                        <ShippingEdit user={user} setShipping={setShipping} shippingInfo={shippingInfo}
                            setEditMode={setEditMode} /> :
                        <Shipping setStep={setStep} shippingInfo={shippingInfo} setEditMode={setEditMode} />
                }
            </Grid >

            :

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
                                name='firstname'

                                onChange={handleInput}
                            >
                            </Input>
                        </Segment>
                        <Segment>
                            <p>Last Name:</p>
                            <Input
                                name='lastname'

                                onChange={handleInput}
                            >
                            </Input>
                        </Segment>

                        <Segment>
                            <p>Street Address:</p>
                            <Input
                                name='street'

                                onChange={handleInput}
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
                                    name='city'

                                    onChange={handleInput}
                                >
                                </Input>
                            </Segment>

                            <Segment>
                                <p>State:</p>
                                <Dropdown
                                    name='state'
                                    placeholder='State'

                                    style={{
                                        border: '1px solid black',
                                        borderRadius: '5px'
                                    }}
                                    search
                                    selection
                                    options={stateOptions}
                                    onChange={handleInput}
                                />
                            </Segment>

                            <Segment>
                                <p>Zip Code:</p>
                                <Input
                                    name='zip'

                                    onChange={handleInput}
                                >
                                </Input>
                            </Segment>
                        </Segment.Group>

                        <Segment>
                            <p>Preferred Shipping Method:</p>
                            <Dropdown options={shipOptions} onChange={handleSelect} />
                        </Segment>
                    </Segment.Group>

                    <Segment>
                        <Button
                            onClick={e => setEditMode(false)}
                        >
                            DONE
                            </Button>
                    </Segment>

                </Grid.Column>

                <Grid.Column width={3}>

                </Grid.Column>
            </Grid>

    )

}

export { ShippingOptions };