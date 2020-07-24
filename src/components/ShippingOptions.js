import React, { useState, useEffect } from "react";
import { Grid, Segment, Button, Input, Dropdown, Dimmer, Loader, Image } from "semantic-ui-react";
import { ShippingEdit } from './ShippingEdit';
import { Shipping } from '../components';

const ShippingOptions = ({ user, setStep }) => {
    const [editMode, setEditMode] = useState(false);
    const [shippingInfo, setShipping] = useState({});

    // if (!user.user_id) {
    //     return <div>
    //         <Segment>
    //             <Dimmer active inverted>
    //                 <Loader inverted active>Loading</Loader>
    //             </Dimmer>

    //             <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    //         </Segment>
    //     </div>;
    // };

    useEffect(() => {
        if (user.user_id) {
            console.log('setting setShipping');
            const { firstname, lastname, userPreferences: { street, city, state, zip, shipping } } = user;

            setShipping({ firstname, lastname, street, city, state, zip, shipping });
        } else {
            console.log('guest user');
        }

    }, []);


    return (
        <Grid>
            {editMode ?
                <ShippingEdit user={user} setShipping={setShipping} shippingInfo={shippingInfo}
                    setEditMode={setEditMode} /> :
                <Shipping setStep={setStep} shippingInfo={shippingInfo} setEditMode={setEditMode} />}
        </Grid>

    )
}

export { ShippingOptions };