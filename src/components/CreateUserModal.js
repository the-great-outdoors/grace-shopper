import React, { useState, useEffect, Component } from 'react';
import { Button, Icon, Image, Modal, Input, Form, Radio } from 'semantic-ui-react';

import './CreateUserModal.css';
import { BackgroundColor } from 'chalk';

class NestedModal extends Component {
    state = { open: false, shipping: 'USPS' }

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    handleChange = (e, { shipping: value }) => this.setState({ shipping: value })

    render() {
        const { open } = this.state

        return (
            <Modal
                open={open}
                onOpen={this.open}
                onClose={this.close}
                size='small'
                trigger={
                    <Button color='yellow' icon>
                        Proceed <Icon name='right chevron' />
                    </Button>
                }
            >
                <Modal.Header style={{
                    backgroundColor: 'olivedrab',
                    color: 'white'
                }}>Set User Preferences: </Modal.Header>
                <Modal.Content>
                    <Form>

                        <Form.Field required>
                            <label>Street Address</label>
                            <Input type='text number' placeholder='Street Address' />
                        </Form.Field>
                        <Form.Field required>
                            <label>City</label>
                            <Input type='text' placeholder='City' />
                        </Form.Field>
                        <Form.Field required>
                            <label>State</label>
                            <Input type='text' placeholder='State' />
                        </Form.Field>
                        <Form.Field required>
                            <label>Zip Code</label>
                            <Input type='number' placeholder='Zip Code' />
                        </Form.Field>

                        {/* <Form.Group inline>
                        <label>Shipping Preference: </label>
                            <Form.Field
                                control={Radio}
                                label='USPS'
                                value='USPS'
                                checked={value === 'USPS'}
                                onChange={this.handleChange}
                            />
                            <Form.Field
                                control={Radio}
                                label='UPS'
                                value='UPS'
                                checked={value === 'UPS'}
                                onChange={this.handleChange}
                            />
                            <Form.Field
                                control={Radio}
                                label='FedEx'
                                value='FedEx'
                                checked={value === 'FedEx'}
                                onChange={this.handleChange}
                            />
                        </Form.Group> */}
                    </Form>
                </Modal.Content>
                <Modal.Actions style={{
                    backgroundColor: 'olivedrab'
                }}>
                    <Button icon='check' color='black' content='All Done' onClick={this.close} />
                </Modal.Actions>
            </Modal>
        )
    }
}

const CreateUserModal = () => (
    <Modal trigger={<Button color='pink' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Register</Button>}>
        <Modal.Header style={{
            backgroundColor: 'black',
            color: 'white'
        }}>Create New User: </Modal.Header>
        <Modal.Content>
            <div className='image'>
                <Image src='http://placeimg.com/100/100/nature' style={{
                    maxHeight: '100px',
                    maxWidth: '100px',
                    paddingBottom: '5px'
                }} />            </div>
            <Form>
                <Form.Field required>
                    <label>Username</label>
                    <Input placeholder='Username' />
                </Form.Field>
                <Form.Field required>
                    <label>Password</label>
                    <Input type='password' placeholder='Password (Must be at least 8 characters)' />
                </Form.Field>
                <Form.Field required>
                    <label>Confirm Password</label>
                    <Input type='password' placeholder='Confirm Password' />
                </Form.Field>
            </Form>
        </Modal.Content>
        <Modal.Actions style={{
            backgroundColor: 'black'
        }}>
            <NestedModal />
        </Modal.Actions>
    </Modal>
)


export default CreateUserModal;