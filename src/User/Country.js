import React, { useEffect, useState } from 'react'
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "bootstrap/dist/css/bootstrap.min.css"
const Country = () => {
    const [country,setCountry] = useState([])
    const [countryError,setCountryError] = useState('')
    const [ inputValueOfCountry, setInputValueOfGender] = useState('');
    const [option,setOption] = useState('')
   
    const onChangeCountry = (e) =>{
            setOption(e.target.value)
    }
    useEffect(() =>{
        axios
             .get('http://localhost:5000/allCountry')
             .then((response) =>{
                console.log(response.data.country)
                setCountry(response.data.country)
        })
     },[])
     
  return (
   
    
      
       
    <div className='container mt-3'>
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Country</InputLabel>
        <Select
        fullWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={option}
          
          label="Country"
          
          onChange={(e) =>  setOption(e.target.value)}
        >
            {country.map((opts,i) => <MenuItem key={i} value={opts.countryName}>{opts.countryName}</MenuItem>)}
        </Select>
      </FormControl>
      {
        countryError &&
        <h1>{countryError}</h1>
      }
      {/* <h1>{option}</h1> */}
    </div>

  )
}

export default Country