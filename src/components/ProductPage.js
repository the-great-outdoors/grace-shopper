import React, { useState, useEffect, Fragment } from 'react';
import { Grid, Header, Rating, Divider, Button, Input, Breadcrumb, Container, Header } from 'semantic-ui-react';
import { SideBySideMagnifier } from 'react-image-magnifiers';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProductPage.css';

const ProductPage = (props) => {
    const [item, setItem, blogs, setBlog] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState('');

    const sections = [
        { key: 'Home', content: 'Home', link: true },
        { key: 'Store', content: 'Store', link: true },
        { key: 'Backpack', content: 'Backpack', active: true },
    ]

    const { id } = useParams();

    useEffect(()=>{
        console.log('Here I am!: ', id);
        try {
            axios.get(`/api/merchandise/search/${id}`)
            .then(res=>{
                const {data:merch} = res;
                console.log('retrievedMerch: ',merch.merch)
                setItem(merch.merch);
                console.log('item set?', item);
            })

        } catch (error) {
            throw error;
        }
        
    }, []);

    useEffect(()=>{
        try {
           
            axios.get(`/api/blog/${ MerchId }`, {merch_id})
            .then(res => {
              const blog = res.data.blogs;
              setBlog(blog);
            })

        } catch (error) {
            throw error;
        }

    }, []);

    const basketTotal=()=>{
       const qty = quantity;
       const price = item.price;
       const basket = qty*price;
       console.log(basket);
        setTotal(basket);
        axios.post('/api/orders', { 
            userId: 1,
            status: true,
            price
        })
        .then(res => { 
            const newOrder = res.data.order
            console.log(newOrder) 
        })
        
    }

    const registerChange = (e, data)=>{
        const qty=data.value;
        setQuantity(qty);
        console.log('what is qty?:', quantity);
    }

   return(
    <>   
        <Breadcrumb icon='right angle' sections={sections} style={{ marginTop: '3rem', marginLeft: '3rem' }} />
       <div style={{ marginTop: '5rem',  }}>
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
                            <Button size='huge'
                                color='teal'
                                icon='cart'
                                content='Checkout' />
                            <Button size='huge' basic style={{ marginTop: '1rem', marginLeft: '1rem' }}>Add to wishlist</Button>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid centered>
                <Grid.Column textAlign='center' style={{ marginTop: '3rem' }}>
            <Container>
                {blogs.map((blog) => {
                return (
                    <Fragment>
                <Header className='blogtitle' as='h1'>{blog.title}</Header>
                <p>{blog.blogText}</p>
                </Fragment>
                )})}
            </Container>
                </Grid.Column>
            </Grid>
        </div>
    </>    
   )


export default ProductPage;