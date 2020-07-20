import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Step, List, Button, Icon, Segment, Dimmer, Loader, Image} from "semantic-ui-react";
import Axios from "axios";

const Orders = ({cart, setCart})=>{

   
useEffect(()=>{
    if (!cart.length || !cart) {
        
        const savedCart= localStorage.getItem('activeCart');
         if (savedCart) {
             setCart(savedCart);
         }else{
             setCart([]);
         }
     }
},[])
   
    const [splice, setSplice]=useState({});

const steps= [
        {
          key: 'shipping',
          icon: 'truck',
          title: 'Shipping',
          description: 'Choose your shipping options',
        },
        {
          key: 'billing',
          active: true,
          icon: 'payment',
          title: 'Billing',
          description: 'Enter billing information',
        },
        { key: 'confirm', disabled: true, icon: 'info', title: 'Confirm Order' },
      ]

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

            const res = await Axios.post('/api/orders', {userId:1,status:true});

            console.log('order:', res);

            const orderId = res.data.order.orderId;
            console.log(orderId);

            cart.map(async(item)=>{

                const {merchId, quantity, price} = item;

                const orderItem = await Axios.post(`/api/orders/${orderId}`,{merchId, quantity, price});
                console.log('new order item:', orderItem);
                return orderItem;
            })
         
      }

      console.log('new cart:', cart);
    return (
        <>
        {!cart?<div>NO CART FOR YOU</div>:
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
                    <Button icon='delete' onClick={handleDelete} id={index}>Delete</Button>
                </List.Item>
             )
                 })
             }  
        </List>
}
         <Button animated onClick={handleCheckout}>
                <Button.Content visible>Next</Button.Content>
                <Button.Content hidden>
                    <Icon name='arrow right' />
        </Button.Content>
        </Button>
        <Step.Group items={steps} />
        
        </>
    )
}

export default Orders;
