import React, { useEffect, useState } from 'react'
import axios from  "axios";
import {  useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Avatar,Box, Grid,TextField,Button,Typography ,Link} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../Store/auth';
const Login = () => {
    
  const {storeTokenInLS} = useAuth();
    const [email ,setEmail] = useState("")
    const [password ,setPassword ] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [value,setValue] = useState()
    const navigate = useNavigate()
    const [courseImg, setprofileImg] = useState("");
    const [avatar, setImage] = useState({
      placeholder: null,
      file: null,
    });
    useEffect(()=>{
        setprofileImg(localStorage.getItem("profilepic"))
    })
  
    const [imgError, setImageError] = useState("");
    const handleImageChange = (event) => {
        // const localFile = event.target.files[0]
        console.log(event.target.files[0]);
        if (
          event.target.files[0].type === "image/png" ||
          event.target.files[0].type === "image/jpeg"
        ) {
          //Preview Show
          setImageError("");
          const reader = new FileReader();
          reader.onload = (r) => {
            setImage({
              placeholder: r.target.result,
              file: event.target.files[0],
            });
            setprofileImg(r.target.result);
           
          };
          const imgfile = event.target.files[0];
          reader.readAsDataURL(imgfile);
          console.log(imgfile);
          console.log(courseImg);
          //readAsDataURL : file in anadar src ma value store kare.
        } else {
          setImageError("Invalid File");
          avatar.file = null;
        }
      };

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
            let result = await axios.post('http://localhost:5000/instructor/login',{
                email:email,
                password:password
            })
            .then(result =>{
                console.log(result);
                if (result.data) {
                    if (result.data.data.accessToken) {
                      // localStorage.setItem(
                      //   "accessToken",
                      //   JSON.stringify(result.data.data.accessToken)
                      // );
                      storeTokenInLS(result.data.data.accessToken)
                }
            }
                console.log("accessToken",result.data.data.accessToken)
                
                toast.success(result.data.message)
                setTimeout(() => {
                  navigate("/db")
                }, 2000);
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