import React, {Component, useState} from 'react';
import axios from 'axios';

import {Input, Icon, Container, Dropdown, Button, Search } from 'semantic-ui-react';

const SearchBar = ({results, setResults})=>{

    const options = [
        { key: 'all', text: 'All', value: 'all' },
        { key: 'tents', text: 'tents', value: 'tents' },
        { key: 'climbing', text: 'climbing', value: 'climbing' },
        { key: 'hiking', text: 'hiking', value: 'hiking' },
        { key: 'sports', text: 'sports', value: 'sports' },
        { key: 'camping', text: 'camping', value: 'camping' },
      ]

const handleInputChange= async(e)=>{

  const value = e.target.value;

  const data = {name:`${value}`, category:'tents'};
  const search = await axios.post('/api/merchandise/search', data);

  console.log('your search: ',search.data.data);

}

return (

    <Input style={{minWidth:'400px'}}
    label={<Dropdown defaultValue='all' options={options} />}
    labelPosition='right'
    placeholder='Search...'
    onChange={handleInputChange}
  />

)
    
}



export {SearchBar};