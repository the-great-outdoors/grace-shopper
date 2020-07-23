import React from 'react';
import { Container, Header, Card, Image, Divider } from 'semantic-ui-react';

const ContactUs = () => {

    return(
        <>
            <Container fluid>
                <Container style={{
                    background: 'purple',
                    height: '600px',
                    width: '100vw',
                    backgroundImage: `url('/resources/maps.jpg')`,
                    backgroundSize: 'cover'
                }}>
                    <Header inverted color='orange' textAlign='right' style={{ fontFamily: 'Ultra', fontSize: '6rem', paddingRight: '50px', paddingTop: '50px' }}>Contact Us</Header>
                </Container>
            </Container>
            <Header style={{ fontSize: '4rem', fontFamily: 'Calligraffitti' }} textAlign='center'>Project Developers</Header>
            <Container style={{ width: '100vw', marginBottom: '3rem' }} >
            <Divider />
                <Card.Group centered style={{ marginTop: '3rem' }} >
                    <Card style={{ marginRight: '2rem' }} >
                        <Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' wrapped ui={false} />
                        <Card.Content>
                        <Card.Header>Garrett Wren</Card.Header>
                        <Card.Meta>
                            <span className='date'>Fullstack Web Developer</span>
                        </Card.Meta>
                        <Card.Description>
                            Garrett is a cool web developer
                        </Card.Description>
                        <Divider />
                        <Card.Content style={{ textAlign: 'center' }} extra>
                            <a href='https://www.linkedin.com/in/gwren19'>LinkedIn</a>
                        </Card.Content>
                        <Divider />
                        <Card.Content style={{ textAlign: 'center' }} extra>
                            <a href='https://github.com/gwren19'>Github</a>
                        </Card.Content>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                        <Card.Content>
                        <Card.Header>Levi Plant</Card.Header>
                        <Card.Meta>
                            <span className='date'>Fullstack Web Developer</span>
                        </Card.Meta>
                        <Card.Description>
                            Levi is a cool web developer
                        </Card.Description>
                        <Divider />
                        <Card.Content style={{ textAlign: 'center' }} extra>
                            <a href='https://www.linkedin.com/in/levijplant1979' target='_blank'>LinkedIn</a>
                        </Card.Content>
                        <Divider />
                        <Card.Content style={{ textAlign: 'center' }} extra>
                            <a href='https://github.com/levijplant' target='_blank'>Github</a>
                        </Card.Content>
                        </Card.Content>
                    </Card>
                </Card.Group>
                <Card.Group centered style={{ marginTop: '2rem' }} >
                    <Card style={{ marginRight: '2rem' }} >
                        <Image src='https://react.semantic-ui.com/images/avatar/large/molly.png' wrapped ui={false} />
                        <Card.Content>
                        <Card.Header>Patricia Deal</Card.Header>
                        <Card.Meta>
                            <span className='date'>Fullstack Web Developer</span>
                        </Card.Meta>
                        <Card.Description>
                            Patricia is a cool web developer
                        </Card.Description>
                        <Divider />
                        <Card.Content style={{ textAlign: 'center' }} extra>
                            <a href='https://www.linkedin.com'>LinkedIn</a>
                        </Card.Content>
                        <Divider />
                        <Card.Content style={{ textAlign: 'center' }} extra>
                            <a href='https://github.com'>Github</a>
                        </Card.Content>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Image src='https://react.semantic-ui.com/images/avatar/large/elliot.jpg' wrapped ui={false} />
                        <Card.Content>
                        <Card.Header>Sean Greene</Card.Header>
                        <Card.Meta>
                            <span className='date'>Fullstack Web Developer</span>
                        </Card.Meta>
                        <Card.Description>
                            Sean is a cool web developer
                        </Card.Description>
                        <Divider />
                        <Card.Content style={{ textAlign: 'center' }} extra>
                            <a href='https://www.linkedin.com'>LinkedIn</a>
                        </Card.Content>
                        <Divider />
                        <Card.Content style={{ textAlign: 'center' }} extra>
                            <a href='https://github.com'>Github</a>
                        </Card.Content>
                        </Card.Content>
                    </Card>
                </Card.Group>
            </Container>
        </>
    )   
}

export default ContactUs;