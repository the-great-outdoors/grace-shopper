import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Step, List, Button, Icon, Segment, Dimmer, Loader, Image } from "semantic-ui-react";
import Axios from "axios";
import { Shipping } from './Shipping';
import { ShippingEdit } from './ShippingEdit';
import { ShippingOptions } from "./ShippingOptions";
import Payments from './Payments';

const Orders = ({ cart, setCart, user }) => {

    const [splice, setSplice] = useState({});
    const [step, setStep] = useState('truck')
    const handleClick = (event, data) => {
        console.log('Entered step onclick:', data.name);
        setStep(data.name);
    }

    const handleDelete = (event, data) => {
        console.log('handleDelete clicked. Target:', event.target, 'data:', data);
        const removeElement = data.id;
        const cartArray = cart;
        const deletedItem = cartArray.splice(removeElement, 1);
        console.log('Items remaining:', cartArray);
        setCart(cartArray);
        setSplice(deletedItem);

    }


    const handleCheckout = async (event, target) => {
        event.preventDefault();

        const res = await Axios.post('/api/orders', { userId: 1, status: true });

        console.log('order:', res);

        const orderId = res.data.order.orderId;
        console.log(orderId);

        cart.map(async (item) => {

            const { merchId, quantity, price } = item;

            const orderItem = await Axios.post(`/api/orders/${orderId}`, { merchId, quantity, price });
            console.log('new order item:', orderItem);
            return orderItem;
        })

    }

    console.log('new cart:', cart);
    return (
        !cart ? <div>NO CART FOR YOU</div> :
            <>
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
                <List divided relaxed>
                    {cart.map((order, index) => {
                        return (

                            <List.Item key={index}>
                                <List.Icon name='idea' size='large' verticalAlign='middle' />
                                <List.Content>
                                    <List.Header>{order.name}</List.Header>
                                    <List.Description>{order.description}</List.Description>
                                    <List.Description>{order.quantity}</List.Description>
                                    <List.Description>{order.price}</List.Description>
                                </List.Content>
                                <Button Icon='delete' onClick={handleDelete} id={index}>Delete</Button>
                            </List.Item>
                        )
                    })
                    }
                </List>
                {step === 'truck' ?
                    <ShippingOptions
                        user={user}
                        setStep={setStep}
                    /> :
                    step === 'payment' ?
                        <Payments user={user} setStep={setStep} /> :
                        <Button size='massive' icon animated onClick={handleCheckout}>
                            <Icon size='massive' name='free code camp' />
                        </Button>}
            </>
    )
}

export default Orders;
