import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Grid, TextField, Button, Typography, Link } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../app/Slice/authSlice";
import { instructorLoginInstance } from "../instances/InstructorInstance";

const Login = () => {
  // const {storeTokenInLS} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  // const [avatar, setImage] = useState({
  //   placeholder: null,
  //   file: null,
  // });

  //Redux
  const dispatch = useDispatch();

  const handleSignup = () => {
    navigate("/");
  };
  const [imgError, setImageError] = useState("");

  //Style
  const paperStyle = {
    padding: 20,
    height: "90vh",
    width: 280,
    margin: "20px auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  };
  const buttonStyle = {
    margin: "8px 0px",
    backgroundColor: "#5d5de7",
    width: "350px",
  };
  const fieldStyle = {
    margin: "8px 0px",
    width: "350px",
  };
  //Regex
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
  //Input Field
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
    if (!isValidEmail.test(email)) {
      setEmailError("Please enter valid email.");
    }
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };
  //Login Validation

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError("Email is required");
    }
    if (!password) {
      setPasswordError("Password is required");
    }
    if (email && password) {
      const payload = {
        email: email,
        password: password,
      };
      await instructorLoginInstance(payload)
        .then((response) => {
          // debugger;
          console.log(response);
          if (
            response.data.message === "Password does not match." ||
            response.data.message === "Email does not exists"
          ) {
            toast.error(response.data.message);
          } else {
            if (response) {
              if (response) {
                localStorage.setItem(
                  "accessToken",
                  JSON.stringify(response.data.accessToken)
                );
                // storeTokenInLS(result.data.data.accessToken)
                const user = {
                  email: email,
                };
                const accessToken = response.data.accessToken;
                dispatch(login({ user, accessToken }));
              }
            }
            console.log("accessToken", response.accessToken);

            toast.success(response.message);
            setTimeout(() => {
              navigate("/db");
            }, 2000);
          }
        })
        .catch((err) => {
          console.log(err);
          // setError(err.response.data.message)
          toast.error(err.response);
          setTimeout(() => {
            //   setError("")
          }, 5000);
        });
    }
  };
  return (
    <Grid>
      <Grid elevation={10} style={paperStyle}>
        <Grid align="center">
          <h3>Sign in</h3>
        </Grid>
        <TextField
          id="outlined-basic"
          name="email"
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
          name="password"
          type="password"
          placeholder="Enter your Password"
          variant="outlined"
          // fullWidth
          style={fieldStyle}
          onChange={onChangePassword}
          error={passwordError}
          helperText={passwordError}
        />

        <Button
          type="submit"
          variant="contained"
          // color="primary"
          fullWidth
          style={buttonStyle}
          onClick={handleSubmit}
        >
          Sign in
        </Button>
        <Typography>
          <Link href="/forgotpassword" underline="none">
            Forgot password?
          </Link>
        </Typography>
        <Typography onClick={handleSignup}>
          <p underline="none">Create new account</p>
        </Typography>
      </Grid>
      <ToastContainer />
    </Grid>
  );
};

export default Login;
