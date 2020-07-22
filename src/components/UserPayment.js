import React from 'react';
import { Grid, Segment, Button } from 'semantic-ui-react'
import Axios from 'axios';

const Payments = ({ user, userPayments }) => {
    // const { firstname, lastname } = user;

    const deletePaymentOption = (event, data) => {
        console.log('handleDelete clicked. Target:', event.target, 'data:', data);
        const removeElement=data.id;
        console.log(removeElement);
    }
        return(

            <Grid.Column
                width={10}
                style={{
                    height: '100%',
                    marginBottom: '1rem'
                }}
            >
            {
                userPayments.map((payment, foo) => {
                    return(
                        <Segment.Group >
                            <Segment
                                style={{
                                    backgroundColor: 'olivedrab',
                                }}
                            >
                            Payment Options
                            <Button
                                    id={foo}
                                    icon='trash alternate outline'
                                    compact={true}
                                    size='mini'
                                    floated='right'
                                    onClick={deletePaymentOption}
                                >
                                </Button>
                            </Segment>
                            <Segment>
                                <label>Card Type:</label>
                                <p>Visa</p>
                            </Segment>
                            <Segment>
                                <label> Full Name:</label>
                            <p>{ payment.name }</p>
                            </Segment>
                            <Segment>
                                <label>Card Number:</label>
                                <p>{payment.number}</p>
                            </Segment>
                            <Segment.Group
                                horizontal
                                style={{
                                    backgroundColor: 'white'
                                }}
                            >
                                <Segment>
                                    <label>CID:</label>
                                    <p>{payment.cid}</p>
                                </Segment>
                                <Segment>
                                    <label>Expiration:</label>
                                    <p format='mm/yy'>{payment.expiration}</p>
                                </Segment>
                            </Segment.Group>
                            <Segment>
                                <label>Billing Address:</label>
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
                        </Segment.Group>
                    )
                })
            }
                
            </Grid.Column>
        )
}
export default Payments;