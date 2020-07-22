import React, { useState } from "react";
import { Grid, Segment, Button, Input, Dropdown } from "semantic-ui-react";
import { ShippingEdit } from './ShippingEdit';
import { Shipping } from '../components';

const ShippingOptions = ({ user, setStep }) => {

    const { firstname, lastname, userPreferences: { street, city, state, zip, shipping } } = user;

    const [shippingInfo, setShipping] = useState({ firstname, lastname, street, city, state, zip, shipping });

    const [editMode, setEditMode] = useState(false)



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