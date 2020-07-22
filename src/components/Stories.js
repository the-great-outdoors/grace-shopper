import React, { useEffect, useState } from 'react';
import { Container, Header, Image, Item } from 'semantic-ui-react';
import axios from 'axios';

const Stories = () => {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        console.log('Getting all of the blogs!');
        axios.get('/api/blogs')
            .then(res => {
                console.log('Res.data.blogs: ', res.data.blogs);
                const fetchedBlogs = res.data.blogs;
                if (fetchedBlogs) {
                    setBlogs(fetchedBlogs);
                }
            })
            .catch(error => console.error(error))
    }, [])

    return (

        <>
            <Container fluid>
                <Container style={{
                    background: 'purple',
                    height: '750px',
                    width: '100vw',
                    backgroundImage: `url('/resources/hiker_lake-tree.jpg')`,
                    backgroundSize: 'cover',
                }}>
                    <Header inverted color='orange' textAlign='right' style={{ fontFamily: 'Ultra', fontSize: '6rem', paddingRight: '50px', paddingTop: '50px' }}>Your Stories</Header>
                </Container>
            </Container>
            <Item.Group>
                {blogs ?
                    blogs.map((blog, index) => {
                        const { title, authorId, blogText, username } = blog;
                        return (
                            <Item key={index}>
                                <Item.Content>
                                    <Item.Header as='a'>{title}</Item.Header>
                                    <Item.Meta>By: {username}</Item.Meta>
                                    <Item.Extra>{blogText}</Item.Extra>
                                </Item.Content>
                            </Item>
                        )
                    })

                    : ''
                }
            </Item.Group>

        </>
    )

};

export default Stories;