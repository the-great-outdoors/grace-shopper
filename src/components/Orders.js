import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Step, List, Button, Icon, Segment, Dimmer, Loader, Image} from "semantic-ui-react";
import Axios from "axios";
import {Shipping} from './Shipping';
import {ShippingEdit} from './ShippingEdit';
import { ShippingOptions } from "./ShippingOptions";
import Payments from './Payments';

const Orders = ({cart, setCart, user, order, setOrder})=>{
   
    const [splice, setSplice]=useState({});
    const [step, setStep]=useState('truck')

    const handleClick=(event, data)=>{
        console.log('Entered step onclick:', data.name);
        setStep(data.name);
    }

    useEffect(()=>{
        //check for logged in user.
        if (user.user_id) {
            //check for active cart
            Axios.get('/api/orders/cart')
                .then((res=>{
                    console.log('retrieved active order:', res.data.Orders)
                    return res.data.orders
                }))
                .then((data)=>{
                    console.log('data:', data);
                })
        }else{
            
        }

    },[]);

      const handleDelete= (event, data)=>{
        console.log('handleDelete clicked. Target:', event.target, 'data:', data);
        const removeElement=data.id;
        const cartArray = cart;
        const deletedItem = cartArray.splice(removeElement, 1);
        console.log('Items remaining:', cartArray);
        setCart(cartArray);
        setSplice(deletedItem);

      }

    
      const handleCheckout= async(event, target)=>{
          event.preventDefault();

          console.log('order number:', order);
          if (order) {
              const res = await Axios.patch(`/api/orders/${order}`, {status:false})
              console.log('Placed order:', res.data.payment);
          }

          alert('Successfully placed order!');
         
      }

      console.log('new cart:', cart);
    return (
        !cart?<div>NO CART FOR YOU</div>:
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
         {cart.map((order, index)=>{
             return(
                 
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
        {step==='truck'?
        <ShippingOptions 
            user={user}
            setStep={setStep}
        />:
        step==='payment'?
        <Payments user={user} setStep={setStep}/>:
        <Button size='massive' icon animated onClick={handleCheckout}>
                <Icon size='massive' name='free code camp' />
        </Button>}
        </>
    )
}

export default Orders;
