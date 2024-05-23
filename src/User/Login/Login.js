import React, { useEffect, useState } from 'react'
import axios from  "axios";
import {  useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Avatar, Grid,TextField,Button,Typography ,Link} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Login = () => {
    const [email ,setEmail] = useState("")
    const [password ,setPassword ] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [value,setValue] = useState()
    const navigate = useNavigate()

    //Style
    const paperStyle ={
        padding:20,
        height:'90vh',
        width:280,
        margin:"20px auto",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column"

    }
    const avatarStyle = {
        backgroundColor: '#5d5de7'
    }
    const buttonStyle = {
        margin:"8px 0px",
        backgroundColor:"#5d5de7",
        width:"350px"
    }
    const fieldStyle = {
        margin:"8px 0px",
        width:"350px"
    }
    //Regex
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    //Input Field
    const onChangeEmail = (e) =>{
        setEmail(e.target.value)
        setEmailError('')
        if((!isValidEmail.test(email))){
          setEmailError("Please enter valid email.")
        }    
    }
    const onChangePassword = (e) =>{
        setPassword(e.target.value)
        setPasswordError("")
    }
    //Login Validation
    const validUser = []
   
    const handleSubmit = async(e) =>{
        e.preventDefault()
        if(!email){
            setEmailError("Email is required")
        }
        if(!password){
            setPasswordError("Password is required")
        }
        if(email && password){
            
            const header = {"Access-control-Allow-Origin":"*"}
            let result = await axios.post('http://localhost:5000/user/login',{
                email:email,
                password:password
            })
            .then(result =>{
                console.log(result);
                if (result.data) {
                    if (result.data.data.accessToken) {
                      localStorage.setItem(
                        "accessToken",
                        JSON.stringify(result.data.data.accessToken)
                      );
                }
            }
                console.log("accessToken",result.data.data.accessToken)
                
                toast.success(result.data.message)
                setTimeout(() => {
                  navigate("/managecategories")
                }, 7000);
            })
            .catch(err => {
                console.log(err.response.data)
                // setError(err.response.data.message)
                toast.error(err.response.data.message)
                setTimeout(() => {
                //   setError("")
                }, 5000);
                
            })
            
        }
    }
  return (
   
    <Grid >
        <Grid elevation={10} style={paperStyle}>
            <Grid align='center'>
                <Avatar style={avatarStyle}><AccountCircleIcon/></Avatar>
                <h3>Sign in</h3>
            </Grid>
            <TextField 
                id="outlined-basic" 
                name='email'
                label="Email" 
                placeholder="Enter your Email ID"
                variant="outlined"
                // fullWidth
                style={fieldStyle}
                onChange={onChangeEmail}
                error={emailError}
                helperText={emailError}
            />
            <TextField 
                id="outlined-basic" 
                label="Password" 
                name='password'
                type='password'
                placeholder="Enter your Password"
                variant="outlined"
                // fullWidth
                style={fieldStyle}
                onChange={onChangePassword}
                error={passwordError}
                helperText={passwordError}
            />
    
            <Button 
                type='submit'
                variant="contained"
                // color="primary"
                fullWidth
                style={buttonStyle}
                onClick={handleSubmit}
            >
            Sign in</Button>
            <Typography >
                <Link href="/forgotpassword" underline="none">Forgot password?</Link>
            </Typography>
            <Typography> 
                <Link  href="/"  underline="none">Create new account</Link>
            </Typography>
        </Grid>
        <ToastContainer />
    </Grid>
        
  )
}

export default Login