import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Form,
    Input,
    Radio,
    Button,
    Modal,
    Image
} from 'semantic-ui-react'

import './CreateUserModal.css';

const CreateUserModal = ({
    registerShow,
    registerSetShow,
    // username,
    // setUsername,
    // hashpassword,
    // setHashpassword,
    login,
    setLogin,
    user,
    setUser,
    token,
    setToken
}) => {

    const [username, setUsername] = useState("");
    const [hashpassword, setHashpassword] = useState("");
    const [confirmHashpassword, setConfirmHashpassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [shipping, setShipping] = useState('USPS');

    const handleChange = (e, param) => {
        console.log('Handle Change', param.value)
        setShipping(param.value)
    };
    const handleClose = () => { registerSetShow(false) };
    console.log('Shipping: ', shipping);

    const registerUser = () => {
        console.log('In register user!!')

        if (!username || !hashpassword || !confirmHashpassword || !firstname || !lastname || !streetAddress || !city || !state || !zip) {
            return;
        }

        if (hashpassword !== confirmHashpassword) return;

        console.log('Register User is being called!');
        axios.post('/api/users/register', { username, hashpassword, firstname, lastname, street: streetAddress, city, state, zip, shipping })
            .then(res => {
                console.log('New User: ', res.data);
                console.log('Token: ', res.data.token)
                setUser(res.data.user);
                localStorage.setItem('token', res.data.token);
                console.log(localStorage.getItem('token'));
                // setToken(res.data.token);
            })
            .then(() => {
                setLogin(true);
            })
            .catch(error => {
                console.error('Error registering user!', error);
            })

    };


    const clearForm = () => {
        setUsername("");
        setHashpassword("");
        setConfirmHashpassword("");
        setFirstname("");
        setLastname("");
        setStreetAddress("");
        setCity("");
        setState("");
        setZip("");
    };

    return (
        <div>
            <Modal open={registerShow} size='small'>
                <Modal.Header className='create-user-header'
                    style={{
                        backgroundColor: 'olivedrab',
                        color: 'white',
                        borderBottom: '2px solid black'
                    }}>Create Your User Profile</Modal.Header>
                <Modal.Content
                    style={{
                        backgroundColor: 'lightgrey'
                    }}>
                    <div className='image'>
                        <Image
                            src='http://placeimg.com/100/100/nature'
                            style={{
                                maxHeight: '100px',
                                maxWidth: '100px',
                                paddingBottom: '5px'
                            }}
                        />
                    </div>
                    <Form>
                        <Form.Field required>
                            <label>Username:</label>
                            <Input
                                type='text'
                                placeholder='Username'
                                style={{
                                    border: '1px solid black',
                                    borderRadius: '5px'
                                }}
                                onChange={event => setUsername(event.target.value)}
                                value={username}
                            />
                        </Form.Field>
                        <Form.Field required>
                            <label>Password:</label>
                            <Input
                                type='password'
                                placeholder='Password (Must be at least 8 characters)'
                                style={{
                                    border: '1px solid black',
                                    borderRadius: '5px'
                                }}
                                onChange={event => setHashpassword(event.target.value)}
                                value={hashpassword}
                            />
                        </Form.Field>
                        <Form.Field required>
                            <label>Confirm Password:</label>
                            <Input
                                type='password'
                                placeholder='Confirm Password'
                                style={{
                                    border: '1px solid black',
                                    borderRadius: '5px'
                                }}
                                onChange={event => setConfirmHashpassword(event.target.value)}
                                value={confirmHashpassword}
                            />
                        </Form.Field>
                        <Form.Group widths='equal'>
                            <Form.Field required>
                                <label>First Name:</label>
                                <Input
                                    type='text'
                                    placeholder='First Name'
                                    style={{
                                        border: '1px solid black',
                                        borderRadius: '5px'
                                    }}
                                    onChange={event => setFirstname(event.target.value)}
                                    value={firstname}
                                />
                            </Form.Field>
                            <Form.Field required>
                                <label>Last Name:</label>
                                <Input
                                    type='text'
                                    placeholder='Last Name'
                                    style={{
                                        border: '1px solid black',
                                        borderRadius: '5px'
                                    }}
                                    onChange={event => setLastname(event.target.value)}
                                    value={lastname}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Field required>
                            <label>Street Address:</label>
                            <Input
                                type='text'
                                placeholder='Street Address'
                                style={{
                                    border: '1px solid black',
                                    borderRadius: '5px'
                                }}
                                onChange={event => setStreetAddress(event.target.value)}
                                value={streetAddress}
                            />
                        </Form.Field>
                        <Form.Group widths='equal'>
                            <Form.Field required>
                                <label>City:</label>
                                <Input
                                    type='text'
                                    placeholder='City'
                                    style={{
                                        border: '1px solid black',
                                        borderRadius: '5px'
                                    }}
                                    onChange={event => setCity(event.target.value)}
                                    value={city}
                                />
                            </Form.Field>
                            <Form.Field required>
                                <label>State:</label>
                                <Input
                                    type='text'
                                    placeholder='State'
                                    style={{
                                        border: '1px solid black',
                                        borderRadius: '5px'
                                    }}
                                    onChange={event => setState(event.target.value)}
                                    value={state}
                                />
                            </Form.Field>
                            <Form.Field required>
                                <label>Zip Code:</label>
                                <Input
                                    type='zip code'
                                    placeholder='Zip Code'
                                    name='zip'
                                    type='text'
                                    inputMode='numeric'
                                    // pattern='^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$'
                                    style={{
                                        border: '1px solid black',
                                        borderRadius: '5px'
                                    }}
                                    onChange={event => setZip(event.target.value)}
                                    value={zip}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group required inline>
                            <label>Shipping Preference:</label>
                            <Radio
                                label='USPS'
                                value='USPS'
                                checked={shipping === 'USPS'}
                                onClick={handleChange}
                                style={{ padding: '0 5px' }}
                            />
                            <Radio
                                label='UPS'
                                value='UPS'
                                checked={shipping === 'UPS'}
                                onClick={handleChange}
                                style={{ padding: '0 5px' }}
                            />
                            <Radio
                                label='FedEx'
                                value='FedEx'
                                checked={shipping === 'FedEx'}
                                onClick={handleChange}
                                style={{ padding: '0 5px' }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Content>
                <Modal.Actions
                    style={{
                        backgroundColor: 'darkgrey',
                        color: 'white',
                        borderTop: '2px solid black'
                    }}>
                    <Button negative
                        style={{
                            boxShadow: '3px 3px 5px black'
                        }}
                        onClick={
                            function (event) {
                                clearForm();
                                handleClose();
                            }
                        }
                    >
                        Cancel
                    </Button>
                    <Button
                        positive
                        icon='checkmark'
                        labelPosition='right'
                        content='Submit'
                        style={{
                            backgroundColor: 'olivedrab',
                            boxShadow: '3px 3px 5px black'
                        }}
                        onClick={
                            (event) => {
                                // event.preventDefault();
                                registerUser();
                                handleClose();
                                clearForm();
                            }
                        }
                    />
                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default CreateUserModal;