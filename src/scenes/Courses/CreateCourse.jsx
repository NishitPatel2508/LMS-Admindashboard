import React from "react";
import {
  Box,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  useTheme,
  Button,
  Link,
} from "@mui/material";
import { tokens } from "../../theme";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import Header from "../../components/Header";

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const CreateCourse = () => {
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
  const [nameError, setNameError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");
  const [programmingLanguageError, setProgrammingLanguageError] = useState("");
  const [languageError, setLanguageError] = useState("");
  const [deadlineError, setDeadlineError] = useState("");
  const [requirementError, setRequirementError] = useState("");
  const [overviewError, setOverviewError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [discountError, setDiscountError] = useState("");
  const [levelError, setLevelError] = useState("");

  const [courseImg, setprofileImg] = useState("");
  const [avatar, setImage] = useState({
    placeholder: null,
    file: null,
  });

  const [imgError, setImageError] = useState("");

  const navigate = useNavigate("");
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

  const handleProfileImageChange = (event) => {
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
      console.log(avatar.placeholder);
      const courseImg = avatar.placeholder;
      //readAsDataURL : file in anadar src ma value store kare.
    } else {
      setImageError("Invalid File");
      avatar.file = null;
    }
  };
  useEffect(() => {
    // getSingleCourse();
    getAllCategory();
    getAllSubCategory();
    getAllProgrammingLanguage();
    getAllLanguages();
  }, []);

  //OnChange Funcitons
  const onChangeCourseName = (e) => {
    setName(e.target.value);
    setNameError("");
  };
  const onChangeCategory = (e) => {
    setCategoryName(e.target.value);
    console.log(e.target.value);
    setCategoryError("");
  };
  const onChangeSubCategory = (e) => {
    setSubCategory(e.target.value);
    console.log(e.target.value);
    setSubCategoryError("");
  };
  const onChangeProgrammingLanguage = (e) => {
    setProgrammingLanguage(e.target.value);
    setProgrammingLanguageError("");
  };
  const onChangeLanguage = (e) => {
    setLanguage(e.target.value);
    setLanguageError("");
  };
  const onChangeLevel = (e) => {
    setLevel(e.target.value);
    setLevelError("");
  };
  const onChangeOverview = (e) => {
    setOverview(e.target.value);
    setOverviewError("");
  };
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
    setDescriptionError("");
  };
  const onChangeRequirement = (e) => {
    setRequirement(e.target.value);
    setRequirementError("");
  };
  const onChangePrice = (e) => {
    setPrice(e.target.value);
    setPriceError("");
  };
  const onChangeDiscount = (e) => {
    setDiscount(e.target.value);
    setDiscountError("");
  };

  const onChangeDeadline = (newValue) => {
    setDeadline(newValue ? newValue.toDate() : null);
    // setJoiningDateError("");
    console.log(newValue);
    setDeadlineError("");
  };
  const getAllCategory = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const id = localStorage.getItem("courseid");
      //   setCourseId(courseid);
      //   console.log(courseid);
      let result = await axios
        .get(`http://localhost:5000/getAllCategory`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log(result);
          console.log(result.data.data);
          console.log(courseId);
          setAllCategory(result.data.data);
          // console.log(allCategory);
          // console.log(arrayPrint());
          // convertToArray(result.data.data);
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
  const getAllSubCategory = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const id = localStorage.getItem("courseid");
      //   setCourseId(courseid);
      //   console.log(courseid);
      let result = await axios
        .get(`http://localhost:5000/getAllSubCategory`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log(result);
          console.log(result.data.data);
          console.log(courseId);
          setAllSubCategory(result.data.data);
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
  const getAllProgrammingLanguage = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const id = localStorage.getItem("courseid");
      //   setCourseId(courseid);
      //   console.log(courseid);
      let result = await axios
        .get(`http://localhost:5000/getAllProgrammingLanguage`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log(result);
          console.log(result.data.data);
          console.log(courseId);
          setAllProgrammingLanguage(result.data.data);
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
  const getAllLanguages = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const id = localStorage.getItem("courseid");
      //   setCourseId(courseid);
      //   console.log(courseid);
      let result = await axios
        .get(`http://localhost:5000/getAllLanguages`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log(result);
          console.log(result.data.data);
          console.log(courseId);
          setAllLanguages(result.data.data);
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
  const allLevel = ["Expert", "Intermediate", "Beginner"];

  const handleNewCourse = async (e) => {
    if (!name) {
      setNameError("Please Enter name of course");
    }
    if (!categoryName) {
      setCategoryError("Please select category of course");
    }
    if (!subCategory) {
      setSubCategoryError("Please select Subcategory of course");
    }
    if (!programmingLanguage) {
      setProgrammingLanguageError(
        "Please select programming language of course"
      );
    }
    if (!language) {
      setLanguageError("Please select language of course");
    }
    if (!level) {
      setLevelError("Please select level of course");
    }
    if (!price) {
      setPriceError("Please enter price of course");
    }
    if (!discount) {
      setDiscountError("Please enter discount of course");
    }
    if (!deadline) {
      setDeadlineError("Please enter deadline of course");
    }
    if (!overview) {
      setOverviewError("Please enter overview of course");
    }
    if (!requirement) {
      setRequirementError("Please enter pre-requirements of course");
    }
    if (!description) {
      setDescriptionError("Please enter description of course");
    }
    if (
      name &&
      categoryName &&
      subCategory &&
      programmingLanguage &&
      language &&
      price &&
      discount &&
      overview &&
      description &&
      requirement &&
      deadline &&
      level &&
      courseImg
    ) {
      try {
        e.preventDefault();
        const accessToken = JSON.parse(
          localStorage.getItem("accessToken") || ""
        );
        if (!accessToken) {
          throw new Error("Access token is missing.");
        }
        const courseid = localStorage.getItem("courseid");
        const id = courseid;
        const fields = {
          id: courseid,
          name: name,
          categoryId: categoryName,
          subCategoryId: subCategory,
          programmingLanguageId: programmingLanguage,
          level: level,
          overview: overview,
          description: description,
          requirement: requirement,
          price: price,
          discount: discount,
          languageId: language,
          deadline: deadline,
          courseImg: avatar.placeholder,
        };
        let result = await axios
          .post(`http://localhost:5000/course/createCourse`, fields, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              // "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            console.log("Created");
            console.log(name);
            console.log(result);
            console.log(result.data.data);
            toast.success(result.data.message);
            navigate("/courses");
          })
          .catch((err) => {
            console.log(err.response);
            toast.error(err.response.data.message);
            console.log(result.data.data.message);
            console.log(accessToken);
            console.log(id);
            // console.log(result);
          });
      } catch (error) {
        console.error("Error during signup:", error);
      }
    }
  };
  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="20px">
          {/* HEADER */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header title="Courses" subtitle="New Courses" />
          </Box>
          <Box
            display="grid"
            gap="25px"
            style={{ objectFit: "cover", marginLeft: "8px" }}
          >
            <Box>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload Course Image
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleProfileImageChange}
                />
              </Button>
            </Box>
            <Box>
              <img
                style={{ objectFit: "contain" }}
                height={290}
                width={290}
                src={avatar.placeholder}
                alt=""
                sx={{ m: 1, minWidth: 125 }}
              />
            </Box>
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
              error={nameError}
              helperText={nameError}
              //   value={name}
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
                // value={categoryName}
                onChange={onChangeCategory}
                error={categoryError}
                helperText={categoryError}
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
                // value={subCategory}
                onChange={onChangeSubCategory}
                error={subCategoryError}
                helperText={subCategoryError}
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
                // value={programmingLanguage}
                onChange={onChangeProgrammingLanguage}
                error={programmingLanguageError}
                helperText={programmingLanguageError}
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
                // value={language}
                onChange={onChangeLanguage}
                error={languageError}
                helperText={languageError}
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
                // value={level}
                onChange={onChangeLevel}
                error={levelError}
                helperText={levelError}
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
              error={priceError}
              helperText={priceError}
              //   value={price}
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
              error={discountError}
              helperText={discountError}
              //   value={discount}
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
              error={overviewError}
              helperText={overviewError}
              //   value={overview}
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
              error={descriptionError}
              helperText={descriptionError}
              //   value={description}
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
              //   value={requirement}
              name="requirement"
              error={requirementError}
              helperText={requirementError}
              sx={{ gridColumn: "span 4", m: 1, minWidth: 130 }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateField"]}>
                <DateField
                  label="Deadline of Course"
                  //   value={dayjs(deadline)}
                  format="DD-MM-YYYY"
                  fullWidth
                  sx={{ gridColumn: "span 4", m: 1, minWidth: 120 }}
                  variant="filled"
                  // defaultValue={dayjs("2022-04-17")}
                  onChange={onChangeDeadline}
                  error={deadlineError}
                  helperText={deadlineError}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <Box display="flex" justifyContent="center" mt="20px">
            <Button variant="contained" onClick={handleNewCourse}>
              {/* color="secondary" */}
              Create
            </Button>
          </Box>
          <ToastContainer />
        </Box>
      </main>
    </div>
  );
};

export default CreateCourse;
