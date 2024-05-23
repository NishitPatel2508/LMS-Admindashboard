import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  createTheme,
  Link,
  Avatar,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [error, setError] = useState("");
  const isPasswordValid =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  const navigate = useNavigate();
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
  const onChangePassword = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    if (!isPasswordValid.test(passwordValue)) {
      setPasswordError(
        "Password must be 8-16 characters and contain at least one special character and one number."
      );
    } else {
      setPasswordError("");
    }
  };
  const onChangeConfirmPassword = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);
    if (password !== confirmPasswordValue) {
      setConfirmPasswordError("Confirmation does not match the new password.");
    } else {
      setConfirmPasswordError("");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      setPasswordError("Write down new password.");
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Write down confirmed new password.");
    }
    if (
      password &&
      confirmPassword &&
      isPasswordValid.test(password) &&
      password === confirmPassword
    ) {
      try {
        const payload = {
          password: password,
          confirmPassword: confirmPassword,
        };
        const response = await axios.post(
          "http://localhost:3000/user/newpassword",
          payload
        );
        if (response.data && response.data.accessToken) {
          localStorage.setItem(
            "accessToken",
            JSON.stringify(response.data.accessToken)
          );
          toast.success("Password reset successfully!");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "An error occurred during password reset.";
        toast.error(errorMessage);
      }
    }
  };
  return (
    <Grid >
        <Grid elevation={10} style={paperStyle}>
            <Grid align='center'>
                <h3>Set New Password</h3>
            </Grid>
            <TextField 
                id="outlined-basic" 
                name='email'
                label="Email" 
                placeholder="Enter your Email ID"
                variant="outlined"
                // fullWidth
                style={fieldStyle}
                onChange={onChangePassword}
                error={passwordError}
                helperText={passwordError}
            />
          
                <TextField 
                // className='otpFieldHide'
                id="otp" 
                label="OTP" 
                name='otp'
                type='text'
                placeholder="Enter your OTP"
                variant="outlined"
                // fullWidth
                style={fieldStyle}
                onChange={onChangeConfirmPassword}
                error={confirmPasswordError}
                helperText={confirmPasswordError}
            />
            
            

            <Button 
                type='submit'
                variant="contained"
                // color="primary"
                fullWidth
                style={buttonStyle}
                onClick={handleSubmit}
            >
            Set New Password</Button>
        </Grid>
        <ToastContainer />
    </Grid>
  );
};
export default NewPassword;