import {
    Box,
    Button,
    TextField,
    Avatar,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    FormControl,
  } from "@mui/material";
  import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";
  import { ToastContainer, toast } from "react-toastify";
//   import { useDispatch, useSelector } from "react-redux";
//   import { setUser } from "../../reducers/userSlice";
  const Signup = () => {
    // const dispatch = useDispatch();
    // const accessToken = useSelector((state) => state.userReducer.accessToken);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [error, setError] = useState("");
    const [dob, setDob] = useState("");
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("");
    const [userphoto, setUserPhoto] = useState("");
    const [userPhotoError, setUserPhotoError] = useState(null);
    const [nameError, setNameError] = useState("");
    const [mobileError, setMobileError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [linkedInLink,setLinkedInLink] = useState("")
    const [linkedInLinkError,setLinkedInLinkError] = useState("")
    const [emailError, setEmailError] = useState("");
    const [genderError, setGenderError] = useState("");
      const [courseImg, setprofileImg] = useState("");
  const [avatar, setImage] = useState({
    placeholder: null,
    file: null,
  });

  const [imgError, setImageError] = useState("");
    const isPasswordValid = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    const isPhoneNoValid = /^\d{10}$/;
    const genderInput = ["Male", "Female", "Others"];
    
    //On Change Functions
    const onChangeFirstName = (e) => {
        setName(e.target.value);
      setNameError("");
    };
    const onChangeEmail = (e) => {
      setEmail(e.target.value);
      setEmailError("");
      if (!isValidEmail.test(e.target.value)) {
        setEmailError("Please enter a valid email.");
      }
    };
    const onChangeMobile = (e) => {
      setMobile(e.target.value);
      setMobileError("");
      if (!isPhoneNoValid.test(e.target.value)) {
        setMobileError("Phone number must be 10 digits.");
      }
    };
    const onChangeGender = (e) => {
      setGender(e.target.value);
      setGenderError("");
    };
    const onChangePassword = (e) => {
      setPassword(e.target.value);
      setPasswordError("");
      if(!isPasswordValid.test(password)){
          setPasswordError("Password must be greater than 8 characters & contain minimum 1 special charater & number.")
        } else{
            setPasswordError('')
        }
    };
    const onChangeconfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        setConfirmPasswordError("");
        if(password !== e.target.value){
            setConfirmPasswordError ("Confirm password must be match with password")
          } else{
            setConfirmPasswordError('')
          }
    };
    const onChangeLinkedinLink = (e) => {
        setLinkedInLink(e.target.value);
        setLinkedInLinkError("");
    };
    
    // const onChangeDob = (newValue) => {
    //   setDob(newValue ? newValue.toDate() : null);
    //   setDobError("");
    // };
    
    
    const navigate = useNavigate();

    //Image 
    
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
        localStorage.setItem("profilepic",r.target.result)
       
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
    

//   useEffect(() => {
//     //   fetchData();
//     }, []);
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!name) {
        setNameError("Name is required.");
      } else {
        setNameError("");
      }
      if (!email) {
        setEmailError("Email is required.");
      }
      if (!courseImg) {
        setUserPhotoError("Profile picture is required.");
      } else {
        setUserPhotoError("");
      }
      if (!mobile) {
        setMobileError("Phone number is required.");
      }
      if (!gender) {
        setGenderError("Gender is required.");
      }
      if(!password){
        setPasswordError("Password is required")
      }
      if(!confirmPassword){
        setConfirmPasswordError("Confirm password is required")
      }
      if(!gender){
        setGenderError("Gender is required")
      }
      if(!linkedInLink){
        setLinkedInLinkError("LinkedIn profile link is required")
      }
      try {
        const fields = {
            name: name,
            email:email,
            password:password,
            linkedin: linkedInLink,
            gender: gender,
            mobile:mobile,
            profileImg: courseImg,
          };
        // const formData = new FormData();
        await axios
          .post(`http://localhost:5000/instructor/create`, fields)
          .then((response) => {
            console.log(response);
            if (response) {

              if (response.data) {
                // const user = response.data.user;
                // dispatch(setUser(user));
                toast.success("User registred Successfully!");
                setTimeout(() => {
                  navigate("/login");
                }, 2000);
              }
            }
            
            localStorage.setItem("name",name)
          })
          .catch((err) => {
            toast.error(err.response.data.message);
            console.log(err.response.data);
            setError(err.response.data.message);
          });
      } catch (error) {
        console.error("Error during signup:", error);
        setError("An error occurred during sign up. Please try again later.");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    };
    return (
          <Box m="10px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Header
              title="REGISTER"
              subtitle=""
            />
            <Box backgroundColor="#ececec">

            <Box 
            padding="12px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center">

              <input
                accept="image/*"
                style={{ display: "none" }}
                id="userphoto"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="userphoto" style={{ cursor: "pointer" }}>
                <Avatar
                  alt="User Photo"
                  src={courseImg || undefined}
                  sx={{
                    width: 100,
                    height: 100,
                    backgroundColor: "lightgray",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="userphoto"
                    type="file"
                    onChange={handleImageChange}
                  />
                </Avatar>
              </label>
              {userPhotoError && <p style={{color:"red"}}>{userPhotoError}</p>}
            </Box>
            <Box
            display="grid"
            gap="25px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": {
                gridColumn: "span 2",
              },
            }}
          >
            <TextField
              variant="filled"
              type="text"
              label="Name"
              // onBlur={handleBlur}
              onChange={onChangeFirstName}
            //   value={name}
              name="name"
              sx={{ m: 1, minWidth: 245 }}
              error={nameError}
              helperText={nameError}
            //   sx={{ gridColumn: "span 2" }}
            />
            <TextField
              variant="filled"
              type="text"
              label="Email"
              // onBlur={handleBlur}
              onChange={onChangeEmail}
            //   value={email}
              name="email"
              error={emailError}
              helperText={emailError}
              sx={{ gridColumn: "span 4", m: 1, minWidth: 125 }}
            />
            <TextField
              variant="filled"
              type="password"
              label="Password"
              // onBlur={handleBlur}
              onChange={onChangePassword}
            //   value={discount}
              name="password"
              error={passwordError}
              helperText={passwordError} 
              sx={{ gridColumn: "span 4", m: 1, minWidth: 125 }}
            />
            <TextField
              variant="filled"
              type="password"
              label="Confirm Password"
              onChange={onChangeconfirmPassword}
              name="confirmpassword"
              error={confirmPasswordError}
              helperText={confirmPasswordError}           
              sx={{ gridColumn: "span 4", m: 1, minWidth: 125 }}
            />
            
            <FormControl variant="filled" sx={{ m: 1, minWidth: 125 }}>
              <InputLabel id="demo-simple-select-filled-label">
                Gender
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={gender}
                onChange={onChangeGender}
                error={genderError}
                helperText={genderError}  
              >
                {genderInput.map((opt, i) => (
                  <MenuItem key={i} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              variant="filled"
              type="text"
              label="Mobile Number"
              multiline
              maxRows={5}
              onChange={onChangeMobile}
            //   value={description}
              name="number"
              error={mobileError}
              helperText={mobileError}
              sx={{ gridColumn: "span 4", m: 1, minWidth: 125 }}
            />
            <TextField
              // fullWidth
              variant="filled"
              type="text"
              label="LinkedIn Profile Link"
              multiline
              maxRows={5}
              onChange={onChangeLinkedinLink}
            //   value={requirement}
              name="requirement"
              error={linkedInLinkError}
              helperText={linkedInLinkError}
              sx={{ gridColumn: "span 4", m: 1, minWidth: 130 }}
            />
            </Box>
                
          <Box display="flex" justifyContent="center" mt="20px">
            <Button variant="contained" onClick={handleSubmit}>
              {/* color="secondary" */}
              Signup
            </Button>
          </Box>
            </Box>
                

            <ToastContainer />
          </Box>
    );
  };
  export default Signup;
  
  
  
  
  
  
  
  
  

  
  
  
  