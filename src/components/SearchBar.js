import React, {Component, useState} from 'react';
import axios from 'axios';

import {Input, Dropdown} from 'semantic-ui-react';

const SearchBar = ({setMerchandise})=>{

    const options = [
        { key: 'all', text: 'All', value: 'all' },
        { key: 'tents', text: 'tents', value: 'tents' },
        { key: 'climbing', text: 'climbing', value: 'climbing' },
        { key: 'hiking', text: 'hiking', value: 'hiking' },
        { key: 'sports', text: 'sports', value: 'sports' },
        { key: 'camping', text: 'camping', value: 'camping' },
      ]

let category='';

const handleInputChange= async(e, data)=>{
  console.log(data.value);

  const search = await axios.post('/api/merchandise/search',{data});
  
  const results = search.data.data;

  if (search.data.data) {
    console.log('Entered SearchBar -search:',search.data.data);
    setMerchandise(results);
  }
  
}

const handleOptionSelect = (e, data)=>{
  console.log('Entered handleOptionChange',data.value );
  category= data.value;
}

return (

    <Input style={{minWidth:'400px'}}
    label={<Dropdown defaultValue='all' options={options} onChange={handleOptionSelect}/>}
    labelPosition='right'
    placeholder='Search...'
    onChange={handleInputChange}
  />

)
    
}



export {SearchBar};