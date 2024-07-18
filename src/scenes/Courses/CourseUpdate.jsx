import { Box, Typography, useTheme, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from "dayjs";
import React from "react";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { baseURL, BLOB_READ_WRITE_TOKEN } from "../../basic";

import { put } from "@vercel/blob";
import {
  handleSingleCourse,
  handleUpdateCourse,
} from "../../instances/Course/CourseInstance";
import { getAllCategoryInstance } from "../../instances/CategoryInstance";
import { getAllSubCategoryInstance } from "../../instances/SubCategoryInstance";
import { getAllProgrammingLanguageInstance } from "../../instances/ProgrammingLangauageInstance";
import { getAllLanguagesInstance } from "../../instances/LanguagesInstance";

const CourseUpdate = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  const [singleCourse, setSingleCourse] = useState([]);
  const [courseId, setCourseId] = useState("");

  const [name, setName] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [programmingLanguage, setProgrammingLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [language, setLanguage] = useState("");
  const [overview, setOverview] = useState("");
  const [description, setDescription] = useState("");
  const [requirement, setRequirement] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [allSubCategory, setAllSubCategory] = useState([]);
  const [allProgrammingLanguage, setAllProgrammingLanguage] = useState([]);
  const [allLanguages, setAllLanguages] = useState([]);
  const [courseImg, setCourseImg] = useState("");
  const [avatar, setImage] = useState({
    placeholder: null,
    file: null,
  });

  const [imgError, setImageError] = useState("");
  const [file, setFile] = useState("");

  const [imgName, setImgName] = useState("");
  const [imgURL, setImgURL] = useState("");

  const navigate = useNavigate();

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 2,
    whiteSpace: "nowrap",
    width: 1,
  });

  let urlImg = "";
  const handleProfileImageChange = async (event) => {
    // const localFile = event.target.files[0]
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    // Db stores the url provided by vercel blob
    if (
      event.target.files[0].type === "image/png" ||
      event.target.files[0].type === "image/jpeg"
    ) {
      //Cloudinary
      //Preview Show
      setImgName(event.target.files[0].name);
      setImageError("");
      const reader = new FileReader();
      reader.onload = (r) => {
        setImage({
          placeholder: r.target.result,
          file: event.target.files[0],
        });
        // setprofileImg(r.target.result);
      };

      const formDataImg = new FormData();
      formDataImg.append("file", event.target.files[0]);
      formDataImg.append("upload_preset", "olpsdimages");
      formDataImg.append("cloud_name", "nishitproject");
      const response = await axios
        .post(
          "https://api.cloudinary.com/v1_1/nishitproject/image/upload",
          formDataImg
        )
        .then((response) => {
          // console.log(imgUploaded);

          console.log(response);
          setImgURL(response.data.url);
          urlImg = response.data.url;
          setCourseImg(response.data.url);
          console.log(response.data.url);
          // console.log(response);
          // if (urlImg == "") {
          //   // setCourseImg(urlImg);
          //   urlImg = courseImg;
          // }
        })
        .catch((err) => {
          console.log(err);
        });
      // const imgfile = event.target.files[0];
      // const url = URL.createObjectURL(imgfile);
      // console.log("uuuu", url);
      // setImgFinale(url);
      // reader.readAsDataURL(imgfile);

      // console.log(imgfile);
      // console.log(avatar.placeholder);
      // const courseImg = avatar.placeholder;

      //readAsDataURL : Store the value inside the file.
    } else {
      setImageError("Invalid File");
      avatar.file = null;
    }
  };
  useEffect(() => {
    getSingleCourse();
    getAllCategory();
    getAllSubCategory();
    getAllProgrammingLanguage();
    getAllLanguages();
  }, []);

  //
  const onChangeCourseName = (e) => {
    setName(e.target.value);
  };
  const onChangeCategory = (e) => {
    setCategoryName(e.target.value);
    console.log(e.target.value);
  };
  const onChangeSubCategory = (e) => {
    setSubCategory(e.target.value);
    console.log(e.target.value);
  };
  const onChangeProgrammingLanguage = (e) => {
    setProgrammingLanguage(e.target.value);
  };
  const onChangeLanguage = (e) => {
    setLanguage(e.target.value);
  };
  const onChangeLevel = (e) => {
    setLevel(e.target.value);
  };
  const onChangeOverview = (e) => {
    setOverview(e.target.value);
  };
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const onChangeRequirement = (e) => {
    setRequirement(e.target.value);
  };
  const onChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const onChangeDiscount = (e) => {
    setDiscount(e.target.value);
  };

  const onChangeDeadline = (newValue) => {
    setDeadline(newValue ? newValue.toDate() : null);
    // setJoiningDateError("");
    console.log(newValue);
  };
  const getAllCategory = async () => {
    try {
      const data = await getAllCategoryInstance();
      setAllCategory(data);
    } catch (error) {
      console.error("Error during Get All Category:", error);
    }
  };
  const getAllSubCategory = async () => {
    try {
      const data = await getAllSubCategoryInstance();
      setAllSubCategory(data);
    } catch (error) {
      console.error("Error during subCategory:", error);
    }
  };
  const getAllProgrammingLanguage = async () => {
    try {
      const data = await getAllProgrammingLanguageInstance();
      setAllProgrammingLanguage(data);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  const getAllLanguages = async () => {
    try {
      const data = await getAllLanguagesInstance();
      setAllLanguages(data);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  const allLevel = ["Expert", "Intermediate", "Beginner"];
  const getSingleCourse = async () => {
    try {
      const id = localStorage.getItem("courseid");
      let res = await handleSingleCourse(id);
      setSingleCourse(res);
      setCourseImg(res.courseImg);
      setName(res.name);
      setCategoryName(res.category._id);
      setSubCategory(res.subCategory._id);
      setProgrammingLanguage(res.programmingLanguage._id);
      setLanguage(res.language._id);
      setLevel(res.level);
      setDescription(res.description);
      setOverview(res.overview);
      setRequirement(res.requirement);
      setPrice(res.price);
      setDiscount(res.discount);
      setDeadline(res.deadline);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const courseid = localStorage.getItem("courseid");

      const id = courseid;

      const fields = {
        id: courseid,
        name: name,
        category: categoryName,
        subCategory: subCategory,
        programmingLanguage: programmingLanguage,
        level: level,
        overview: overview,
        description: description,
        requirement: requirement,
        price: price,
        discount: discount,
        language: language,
        deadline: deadline,
        courseImg: courseImg,
      };
      try {
        const data = await handleUpdateCourse(fields, id);
        toast.success("Updated successfully", { autoClose: 2000 });
        setTimeout(() => {
          navigate("/courses");
        }, 2500);
      } catch (e) {
        console.log("ttt", e);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  return (
        <Box m="20px">
          {/* HEADER */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header title="Courses" subtitle="Update Your Course" />
          </Box>
          <Box>
            {/* <Box> */}
            <img
              style={{ objectFit: "contain" }}
              height={290}
              width={290}
              src={courseImg}
              alt=""
              // sx={{ m: 1, minWidth: 125 }}
            />
            {/* </Box> */}
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{ m: 1, minWidth: 125 }}
            >
              Update Image
              <VisuallyHiddenInput
                type="file"
                onChange={handleProfileImageChange}
              />
            </Button>
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
              label="Course Name"
              // onBlur={handleBlur}
              onChange={onChangeCourseName}
              value={name}
              name="name"
              sx={{ m: 1, minWidth: 125 }}
              // error={!!touched.firstName && !!errors.firstName}
              // helperText={touched.firstName && errors.firstName}
              // sx={{ gridColumn: "span 2" }}
            />
            <FormControl variant="filled" sx={{ m: 1, minWidth: 125 }}>
              <InputLabel id="demo-simple-select-filled-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={categoryName}
                onChange={onChangeCategory}
              >
                {allCategory.map((opt, i) => (
                  <MenuItem key={i} value={opt._id}>
                    {opt.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 125 }}>
              <InputLabel id="demo-simple-select-filled-label">
                Subcategory
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={subCategory}
                onChange={onChangeSubCategory}
              >
                {allSubCategory.map((opt, i) => (
                  <MenuItem key={i} value={opt._id}>
                    {opt.subCategoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 125 }}>
              <InputLabel id="demo-simple-select-filled-label">
                Programming Language
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={programmingLanguage}
                onChange={onChangeProgrammingLanguage}
              >
                {allProgrammingLanguage.map((opt, i) => (
                  <MenuItem key={i} value={opt._id}>
                    {opt.programmingLanguageName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 125 }}>
              <InputLabel id="demo-simple-select-filled-label">
                Language
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={language}
                onChange={onChangeLanguage}
              >
                {allLanguages.map((opt, i) => (
                  <MenuItem key={i} value={opt._id}>
                    {opt.languageName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 125 }}>
              <InputLabel id="demo-simple-select-filled-label">
                Level
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={level}
                onChange={onChangeLevel}
              >
                {allLevel.map((opt, i) => (
                  <MenuItem key={i} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              variant="filled"
              type="Number"
              label="Price"
              // onBlur={handleBlur}
              onChange={onChangePrice}
              value={price}
              name="price"
              // error={!!touched.contact && !!errors.contact}
              // helperText={touched.contact && errors.contact}
              sx={{ gridColumn: "span 4", m: 1, minWidth: 125 }}
            />
            <TextField
              variant="filled"
              type="Number"
              label="Discount"
              // onBlur={handleBlur}
              onChange={onChangeDiscount}
              value={discount}
              name="discount"
              // error={!!touched.contact && !!errors.contact}
              sx={{ gridColumn: "span 4", m: 1, minWidth: 125 }}
            />
            <TextField
              variant="filled"
              type="text"
              label="Overview"
              multiline
              maxRows={5}
              onChange={onChangeOverview}
              value={overview}
              name="address1"
              // error={!!touched.address1 && !!errors.address1}
              // helperText={touched.address1 && errors.address1}
              sx={{ gridColumn: "span 4", m: 1, minWidth: 125 }}
            />
            <TextField
              variant="filled"
              type="text"
              label="Description"
              multiline
              maxRows={5}
              onChange={onChangeDescription}
              value={description}
              name="description"
              // error={!!touched.address1 && !!errors.address1}
              // helperText={touched.address1 && errors.address1}
              sx={{ gridColumn: "span 4", m: 1, minWidth: 125 }}
            />
            <TextField
              // fullWidth
              variant="filled"
              type="text"
              label="Requirements"
              multiline
              maxRows={5}
              onChange={onChangeRequirement}
              value={requirement}
              name="requirement"
              // error={!!touched.address1 && !!errors.address1}
              // helperText={touched.address1 && errors.address1}
              sx={{ gridColumn: "span 4", m: 1, minWidth: 130 }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            </LocalizationProvider>
          </Box>
          <Box display="flex" justifyContent="center" mt="20px">
            <Button variant="contained" onClick={handleUpdate}>
              {/* color="secondary" */}
              Update
            </Button>
          </Box>
        <ToastContainer />
        </Box>

  );
};
export default CourseUpdate;
