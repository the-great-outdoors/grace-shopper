import React from 'react';
import { Header, Divider } from 'semantic-ui-react';
import { Container } from 'react-bootstrap';
import './AboutUs.css';

const AboutUsPage = () => {
    return(
        <>
            <Container fluid>
                <Container style={{
                    background: 'purple',
                    height: '800px',
                    backgroundImage: `url('/resources/mountaintop_victory.jpg')`, backgroundSize: 'cover'
                }}>
                    <Header inverted color='orange' textAlign='right' style={{ fontFamily: 'Ultra', fontSize: '6rem', paddingRight: '50px', paddingTop: '50px' }}>About Us</Header>
                </Container>
            </Container>
            <Header style={{ fontSize: '4rem', fontFamily: 'Calligraffitti' }} textAlign='center'>Our Story</Header>
            <Container textAlign='center'>
                <Divider />
                <Header style={{ fontSize: '3rem', fontFamily: 'Alegreya', textDecoration: 'underline', marginLeft: '0.5rem' }} textAlign='left'>Our History</Header>
                <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
                    ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
                    magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
                    ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
                    quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
                    arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
                    Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras
                    dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend
                    tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
                    enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
                    Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean
                    imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper
                    ultricies nisi.
                </p>
                <Header style={{ fontSize: '3rem', fontFamily: 'Alegreya', textDecoration: 'underline', marginLeft: '0.5rem' }} textAlign='left'>Protecting The Earth</Header>
                <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
                    ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
                    magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
                    ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
                    quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
                    arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
                    Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras
                    dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend
                    tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
                    enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
                    Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean
                    imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper
                    ultricies nisi.
                </p>
                <Header style={{ fontSize: '3rem', fontFamily: 'Alegreya', textDecoration: 'underline', marginLeft: '0.5rem' }} textAlign='left'>On The Horizon</Header>
                <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
                    ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
                    magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
                    ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
                    quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
                    arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
                    Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras
                    dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend
                    tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
                    enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
                    Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean
                    imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper
                    ultricies nisi.
                </p>
            </Container>
        </>
    )
}

export default AboutUsPage;