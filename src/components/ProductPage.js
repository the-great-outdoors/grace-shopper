import React, { useState, useEffect } from 'react';
import { Grid, Header, Rating, Icon, Button, Input, Breadcrumb } from 'semantic-ui-react';
import { SideBySideMagnifier } from 'react-image-magnifiers';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import './ProductPage.css';

const ProductPage = ({ item, setItem, cart, setCart, user,order, setOrder }) => {

    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState('');
    const [addItem, setAddItem] = useState(false);
    const { id } = useParams();
    
    console.log('merch id:', id);

    const history = useHistory();
    const handleClick = (event, data) => {
        let path = `/${data.name}`;
        history.push(path);
    }

    useEffect(() => {
        try {
            axios.get(`/api/merchandise/search/${id}`)
                .then(res => {
                    const { data: item } = res;
                    console.log(item.merch);
                    setItem(item.merch);
                })
        } catch (error) {
            throw error;
        }

    }, []);

    const AddItem = async() => {

        const qty = quantity;
        const price = item.price;
        const merchId = item.merch;
        console.log('qty:', qty, 'price:', price, 'id:',id);
        const merch = {
            merchId: id,
            quantity: qty,
            price,
            name: item.name,
            description: item.description
        }

        const cartArray = [...cart, merch];
        
        console.log('User:', user.user_id);
        //Check for logged in user
        let activeCart;
        if (user.user_id) {
            console.log('inside IF statement...');

            console.log('creating new merch:', merch);
            const orderItems = await axios.post('/api/orders',merch, {headers:{Authorization: `Bearer ${localStorage.getItem('token')}` }});
            console.log('new merch created!', orderItems);
            
        }else{

            localStorage.setItem('activeCart', JSON.stringify(cart))
            setCart(cartArray);
        }
        



        

    }

    const registerChange = (e, data) => {
        const qty = data.value;
        setQuantity(qty);
    }


    console.log('items in cart:', cart)

    return (
        <>
            <div style={{ marginTop: '5rem', }}>
                <Breadcrumb>
                    <Breadcrumb.Section link name='home' onClick={handleClick}>Home</Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right angle' />
                    <Breadcrumb.Section link name='categories' onClick={handleClick}>Category</Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right angle' />
                    <Breadcrumb.Section active>{item.name}</Breadcrumb.Section>
                </Breadcrumb>
                <Grid style={{ marginLeft: '5rem' }} >
                    <Grid.Row columns={2}>
                        <Grid.Column width={8} style={{ marginRight: '1rem' }}>
                            <SideBySideMagnifier imageSrc='/resources/backpack_AZ.jpg' imageAlt='Example' alwaysInPlace />
                        </Grid.Column>
                        <Grid.Column center width={5} textAlign='right' >
                            <Header className='titleblock' as='h1'>{item.name}</Header>
                            <Header className='titleblock' as='h5' color='grey' >Item #123456</Header>
                            <Rating className='titleblock' rating={item.rating} maxRating={5}></Rating>
                            <Header as='h2' color='orange'>${item.price}</Header>
                            <Header as='h2' style={{ fontWeight: 'bold' }}>Description</Header><Header as='h3'>{item.description}</Header>
                            <Input label={{ color: 'teal', labelPosition: 'left', content: 'Quantity' }} min={1} max={10} type='number' style={{ marginBottom: '1rem' }} onChange={registerChange} defaultValue='1' />
                            <div>
                                {!addItem ?
                                    <Button size='huge'
                                        color='teal'
                                        icon='cart'
                                        content='Add to Cart'
                                        onClick={AddItem} /> :
                                    <Button size='huge'
                                        color='grey'
                                        icon='remove'
                                        content='Remove'
                                        onClick={removeItem} />}
                                <Button size='huge' basic style={{ marginTop: '1rem', marginLeft: '1rem' }}>Add to wishlist</Button>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        </>
    )
}

export default ProductPage;