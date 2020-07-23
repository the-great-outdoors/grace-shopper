import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Form,
    Input,
    Button,
    Modal,
} from 'semantic-ui-react'

const LoginModal = ({
    loginShow,
    loginSetShow,
    setLogin,
    setUser,
}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleClose = () => { loginSetShow(false) };

    const loginUser = () => {
        console.log('In login user!');

        if (!username && !password) {
            return;
        }

        console.log('Login User is being called!');
        axios.post('/api/users/login', { username, password, })
            .then(res => {
                console.log('Logged-in User: ', res.data);

                if (res.data.status === 'UsernamePasswordIncorrect') {
                    return alert('Username or passord incorrect. Please re-enter credentials.');
                } else {

                    setUser(res.data.user);
                    localStorage.setItem('token', res.data.token);
                    console.log(localStorage.getItem('token'));
                    if (res.data.user) {
                        setLogin(true);
                    };

                };
            })
            .catch(error => {
                console.error('Error logging-in user!', error);
            });
    };
    const clearForm = () => {
        setUsername("");
        setPassword("");
    };

    return (
        <div>
            <Modal open={loginShow} size='mini'>
                <Modal.Header className='login-user-header'
                    style={{
                        backgroundColor: 'olivedrab',
                        color: 'white',
                        borderBottom: '2px solid black'
                    }}>User Login</Modal.Header>
                <Modal.Content
                    style={{
                        backgroundColor: 'lightgrey'
                    }}>
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
                                placeholder='Enter Password'
                                style={{
                                    border: '1px solid black',
                                    borderRadius: '5px'
                                }}
                                onChange={event => setPassword(event.target.value)}
                                value={password}
                            />
                        </Form.Field>
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
                        onClick={handleClose}>
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
                                loginUser();
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
export default LoginModal;