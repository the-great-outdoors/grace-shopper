import React, { Component, useState } from 'react';
import axios from 'axios';
import { Input, Icon, Container, Dropdown, Button, Search } from 'semantic-ui-react';

const SearchBar = ({ results, setResults, setSearchTerm }) => {

  const options = [
    { key: 'all', text: 'All', value: 'all' },
    { key: 'tents', text: 'tents', value: 'tents' },
    { key: 'climbing', text: 'climbing', value: 'climbing' },
    { key: 'hiking', text: 'hiking', value: 'hiking' },
    { key: 'sports', text: 'sports', value: 'sports' },
    { key: 'camping', text: 'camping', value: 'camping' },
  ]


  const handleInputChange = async (e) => {

    const value = e.target.value;

    const data = { name: `${value}`, category: 'tents' };
    const search = await axios.post('/api/merchandise/search', data);

    console.log('your search: ', search.data.data);

  }

  return (
let category='';

const handleInputChange= async(e, data)=>{
  const value=e.target.value;

  console.log('searchTerm:',value);

  let srch={};
  srch.value=value;

  if (category.length) {
    console.log('Category?:', category);
    srch.category=category;
  }

  setSearchTerm(srch)

  // const search = await axios.post('/api/merchandise/search',srch);
  
  // const results = search.data.data;

  // if (search.data.data) {
  //   console.log('Entered SearchBar -search:',search.data.data, 'category:',category);
  //   setMerchandise(results);
  // }
  
}

const handleOptionSelect = (e, data)=>{
  console.log('Entered handleOptionChange',data.value );
  category= data.value;
}

    <Input style={{ minWidth: '400px' }}
      label={<Dropdown defaultValue='all' options={options} />}
      labelPosition='right'
      placeholder='Search...'
      onChange={handleInputChange}
    />
  )

    <Input style={{minWidth:'400px'}}
    label={<Dropdown defaultValue='all' options={options} onChange={handleOptionSelect}/>}
    labelPosition='right'
    placeholder='Search...'
    onChange={handleInputChange}
  />
}



export default SearchBar;