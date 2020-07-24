import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Radio, Button, Modal, Grid, Segment, Dimmer, Loader, Image, Dropdown } from 'semantic-ui-react';
import faker from 'faker';
import _ from 'lodash';


const EditProfile = ({
    user,
    setEditMode,
    firstname,
    setFirstname,
    lastname,
    setLastname,
    street,
    setStreet,
    city,
    setCity,
    state,
    setState,
    zip,
    setZip,
    shipping,
    setShipping
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

    const addressDefinitions = faker.definitions.address;
    const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
        key: addressDefinitions.state_abbr[index],
        text: state,
        value: addressDefinitions.state_abbr[index],
    }));

    const handleStateChange = (e, param) => {
        console.log('Handle State Change', param.value);
        setState(param.value);
    };

    const handleShippingChange = (e, param) => {
        console.log('Handle Change', param.value)
        setShipping(param.value);
    };


    const toggleEditMode = (e) => {
        console.log('Toggle Edit Mode', e);
        setEditMode(false);
    };

    const editUserProfile = () => {
        console.log('Edit User Preferences is being called!');
        const { user_id } = user;
        axios.patch(`/api/userprefs/${user_id}`, { user_id, firstname, lastname, street, city, state, zip, shipping },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                console.log('New User Profile: ', res.data);
                const upUser = res.data.updatedUserInfo;
                const newPrefs = res.data.updatedUserPreferences;
                setFirstname(upUser.firstname);
                setLastname(upUser.lastname);
                setStreet(newPrefs.street);
                setCity(newPrefs.city);
                setState(newPrefs.state);
                setZip(newPrefs.zip);
                setShipping(newPrefs.shipping);
            })
            .then(() => toggleEditMode())
            .catch(error => {
                console.error('Error updating user preferences!', error);
            });
    };

    const editProfileButtonClick = (e,) => {
        console.log('Entered Edit Profile Click Handler!', e);
        setEditMode(true);
    };

    if (editMode === true) {
        return (
            <EditProfile
                user={user}
                setEditMode={setEditMode}
                editUserProfile={editUserProfile}
                firstname={firstname}
                setFirstname={setFirstname}
                lastname={lastname}
                setLastname={setLastname}
                street={street}
                setStreet={setStreet}
                city={city}
                setCity={setCity}
                state={state}
                setState={setState}
                zip={zip}
                setZip={setZip}
                shipping={shipping}
                setShipping={setShipping}
            />
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
                                <p>{street}</p>
                            </Segment>
                            <Segment.Group
                                horizontal
                                style={{
                                    backgroundColor: 'white'
                                }}
                            >
                                <Segment>
                                    <label>City:</label>
                                    <p>{city}</p>
                                </Segment>
                                <Segment>
                                    <label>State:</label>
                                    <p>{state}</p>
                                </Segment>
                                <Segment>
                                    <label>Zip Code:</label>
                                    <p>{zip}</p>
                                </Segment>
                            </Segment.Group>
                            <Segment>
                                <label>Preferred Shipping Method:</label>
                                <p>{shipping}</p>
                            </Segment>
                        </Segment.Group>
                        <Grid.Column
                            width={10}
                            style={{
                                height: '100%',
                                marginBottom: '1rem'
                            }}
                            >
                            <Segment.Group >
                                <Segment style={{ backgroundColor: 'olivedrab' }} >Payment Options
                                <Button
                                    icon='add'
                                    compact={true}
                                    size='mini'
                                    floated='right'
                                    onClick={addPaymentOption}
                                >
                                </Button>
                                {
                                    paymentModalShow
                                    ? <AddPaymentModal
                                        user={user}
                                        setUserPayments={setUserPayments}
                                        userPayments={userPayments}
                                        paymentModalShow={paymentModalShow}
                                        setPaymentModalShow={setPaymentModalShow} />
                                    : ''
                                }
                            </Segment>
                        {userPayments.length
                            ? <Payments
                            user={user}
                            userPayments={userPayments} />
                            : 
                            <Segment>You have no payment options on file!</Segment>
                        }
                        </Segment.Group>
                        </Grid.Column>

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








    // return (
    //     <div
    //         style={{
    //             backgroundColor: 'lightgrey'
    //         }}
    //     >
    //         <Grid celled='internally'>
    //             <Grid.Column
    //                 className='column-one'
    //                 width={3}
    //                 style={{
    //                     display: 'flex',
    //                     flexDirection: 'column',
    //                     alignItems: 'space-between'
    //                 }}
    //             >
    //                 <Grid.Row
    //                     style={{
    //                         height: '400px'
    //                     }}
    //                 >
    //                     <Image src='http://placeimg.com/400/400/nature' />
    //                 </Grid.Row>
    //                 <Grid.Row
    //                     style={{
    //                         height: '400px'
    //                     }}
    //                 >
    //                     <Image src='https://picsum.photos/400/400' />
    //                 </Grid.Row>
    //             </Grid.Column>

    //             <Grid.Column
    //                 width={10}
    //                 style={{
    //                     height: '100%'
    //                 }}
    //             >
    //                 <Segment.Group>
    //                     <Segment
    //                         style={{
    //                             backgroundColor: 'olivedrab',
    //                         }}
    //                     >
    //                         Edit Your Profile
    //                     </Segment>

    //                     <Segment>
    //                         <p> First Name:</p>
    //                         <Input
    //                             defaultValue={firstname}
    //                             onChange={event => setFirstname(event.target.value)}
    //                         >
    //                         </Input>
    //                     </Segment>
    //                     <Segment>
    //                         <p>Last Name:</p>
    //                         <Input
    //                             defaultValue={lastname}
    //                             onChange={event => setLastname(event.target.value)}
    //                         >
    //                         </Input>
    //                     </Segment>

    //                     <Segment>
    //                         <p>Street Address:</p>
    //                         <Input
    //                             defaultValue={street}
    //                             onChange={event => setStreet(event.target.value)}
    //                         >
    //                         </Input>
    //                     </Segment>

    //                     <Segment.Group
    //                         horizontal
    //                         style={{
    //                             backgroundColor: 'white'
    //                         }}
    //                     >
    //                         <Segment>
    //                             <p>City:</p>
    //                             <Input
    //                                 defaultValue={city}
    //                                 onChange={event => setCity(event.target.value)}
    //                             >
    //                             </Input>
    //                         </Segment>

    //                         <Segment>
    //                             <p>State:</p>
    //                             <Dropdown
    //                                 placeholder='State'
    //                                 defaultValue={state}
    //                                 style={{
    //                                     border: '1px solid black',
    //                                     borderRadius: '5px'
    //                                 }}
    //                                 search
    //                                 selection
    //                                 options={stateOptions}
    //                                 onChange={handleStateChange}
    //                             />
    //                         </Segment>

    //                         <Segment>
    //                             <p>Zip Code:</p>
    //                             <Input
    //                                 defaultValue={zip}
    //                                 onChange={event => setZip(event.target.value)}
    //                             >
    //                             </Input>
    //                         </Segment>
    //                     </Segment.Group>

    //                     <Segment>
    //                         <p>Preferred Shipping Method:</p>
    //                         <Radio
    //                             label='USPS'
    //                             value='USPS'
    //                             checked={shipping === 'USPS'}
    //                             onClick={handleShippingChange}
    //                             style={{ padding: '0 5px' }}
    //                         />
    //                         <Radio
    //                             label='UPS'
    //                             value='UPS'
    //                             checked={shipping === 'UPS'}
    //                             onClick={handleShippingChange}
    //                             style={{ padding: '0 5px' }}
    //                         />
    //                         <Radio
    //                             label='FedEx'
    //                             value='FedEx'
    //                             checked={shipping === 'FedEx'}
    //                             onClick={handleShippingChange}
    //                             style={{ padding: '0 5px' }}
    //                         />
    //                     </Segment>

    //                     <Segment
    //                         style={{
    //                             display: "flex",
    //                             justifyContent: 'flex-end'
    //                         }}
    //                     >
    //                         <Button
    //                             color='red'
    //                             style={{
    //                                 margin: '0 1px'
    //                             }}
    //                             onClick={toggleEditMode}
    //                         >
    //                             Cancel
    //                     </Button>
    //                         <Button
    //                             style={{
    //                                 backgroundColor: 'olivedrab',
    //                                 color: 'white',
    //                                 margin: '0 1px'
    //                             }}
    //                             onClick={editUserProfile}
    //                         >
    //                             Submit
    //                     </Button>
    //                     </Segment>
    //                 </Segment.Group>


    //             </Grid.Column>

    //             <Grid.Column width={3}>
    //                 <Grid.Row
    //                     style={{
    //                         height: '400px'
    //                     }}
    //                 >
    //                     <Image src='https://source.unsplash.com/400x400/?nature' />
    //                 </Grid.Row>
    //                 <Grid.Row
    //                     style={{
    //                         height: '400px'
    //                     }}
    //                 >
    //                     <Image src='https://loremflickr.com/g/400/400/forest' />
    //                 </Grid.Row>
    //             </Grid.Column>
    //         </Grid>
    //     </div>
    // )
}

export default EditProfile;