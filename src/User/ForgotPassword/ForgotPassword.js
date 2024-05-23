import React, { useCallback, useEffect, useState } from 'react'
import axios from  "axios";
import {  useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Avatar, Grid,TextField,Button,Typography ,Link} from '@mui/material';
const ForgotPassword = () => {
    
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [OTPNo, setOTPNo] = useState("")
    const [emailError, setEmailError] = useState("")
    const [otpError, setOtpError] = useState("")
    const [fieldName,setFieldName] = useState("Verfiy Email")
    const [OtpFieldShow,setOtpFieldShow] = useState(false)
    //
    const [show, setShow] = useState(false);
    
    
    const navigate = useNavigate()

    //regex
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    const onChangeEmail = (e) =>{
        setEmail(e.target.value)
        setEmailError('')
        if((!isValidEmail.test(email))){
          setEmailError("Please enter valid email.")
        }  
    }
    let realOtp = ''
    const onChangeOtp = (e) =>{
        setOtp(e.target.value)
        setOtpError('')
        
    }
    
  
 
  
 
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
    const buttonStyle = {
        margin:"8px 0px",
        backgroundColor:"#5d5de7",
        width:"350px"
    }
    const fieldStyle = {
        margin:"8px 0px",
        width:"350px"
    }
    const otpFieldHide = {
        display: "none"
    }
    const otpFieldShow = {
        display: "block"
    }

    // useEffect(() => {
    //     otpGenerate()
    // },[email,otpGenerate])
    //Submit
    const handleSubmit = async(e) =>{
        e.preventDefault()
        if(!email){
            setEmailError("Please enter email id")
        }
       
        if(!otp && email ){
            
           
            let result = await axios.post('http://localhost:5000/user/forgotpassword',{
                email:email,
                otp:otp
            })
            .then(result =>{
                console.log(result);
                toast.success(result.data.message)
                 setOtpFieldShow(true)
                 setFieldName('Varify OTP')
                // setOtp(result.data.data.otp)
                 
                setOTPNo(result.data.data.otp)  
              
            })
            .catch(err => {
                console.log(err.response.data)
                // setError(err.response.data.message)
                toast.error(err.response.data.message)
            })
        }
        if(otp){
            if(OTPNo == otp){
                toast.success("OTP is Varified")
                navigate('/newpassword')
            } else{
                toast.error("OTP is invalid")
            }
        }
    
        // if(!emailError){
        //     otpGenerate()
        //     let o = document.querySelector("#otp")
        //     console.log(o);
        //     o.classList.remove('otpFieldHide')
        //     o.classList.add('otpFieldShow')
        //     o.style.display ="block"
        // }
        // if(email && !otp){
        //     otpGenerate()
        // }
      
    }
  return (
    <Grid >
        <Grid elevation={10} style={paperStyle}>
            <Grid align='center'>
                <h3>Forgot Password</h3>
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
            { 
                OtpFieldShow &&
                <TextField 
                className='otpFieldHide'
                id="otp" 
                label="OTP" 
                name='otp'
                type='text'
                placeholder="Enter your OTP"
                variant="outlined"
                // fullWidth
                style={fieldStyle}
                onChange={onChangeOtp}
                error={otpError}
                helperText={otpError}
            />
            }
            

            <Button 
                type='submit'
                variant="contained"
                // color="primary"
                fullWidth
                style={buttonStyle}
                onClick={handleSubmit}
            >
            {fieldName}</Button>
        </Grid>
        <ToastContainer />
    </Grid>
  )
}

export default ForgotPassword