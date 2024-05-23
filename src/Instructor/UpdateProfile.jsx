import React from "react";
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
import AddIcon from "@mui/icons-material/Add";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import { tokens } from "../../theme";
import Topbar from "../scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";
import Header from "../components/Header";
// import { ColorModeContext, useMode } from "../../theme";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { addImage } from "../app/Slice/imageSlice";
const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    getInstructorInfo();
  }, []);
  const todos = useSelector((state) => state.image);
  const [isSidebar, setIsSidebar] = useState(true);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
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
  const [linkedInLink, setLinkedInLink] = useState("");
  const [linkedInLinkError, setLinkedInLinkError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [profileImg, setprofileImg] = useState("");
  const [avatar, setImage] = useState({
    placeholder: null,
    file: null,
  });
  const [error, setError] = useState("");
  const [imgError, setImageError] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const isPasswordValid =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
  const isPhoneNoValid = /^\d{10}$/;
  const genderInput = ["male", "Female", "Others"];

  //On Change Functions
  const onChangeName = (e) => {
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
    if (!isPasswordValid.test(password)) {
      setPasswordError(
        "Password must be greater than 8 characters & contain minimum 1 special charater & number."
      );
    } else {
      setPasswordError("");
    }
  };
  const onChangeLinkedinLink = (e) => {
    setLinkedInLink(e.target.value);
    setLinkedInLinkError("");
  };
  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    setUserPhotoError("");
    // console.log(e.target.files[0].name);
    console.log(e.target.files[0]);
    // console.log(e.target.files[0].path);
  };
  const getInstructorInfo = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      //   setCourseId(courseid);
      //   console.log(courseid);
      let result = await axios
        .get(`http://localhost:5000/instructor/get`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log(result);
          console.log(result.data.data);
          localStorage.getItem("name");
          //   console.log(courseId);
          setName(result.data.data.name);
          setId(result.data.data._id);
          setFileName(result.data.data.profileImg);
          setEmail(result.data.data.email);
          setMobile(result.data.data.mobile);
          setPassword(result.data.data.password);
          setLinkedInLink(result.data.data.linkedin);
          setGender(result.data.data.gender);
          console.log(id);
        })
        .catch((err) => {
          console.log(err.response);
          console.log(accessToken);
          console.log(id);
        });
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  // const handleImageChange = (event) => {
  //   // const localFile = event.target.files[0]
  //   console.log(event.target.files[0]);
  //   if (
  //     event.target.files[0].type === "image/png" ||
  //     event.target.files[0].type === "image/jpeg"
  //   ) {
  //     //Preview Show
  //     setImageError("");
  //     const reader = new FileReader();
  //     reader.onload = (r) => {
  //       setImage({
  //         placeholder: r.target.result,
  //         file: event.target.files[0],
  //       });
  //       setprofileImg(r.target.result);
  //       setUserPhotoError("");
  //       // dispatch(addImage(r.target.result));
  //       // localStorage.setItem("profilepic", r.target.result);
  //     };
  //     const imgfile = event.target.files[0];
  //     reader.readAsDataURL(imgfile);
  //     console.log(imgfile);
  //     console.log(profileImg);
  //     //readAsDataURL : file in anadar src ma value store kare.
  //   } else {
  //     setImageError("Invalid File");
  //     avatar.file = null;
  //   }
  // };
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name) {
      setNameError("Name is required.");
    } else {
      setNameError("");
    }
    if (!email) {
      setEmailError("Email is required.");
    }
    if (!fileName) {
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
    if (!password) {
      setPasswordError("Password is required");
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
    }
    if (!gender) {
      setGenderError("Gender is required");
    }
    if (!linkedInLink) {
      setLinkedInLinkError("LinkedIn profile link is required");
    }
    // if (name) {
    //   todos.map((e) => {
    //     console.log(e.id);
    //     console.log(e.image);
    //   });
    // }
    try {
      // const fields = {
      //   name: name,
      //   email: email,
      //   password: password,
      //   linkedin: linkedInLink,
      //   gender: gender,
      //   mobile: mobile,
      //   profileImg: courseImg,
      // };
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("linkedin", linkedInLink);
      formData.append("gender", gender);
      formData.append("mobile", mobile);
      formData.append("file", file);
      formData.append("profileImg", fileName);
      localStorage.setItem("profilepic", fileName);
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      await axios
        .patch(`http://localhost:5000/instructor/update/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          if (response) {
            if (response.data) {
              // const user = response.data.user;
              // dispatch(setUser(user));
              console.log(formData);
              toast.success("Profile updated Successfully!");
              setTimeout(() => {
                navigate("/db");
              }, 2000);
            }
          }
          localStorage.setItem("name", name);
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
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Box height="100vh" width="100%">
          <Topbar setIsSidebar={setIsSidebar} />
          <Box>
            <Box m="10px">
              {/* HEADER */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Header title="Update Profile" subtitle="Your Profile" />
              </Box>
              <Box
                padding="10px"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <input
                  style={{ display: "none" }}
                  id="file"
                  type="file"
                  onChange={onChangeFile}
                />
                <label htmlFor="file" style={{ cursor: "pointer" }}>
                  <Avatar
                    alt="User Photo"
                    src={`http://localhost:5000/uploads/${fileName}`}
                    sx={{
                      width: 100,
                      height: 95,
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
                      id="file"
                      type="file"
                      onChange={onChangeFile}
                    />
                  </Avatar>
                </label>
                {userPhotoError && (
                  <p style={{ color: "red" }}>{userPhotoError}</p>
                )}
              </Box>
              <Box
                display="grid"
                gap="16px"
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
                  onChange={onChangeName}
                  value={name}
                  name="name"
                  sx={{ m: 1, minWidth: 125 }}
                  error={nameError}
                  helperText={nameError}
                  // sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  variant="filled"
                  type="text"
                  label="email"
                  onChange={onChangeEmail}
                  value={email}
                  name="email"
                  // onBlur={handleBlur}
                  error={emailError}
                  helperText={emailError}
                  sx={{ gridColumn: "span 4", m: 1, minWidth: 125 }}
                />

                <TextField
                  variant="filled"
                  type="Number"
                  label="Mobile Number"
                  // onBlur={handleBlur}
                  onChange={onChangeMobile}
                  value={mobile}
                  name="Mobile"
                  error={mobileError}
                  helperText={mobileError}
                  sx={{ gridColumn: "span 4", m: 1, minWidth: 125 }}
                />
                <TextField
                  variant="filled"
                  type="password"
                  label="Password"
                  onChange={onChangePassword}
                  value={password}
                  name="password"
                  // onBlur={handleBlur}
                  error={passwordError}
                  helperText={passwordError}
                  sx={{ gridColumn: "span 4", m: 1, minWidth: 125 }}
                />
                <TextField
                  variant="filled"
                  type="text"
                  label="LinkedIn Link"
                  multiline
                  maxRows={5}
                  onChange={onChangeLinkedinLink}
                  value={linkedInLink}
                  name="LinkedIn Link"
                  error={linkedInLinkError}
                  helperText={linkedInLinkError}
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
                    {genderInput.map((opts, i) => (
                      <MenuItem key={i} value={opts}>
                        {opts}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateField"]}>
                <DateField
                  label="Deadline of Course"
                  value={dayjs(deadline)}
                  format="DD-MM-YYYY"
                  fullWidth
                  sx={{ gridColumn: "span 4", m: 1, minWidth: 120 }}
                  variant="filled"
                  // defaultValue={dayjs("2022-04-17")}
                  onChange={onChangeDeadline}
                />
              </DemoContainer>
            </LocalizationProvider> */}
              </Box>
              <Box display="flex" justifyContent="center" mt="20px">
                <Button variant="contained" onClick={handleUpdate}>
                  {/* color="secondary" */}
                  Update
                </Button>
              </Box>
              <ToastContainer />
            </Box>
          </Box>
        </Box>
      </main>
    </div>
  );
};

export default UpdateProfile;
