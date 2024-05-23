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
        setCourseImg(r.target.result);
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
  const getSingleCourse = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const id = localStorage.getItem("courseid");
      //   setCourseId(courseid);
      //   console.log(courseid);
      let result = await axios
        .get(`http://localhost:5000/course/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log(result);
          console.log(result.data.data);
          console.log(courseId);
          setSingleCourse(result.data.data);
          setCourseImg(result.data.data.courseImg);
          setName(result.data.data.name);
          setCategoryName(result.data.data.category._id);
          // console.log(category.categoryName);
          setSubCategory(result.data.data.subCategory._id);
          setProgrammingLanguage(result.data.data.programmingLanguage._id);
          setLanguage(result.data.data.language._id);
          setLevel(result.data.data.level);
          setDescription(result.data.data.description);
          setOverview(result.data.data.overview);
          setRequirement(result.data.data.requirement);
          setPrice(result.data.data.price);
          setDiscount(result.data.data.discount);
          setDeadline(result.data.data.deadline);
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
  const handleUpdate = async (e) => {
    try {
      e.preventDefault();

      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const courseid = localStorage.getItem("courseid");
      //   setCourseId();
      // console.log(courseid);
      // const formData = new FormData();
      // formData.append("id", courseid);
      const id = courseid;
      // formData.append("name", name);
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
      let result = await axios
        .patch(`http://localhost:5000/course/update/${id}`, fields, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          debugger;
          console.log("updated");
          toast.success("Updated successfully");
          console.log(name);
          console.log(result);
          setTimeout(() => {
            navigate("/courses");
          }, 5000);
          // setName(result.data.data.name);
        })
        .catch((err) => {
          console.log(err.response);
          console.log(accessToken);
          console.log(id);
          // console.log(result);
        });
    } catch (error) {
      console.error("Error during signup:", error);
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
        </Box>

        <ToastContainer />
      </main>
    </div>
  );
};
export default CourseUpdate;
