import React from "react";
import {
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@mui/material";
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
import { ToastContainer, toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { handleCreateCourse } from "../../instances/Course/CourseInstance";
import { getAllCategoryInstance } from "../../instances/CategoryInstance";
import { getAllSubCategoryInstance } from "../../instances/SubCategoryInstance";
import { getAllProgrammingLanguageInstance } from "../../instances/ProgrammingLangauageInstance";
import { getAllLanguagesInstance } from "../../instances/LanguagesInstance";

const CreateCourse = () => {
  const [isSidebar, setIsSidebar] = useState(true);
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
  const [imgName, setImgName] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [avatar, setImage] = useState({
    placeholder: null,
    file: null,
  });

  const [imgError, setImageError] = useState("");
  const [imgURL, setImgURL] = useState("");

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
    console.log(event.target.files[0].name);
    // Db stores the url provided by vercel blob
    if (
      event.target.files[0].type === "image/png" ||
      event.target.files[0].type === "image/jpeg"
    ) {
      //Cloudinary
      setImgFile(event.target.files[0]);
      //Preview Show
      setImgName(event.target.files[0].name);
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

      //readAsDataURL : Store the value inside the file.
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
      console.error("Error during signup:", error);
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

  const handleNewCourse = async (e) => {
    if (!imgName) {
      setImageError("Please Upload Image");
    }
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
      imgName &&
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
        const formDataImg = new FormData();
        formDataImg.append("file", imgFile);
        formDataImg.append("upload_preset", "olpsdimages");
        formDataImg.append("cloud_name", "nishitproject");
        setImgName(imgFile.name);
        console.log(imgFile);
        let imgUrl = "";
        const imgUploaded = await axios
          .post(
            "https://api.cloudinary.com/v1_1/nishitproject/image/upload",
            formDataImg
          )
          .then((result) => {
            // console.log(imgUploaded);
            setImgURL(result.data.url);
            imgUrl = result.data.url;
            console.log(result.data.url);
            console.log(result);
            // console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });

        const fields = {
          // id: courseid,
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
          courseImg: imgUrl,
        };
        try {
          const response = await handleCreateCourse(fields);
          console.log(response.data);
          console.log(response.message);
          if (response.message === "Course already you created.") {
            toast.error(response.message, { autoClose: 2000 });
          } else {
            toast.success(response.message, { autoClose: 2000 });
            setTimeout(() => {
              navigate("/courses");
            }, 2500);
          }
        } catch (error) {
          console.log("CreateError", error);
        }
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
            <imgURL show={imgURL} />
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
                src={imgURL}
                alt=""
                sx={{ m: 1, minWidth: 125 }}
              />
            </Box>
            <b>{imgError && <b style={{ color: "red" }}> {imgError}</b>}</b>
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
