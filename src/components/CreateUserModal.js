import React, { useState, useEffect, Component } from 'react';
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
    show,
    setShow
}) => {

    const [value, setValue] = useState('USPS');
    const handleChange = (e, { value }) => setValue({ value });
    const handleClose = () => {setShow(false)};

    return (
        <div>
            <Modal open={show} size='small'>
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
                            />
                        </Form.Field>
                        <Form.Field required>
                            <label>Street Address:</label>
                            <Input
                                type='text'
                                placeholder='Street Address'
                                style={{
                                    border: '1px solid black',
                                    borderRadius: '5px'
                                }}
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
                                    pattern='^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$'
                                    style={{
                                        border: '1px solid black',
                                        borderRadius: '5px'
                                    }}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group required inline>
                            <label>Shipping Preference:</label>
                            <Radio
                                label='USPS'
                                value='usps'
                                checked={value === 'usps'}
                                onChange={handleChange}
                                style={{ padding: '0 5px' }}
                            />
                            <Radio
                                label='UPS'
                                value='ups'
                                checked={value === 'ups'}
                                onChange={handleChange}
                                style={{ padding: '0 5px' }}
                            />
                            <Radio
                                label='FedEx'
                                value='fedex'
                                checked={value === 'fedex'}
                                onChange={handleChange}
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
                    />
                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default CreateUserModal;