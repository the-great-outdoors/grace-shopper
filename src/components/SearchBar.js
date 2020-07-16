import React, { Component, useState } from 'react';
import axios from 'axios';
import { Input, Icon, Container, Dropdown, Button, Search } from 'semantic-ui-react';

const SearchBar = ({ results, setResults, setSearchTerm }) => {

  
  const [optionsValue, setOptionsValue] = useState('all');

    const options = [
        { key: 'all', text: 'All', value: 'all' },
        { key: 'clothing', text: 'clothing', value: 'clothing' },
        { key: 'climbing', text: 'climbing', value: 'climbing' },
        { key: 'hiking', text: 'hiking', value: 'hiking' },
        { key: 'sports', text: 'sports', value: 'sports' },
        { key: 'camping', text: 'camping', value: 'camping' },
      ]


const handleInputChange= async(e, data)=>{
  const value=e.target.value;

  console.log('searchTerm:',value);

  let category = optionsValue;

  let srch={};
  srch.value=value;
  if (optionsValue==='all') {
    category=''
  }

  if (category.length) {
    console.log('Category?:', category);
    srch.category=category;
  }


  setSearchTerm(srch)
}

const handleOptionSelect = (e, data)=>{
  console.log('Entered handleOptionChange',data.value );
  // category= data.value;
  setOptionsValue(data.value);
}

return (

    <Input style={{ minWidth: '400px' }}
      label={<Dropdown defaultValue='all' options={options} />}
      labelPosition='right'
      placeholder='Search...'
      onChange={handleInputChange}
    />
 
  )
}


export default SearchBar;