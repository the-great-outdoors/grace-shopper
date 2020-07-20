import React, { useState, useEffect } from 'react';
import { Grid, Header, Rating, Divider, Button, Input, Breadcrumb} from 'semantic-ui-react';
import { SideBySideMagnifier } from 'react-image-magnifiers';
import axios from 'axios';
import { useParams, useHistory} from 'react-router-dom';
import './ProductPage.css';

const ProductPage = ({item, setItem}) => {

    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState('');
    const [cart, setCart] = useState('');
    const [addItem, setAddItem] = useState(false);
    const { id } = useParams();

    const history = useHistory();

    const handleClick = (event, data)=>{
        let path =`/${data.name}`;
        history.push(path);
    }

    useEffect(()=>{
        try {
            axios.get(`/api/merchandise/search/${id}`)
            .then(res=>{
                const {data:merch} = res;
                setItem(merch.merch);
            })
            
        } catch (error) {
            throw error;
        }
        
    }, []);

    const AddItem=async()=>{
       const qty = quantity;
       const price = item.price;
       const basket = qty*item.price;
        setTotal(basket);

        if(!cart){
        const res = await axios.post('/api/orders', { 
            userId: 1,
            status: true,
            price,
            merchId:item.merch_id,
            quantity
        })
            const newOrder = res.data.orderItem;
             console.log('New Order Num:', newOrder);
             setCart(newOrder);
    }
        if (cart) {
            const res = await axios.post(`/api/orders/`, { 
                userId: 1,
                price,
                merchId:item.merch_id,
                quantity,
                orderId:cart.orderId});
                const newOrderItem = res.data.orderItem;
                setCart(newOrderItem);
                console.log('New item created:', newOrderItem);
            };

            setAddItem(true);
        }

        const removeItem=async(event, data)=>{

            try {
                const res = await axios.delete(`/api/orders/cart/${cart.item_id}`, {data:{orderId: cart.orderId, item_id:cart.item_id}});
                setAddItem(false);
                return res;

            } catch (error) {
                throw error; 
            }
            
        }

    const registerChange = (e, data)=>{
        const qty=data.value;
        setQuantity(qty);
    }

   return(
    <>   
       <div style={{ marginTop: '5rem',  }}>
            <Breadcrumb>
                <Breadcrumb.Section link name='home' onClick={handleClick}>Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right angle'/>
                <Breadcrumb.Section link name='categories' onClick={handleClick}>Category</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right angle'/>
                <Breadcrumb.Section active>{item.name}</Breadcrumb.Section>
            </Breadcrumb>
            <Grid  style={{ marginLeft: '5rem' }} >
                <Grid.Row columns={2}>
                    <Grid.Column width={8} style={{ marginRight: '1rem' }}>
                        <SideBySideMagnifier imageSrc='/resources/backpack_AZ.jpg' imageAlt='Example' alwaysInPlace />
                    </Grid.Column>
                    <Grid.Column center width={5} textAlign='right' > 
                        <Header className='titleblock' as='h1'>{item.name}</Header>
                        <Header className='titleblock' as='h5' color='grey' >Item #123456</Header>
                        <Rating className='titleblock' rating={item.rating} maxRating={5}></Rating>
                        <Header as='h2' color='orange'>${item.price}</Header>
                        <Header as='h2' style={{fontWeight:'bold'}}>Description</Header><Header as='h3'>{item.description}</Header>
                        <Input label={{color: 'teal', labelPosition: 'left', content: 'Quantity'}} min={1} max={10} type='number' style={{ marginBottom: '1rem' }} onChange = {registerChange} />
                        <div>
                            {!addItem?
                            <Button size='huge'
                                color='teal'
                                icon='cart'
                                content='Add to Cart'
                                onClick={AddItem} />:
                                <Button size='huge'
                            color='grey'
                            icon='remove'
                            content='Remove'
                            onClick={removeItem}/>}
                            <Button size='huge' basic style={{ marginTop: '1rem', marginLeft: '1rem' }}>Add to wishlist</Button>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid centered>
                <Grid.Column textAlign='center' style={{ marginTop: '3rem' }}>
                
                    <h1>Blogs rendering soon!</h1>
                    <Divider />
                    <h1>Blogs rendering soon!</h1>
                    <Divider />
                    <h1>Blogs rendering soon!</h1>
                    <Divider />
                </Grid.Column>
            </Grid>
        </div>
    </>    
   )
}

export default ProductPage;
