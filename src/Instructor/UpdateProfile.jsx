import React from "react";
import {
  Box,
  Button,
  TextField,
  Avatar,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import Topbar from "../scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import Loading from "../scenes/global/Loading";

import {
  getInstructorInfoInstance,
  updateInstructorInfoInstance,
} from "../instances/InstructorInstance";

const UpdateProfile = () => {
  useEffect(() => {
    getInstructorInfo();
  }, []);

  const [loading, setLoading] = useState(true);
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

  const [linkedInLink, setLinkedInLink] = useState("");
  const [linkedInLinkError, setLinkedInLinkError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [genderError, setGenderError] = useState("");

  const [, setError] = useState("");

  //Image
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [, setImgURL] = useState("");
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
  // const getFile = () =>{

  // }
  const getInstructorInfo = async () => {
    try {
      let response = await getInstructorInfoInstance()
        .then((response) => {
          console.log(response);
          console.log(response);
          localStorage.getItem("name");
          setName(response.name);
          setId(response._id);
          setFileName(response.profileImg);
          setEmail(response.email);
          setMobile(response.mobile);
          setPassword(response.password);
          setLinkedInLink(response.linkedin);
          setGender(response.gender);
          setLoading(false);
          setUserPhoto(response.profileImg);
          console.log(id);
        })
        .catch((err) => {
          console.log(err.response);
        });
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

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

    if (!gender) {
      setGenderError("Gender is required");
    }
    if (!linkedInLink) {
      setLinkedInLinkError("LinkedIn profile link is required");
    }
    try {
      const formDataImg = new FormData();
      formDataImg.append("file", file);
      formDataImg.append("upload_preset", "olpsdimages");
      formDataImg.append("cloud_name", "nishitproject");
      // setImgName(imgFile.name);
      console.log(file);
      let urlImg = "";
      const imgUploaded = await axios
        .post(
          "https://api.cloudinary.com/v1_1/nishitproject/image/upload",
          formDataImg
        )
        .then((result) => {
          // console.log(imgUploaded);
          setImgURL(result.data.url);
          urlImg = result.data.url;
          console.log(result.data.url);
          console.log(result);
          // console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("linkedin", linkedInLink);
      formData.append("gender", gender);
      formData.append("mobile", mobile);
      // formData.append("file", file);
      formData.append("profileImg", urlImg);
      localStorage.setItem("profilepic", urlImg);

      await updateInstructorInfoInstance(formData, id)
        .then((response) => {
          console.log(response);
          if (response) {
            // const user = response.data.user;
            // dispatch(setUser(user));
            console.log(formData);
            toast.success("Profile updated Successfully!", {
              autoClose: 2000,
            });
            setTimeout(() => {
              getInstructorInfo();
              //   navigate("/db");
            }, 2000);
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
        <Topbar setIsSidebar={setIsSidebar} />
        <Box height="100vh" width="100%">
          <Box>
            <Loading show={loading} />
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
                    src={userphoto}
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
