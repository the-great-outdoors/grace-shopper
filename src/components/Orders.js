import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Step, List, Button, Icon, Segment, Grid, Label, Image, GridColumn } from "semantic-ui-react";
import Axios from "axios";
import { Shipping } from './Shipping';
import { ShippingEdit } from './ShippingEdit';
import { ShippingOptions } from "./ShippingOptions";
import { UserPayments } from './index';
import Payments from "./Payments";


const Orders = ({ cart, setCart, user, order, setOrder, userPayments, editMode, setEditMode }) => {

    const [splice, setSplice] = useState({});
    const [step, setStep] = useState('truck')

    const handleClick = (event, data) => {
        console.log('Entered step onclick:', data.name);
        setStep(data.name);
    }

    useEffect(() => {
        //check for logged in user.
        console.log('checking for active carts');
        if (user.user_id) {

            Axios.post(`/api/orders/cart`, { message: 'Im here!' }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then((res => {
                    console.log('retrieved active order:', res.data.orders.items)
                    return res.data.orders
                }))
                .then((data) => {
                    console.log('data:', data.items);
                    setOrder(data.orderId);
                    setCart(data.items);
                    localStorage.removeItem('activeCart');
                })
        } else {
            console.log('Guest user');
            const localCart = localStorage.getItem('activeCart');
            if (localCart) {
                setCart(JSON.parse(localCart));
                console.log('guest user. Items retrieved from memory:', localCart);
            }
        }

    }, [user.user_id]);

    const handleDelete = (event, data) => {
        console.log('from order:', data);

        const removeArrayElement = data.index;
        const itemId = data.id;

        if (user.user_id) {
            Axios.delete(`/api/orders/cart/${itemId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }, data: { order }
            })
                .then(data => {
                    console.log('Deleted item: ', data);
                })

        }
        const cartArray = [...cart];
        const deletedItem = cartArray.splice(removeArrayElement, 1);
        console.log('Items remaining:', cartArray);
        setCart(cartArray);
        setSplice(deletedItem);

    }


    const handleCheckout = async (event, target) => {
        event.preventDefault();
        if (!cart || !cart.length) {
            alert('Nothing in cart. Time to Splurge!')
            return;
        }
        console.log("entered order")
        const res = await Axios.patch('/api/orders/cart', { status: false, orderId: order }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        localStorage.removeItem('activeCart');
        console.log('order:', res);
        setCart([]);
        alert('Successfully placed order!');

    }

    return (
        <div style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '1rem' }}>
            <Step.Group>
                <Step active name='truck' onClick={handleClick}>
                    <Icon name='truck' />
                    <Step.Content>
                        <Step.Title>Shipping</Step.Title>
                        <Step.Description>Choose your shipping options</Step.Description>
                    </Step.Content>
                </Step>

                <Step name='payment' onClick={handleClick}>
                    <Icon name='payment' />
                    <Step.Content>
                        <Step.Title>Billing</Step.Title>
                        <Step.Description>Enter billing information</Step.Description>
                    </Step.Content>
                </Step>

                <Step name='info' onClick={handleClick}>
                    <Icon name='info' />
                    <Step.Content>
                        <Step.Title>Confirm Order</Step.Title>
                    </Step.Content>
                </Step>
            </Step.Group>
            <Grid columns={3}>
                <Grid.Row centered>
                    {cart.map((order, index) => {
                        return (
                            <Grid.Column key={index}>
                                <Segment padded>
                                    <Label attached='top'>{order.name}<Icon name='idea' size='large' /></Label>
                                    <p>Description: {order.description}</p>
                                    <p>Quantity: {order.quantity}</p>
                                    <p>Price: {order.price}</p>
                                    <p><Button Icon='delete' onClick={handleDelete} id={order.item_id} index={index}>Delete</Button></p>
                                </Segment>
                            </Grid.Column>
                        )
                    })
                    }
                </Grid.Row>
            </Grid>
            {
                step === 'truck'
                    ?
                    <ShippingOptions
                        style={{ marginTop: '1rem', marginBottom: '1rem' }}
                        user={user}
                        setStep={setStep}
                        editMode={editMode}
                        setEditMode={setEditMode}
                    />
                    :
                    step === 'payment'
                        ?
                        <GridColumn width={6}>
                            {/* <Button animated compact={true}
                                size='mini'
                                floated='right'
                                onClick={e => setStep('review')}>
                                <Button.Content visible>Next</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='thumbs up' />
                                </Button.Content>
                            </Button> */}
                                    <Payments
                                        setStep={setStep} 
                                        editMode={editMode} 
                                        setEditMode={setEditMode} 
                                        user={user} />
                        </GridColumn>
                        :
                        <Button content='Confirm Order' style={{ marginTop: '1rem', textAlign: 'center' }} positive size='massive' icon animated onClick={handleCheckout}>
                    </Button>}
        </div>
    )
}

export default Orders;
