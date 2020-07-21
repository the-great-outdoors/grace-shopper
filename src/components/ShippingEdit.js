import React, { useEffect, useState } from "react";
import {Grid, Segment, Button, Input, Dropdown, Header, Form, Checkbox} from "semantic-ui-react";


const ShippingEdit = ({user, setShipping, shippingInfo, setEditMode}) =>{
    const [shipMethod, setShipMethod] = useState(user.userPreferences.shipping);

    const { firstname, lastname, street, city, state, zip, shipping } = shippingInfo;

    const shipOptions = [
        {key:'UPS', text:'UPS', value:'UPS'},
        {key:'USPS', text:'USPS', value:'USPS'},
        {key:'FEDEX', text:'FEDEX', value:'FEDEX'}
    ]

    const handleClick=(e, data)=>{
        e.preventDefault();
        console.log('clicked save button:', e.target);
        setEditMode(false);
    }

    const handleSelect=(e, data)=>{
        console.log('New shipping option chosen:', data.value);
        setShipMethod(data.value);
    }

    const handleInput=(e, data)=>{
        console.log('Input changed for ', data.name);
        const {name, value} = data;
        console.log('name:', name, ' value:', value);
        setShipping({...shippingInfo, [name]:value})

    }

    console.log('Updated Shipping information:', shippingInfo);

    return (
        <Form>
        <Header>Shipping</Header>
        <Form.Field>
          <label>First Name</label>
          <Input name='firstname' placeholder={firstname} onChange={handleInput}/>
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <Input name='lastname' placeholder={lastname} onChange={handleInput}/>
        </Form.Field>
        <Form.Field>
          <label>Street Address</label>
          <Input name='street' placeholder={street} onChange={handleInput}/>
        </Form.Field>  <Form.Field>
          <label>City</label>
          <Input name='city' placeholder={city} onChange={handleInput}/>
        </Form.Field>
        <Form.Field>
          <label>State</label>
          <Input name='state' placeholder={state} onChange={handleInput}/>
        </Form.Field>
        <Form.Field>
          <label>Zip Code</label>
          <Input name='zip' placeholder={zip} onChange={handleInput}/>
        </Form.Field>
        <Dropdown options={shipOptions} onChange={handleSelect}/>
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        <Button onClick={handleClick}>Submit</Button>
      </Form>

    )

}

export { ShippingEdit} ;