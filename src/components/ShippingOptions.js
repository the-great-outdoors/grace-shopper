import React, { useState, useEffect } from "react";
import { Grid, Segment, Button, Input, Dropdown } from "semantic-ui-react";
import { ShippingEdit } from './ShippingEdit';
import { Shipping } from '../components';

const ShippingOptions = ({ user, setStep}) => {
    const [editMode, setEditMode] = useState(false);
    const[shippingInfo, setShipping] = useState({})

    useEffect(()=>{
        if (user.user_id) {
            console.log('setting setShipping');
            const { firstname, lastname, userPreferences: { street, city, state, zip, shipping } } = user;
    
            setShipping({ firstname, lastname, street, city, state, zip, shipping });
        }else{
            console.log('guest user');
        }

    }, []);
  
   
    return (
        <Grid celled='internally'>
            {editMode ?
                <ShippingEdit user={user} setShipping={setShipping} shippingInfo={shippingInfo}
                    setEditMode={setEditMode} /> :
                <Shipping setStep={setStep} shippingInfo={shippingInfo} setEditMode={setEditMode} />}
        </Grid>

    )
}

export { ShippingOptions };