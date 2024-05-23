import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Box,Avatar, Grid,TextField,Button,Typography ,Link} from '@mui/material';
const Home = () => {
  const [show, setShow] = useState(false);

  return(
    <>
      <h1 className="text-3xl font-bold underline bg-red-600">Hello world</h1>
    </>
  );

}

export default Home