import path from "path";
import React, { useState, useEffect } from "react";
import { Card, Icon, Item, Image, Input, Header } from "semantic-ui-react";
import faker from "faker";
import axios from "axios";
import { Jumbotron, Container } from "react-bootstrap";
import css from './Hero.css';
import { NavBar } from '../components';

<<<<<<< HEAD


const Hero = ({ 
    results, 
    setResults, 
=======
const Hero = ({
    results,
    setResults,
    show,
    setShow,
    setLogin,
    login,
    setUser,
    token,
    setToken,
    setSearchTerm
>>>>>>> 2283edabc791f219775caf5743b6a530aefc8575
}) => {
    return (
        <Container fluid>
            <Container style={{
                background: 'purple',
                height: '800px',
                backgroundImage: `url('/resources/rock_climbing_hanging_crop.jpeg')`, backgroundSize: 'cover'
            }}
            >
<<<<<<< HEAD
                <NavBar
                    results={results}
                    setResults={setResults}/>
=======
>>>>>>> 2283edabc791f219775caf5743b6a530aefc8575
                <Header inverted color='orange' textAlign='right' style={{ fontFamily: 'Ultra', fontSize: '6rem', paddingRight: '50px', paddingTop: '50px' }}>The Great Outdoors</Header>
                <Header inverted textAlign='right' style={{ fontSize: '6rem', paddingRight: '50px', paddingTop: '25px', fontFamily: 'Calligraffitti' }}>Adventure awaits</Header>
            </Container>
        </Container>
    )
}

export default Hero;