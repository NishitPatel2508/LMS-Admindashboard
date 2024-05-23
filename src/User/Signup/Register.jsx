import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { Country } from "country-state-city";
import { State } from "country-state-city";
import { City } from "country-state-city";
const Register = (props) => {
  //Input Fields
  let country_isoCode;
  let states;
  let countrydata;
  let cities;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [pinCode, setpinCode] = useState("");
  const [userType, setUserType] = useState("");
  //For All Countries
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  //WORK WITH country-state-city package

  countrydata = Country.getAllCountries();

  const [countryData, setCountryData] = useState(countrydata);
  const [stateData, setStateData] = useState(null);
  // const [stateValue,setStateValue] = useState(false)
  const [cityData, setCityData] = useState();
  const [stateName, setStateName] = useState(null);
  const [countryName, setCountryName] = useState(null);

  const [firstnNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [cityError, setCityError] = useState("");
  const [stateError, setStateError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [pinCodeError, setPinCodeError] = useState("");
  const [userTypeError, setUserTypeError] = useState("");
  const [error, setError] = useState("");

  //AutoComplete MUI
  const genderInput = ["Male", "Female", "Others"];
  const userTypeInput = ["Student", "Employee", "Others"];

  //Validation
  const isPasswordValid =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;

  const navigate = useNavigate();

  //OnChange Function of Input Fields
  const onChangeCountry = (e) => {
    setCountry(e.target.value);
    setCountryName(e.target.value.name);
    console.log(e.target.value.isoCode);
    states = State.getStatesOfCountry(e.target.value.isoCode);
    console.log(states);
    country_isoCode = e.target.value.isoCode;
    setStateData(states);
    setCountryError("");
  };
  const onChangeState = (e) => {
    if (country) {
      console.log(country);

      country_isoCode = country.isoCode;
      console.log(country_isoCode);
      console.log();
    }
    setState(e.target.value);
    console.log();
    setStateName(e.target.value.name);
    cities = City.getCitiesOfState(country_isoCode, e.target.value.isoCode);
    setCityData(cities);
    setStateError("");
  };
  const onChangeCity = (e) => {
    setCity(e.target.value);

    setCityError("");
  };
  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
    setFirstNameError("");
  };
  const onChangeLastName = (e) => {
    setLastName(e.target.value);
    setLastNameError("");
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
    if (!isValidEmail.test(email)) {
      setEmailError("Please enter valid email.");
    }
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);

    if (!isPasswordValid.test(password)) {
      setPasswordError(
        "Password must be greater than 8 characters & contain minimum 1 special charater & number."
      );
    } else {
      setPasswordError("");
    }
  };
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);

    if (password !== e.target.value) {
      setConfirmPasswordError("Confirm password must be match with password");
    } else {
      setConfirmPasswordError("");
    }
  };

  const onChangemobile = (e) => {
    setMobile(e.target.value);
    if (e.target.value.length < 10 || e.target.value.length > 10) {
      setMobileError("Phone Number must be in 10 digits.");
    } else {
      setMobileError("");
    }
  };
  const onChangeUserType = (e) => {
    setUserType(e.target.value);
    setUserTypeError("");
  };
  const onChangeGender = (e) => {
    setGender(e.target.value);
    setGenderError("");
  };
  const onChangePinCode = (e) => {
    setpinCode(e.target.value);
    setPinCodeError("");
  };
  //useeffect for state

  //useEffect
  //For Countries
  // useEffect(() =>{
  //   axios
  //        .get('http://localhost:5000/allCountry')
  //        .then((response) =>{
  //           console.log(response.data.country)
  //           setCountry(response.data.country)

  //   })
  //   },[])
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName) {
      setFirstNameError("Firstname is required.");
    } else {
      setFirstNameError("");
    }
    if (!lastName) {
      setLastNameError("lastname is required.");
    }
    if (!email) {
      setEmailError("Email is required.");
    }
    if (!password) {
      setPasswordError("Password is required.");
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is required.");
    }
    if (!mobile) {
      setMobileError("Phone Number is required.");
    }

    if (!gender) {
      setGenderError("Gender is required.");
    }
    if (!userType) {
      setUserTypeError("User Type is required.");
    }
    if (!country) {
      setCountryError("Country is required.");
    }
    if (!city) {
      setCityError("City is required.");
    }
    if (!state) {
      setStateError("State is required.");
    }
    if (!pinCode) {
      setPinCodeError("Pincode is required.");
    }

    if (
      firstName.length > 0 &&
      lastName.length > 0 &&
      email.length > 0 &&
      mobile &&
      password.length > 0 &&
      confirmPassword &&
      gender &&
      country &&
      city &&
      state &&
      pinCode.length > 0 &&
      userType.length > 0 &&
      isPasswordValid.test(password) &&
      mobile.length === 10 &&
      isValidEmail.test(email)
    ) {
      const header = { "Access-control-Allow-Origin": "*" };

      let result = await axios
        .post("http://localhost:5000/users/createuser", {
          firstname: firstName,
          lastname: lastName,
          email: email,
          password: password,
          gender: gender,
          mobile: mobile,
          country: countryName,
          city: city,
          state: stateName,
          userType: userType,
          pincode: pinCode,
          header,
        })
        .then((result) => {
          console.log(result);
          console.log("firstname: ", firstName);
          localStorage.firstname = firstName;
          toast.success("User Registration successfully !");
          setTimeout(() => {
            navigate("/login");
          }, 6000);
        })
        .catch((err) => {
          console.log(err.response.data);
          setError(err.response.data.message);
          toast.error(err.response.data.message);
          setTimeout(() => {
            setError("");
          }, 5000);
        });
    }
  };

  return (
    <div className="container register">
      <div className=" ">
        <form className="row " onSubmit={handleSubmit}>
          <h1 className="text-center">Register</h1>
          <div className="row mt-3">
            <div className="col-md-4 ">
              <TextField
                fullWidth
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                onChange={onChangeFirstName}
              />
              <text className="errorcss">{firstnNameError}</text>
            </div>
            <div className="col-md-4">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                onChange={onChangeLastName}
              />
              <text className="errorcss">{lastNameError}</text>
            </div>

            <div className="col-sm-6 mt-4">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Email"
                variant="outlined"
                onChange={onChangeEmail}
              />
              <text className="errorcss">{emailError}</text>
            </div>

            <div className="col-sm-6 mt-4">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                name="mobile"
                onChange={onChangemobile}
              />
              <text className="errorcss">{mobileError}</text>
            </div>

            <div className="col-md-6 mt-4">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Password"
                type="password"
                variant="outlined"
                onChange={onChangePassword}
              />
              <div className="errorcss">{passwordError}</div>
            </div>

            <div className="col-md-6 mt-4">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Confirm Password"
                type="password"
                variant="outlined"
                onChange={onChangeConfirmPassword}
              />
              <div className="errorcss">{confirmPasswordError}</div>
            </div>

            <div className="col-md-6 mt-4">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={gender}
                  label="Gender"
                  onChange={onChangeGender}
                >
                  {genderInput.map((opts, i) => (
                    <MenuItem key={i} value={opts}>
                      {opts}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div className="errorcss">{genderError}</div>
            </div>
            <div className="col-md-6 mt-4">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={userType}
                  label="User Type"
                  onChange={onChangeUserType}
                >
                  {userTypeInput.map((opts, i) => (
                    <MenuItem key={i} value={opts}>
                      {opts}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div className="errorcss">{userTypeError}</div>
            </div>

            <div className="col-md-6 mt-4">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={country}
                  label="Country"
                  onChange={onChangeCountry}
                >
                  {countryData &&
                    countryData.map((opts, i) => (
                      <MenuItem key={i} value={opts}>
                        {opts.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <div className="errorcss">{countryError}</div>
            </div>
            <div className="col-md-6 mt-4">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">State</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={state}
                  label="State"
                  onChange={onChangeState}
                >
                  {
                    stateData &&
                      stateData.map((opts, i) => (
                        <MenuItem key={i} value={opts}>
                          {opts.name}
                        </MenuItem>
                      ))
                    // <MenuItem value={stateData}>{stateData}</MenuItem>
                  }
                </Select>
              </FormControl>

              <div className="errorcss">{stateError}</div>
            </div>

            <div className="col-md-6 mt-4">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">City</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={city}
                  label="City"
                  onChange={onChangeCity}
                >
                  {cityData &&
                    cityData.map((opts, i) => (
                      <MenuItem key={i} value={opts.name}>
                        {opts.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <div className="errorcss">{cityError}</div>
            </div>

            <div className="col-md-6 mt-4">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Pin Code"
                variant="outlined"
                onChange={onChangePinCode}
              />

              <div className="errorcss">{pinCodeError}</div>
            </div>
          </div>
          <div className="row mt-4 mb-3">
            <div className="col-12 signupBtn">
              <button className="btn btn-primary " type="submit">
                Sign Up
              </button>
            </div>
          </div>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};
export default Register;
