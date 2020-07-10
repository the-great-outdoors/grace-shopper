import React, {Component, useState} from 'react';

import {Input, Icon, Container, Dropdown, Button } from 'semantic-ui-react';

const SearchBar = ({results, setResults})=>{

    const options = [
        { key: 'all', text: 'All', value: 'all' },
        { key: 'tents', text: 'tents', value: 'tents' },
        { key: 'climbing', text: 'climbing', value: 'climbing' },
        { key: 'hiking', text: 'hiking', value: 'hiking' },
        { key: 'sports', text: 'sports', value: 'sports' },
        { key: 'camping', text: 'camping', value: 'camping' },
      ]


return (

    <Input style={{minWidth:'400px'}}
    label={<Dropdown defaultValue='all' options={options} />}
    labelPosition='right'
    placeholder='Search...'
  />

)
    
}



export {SearchBar};