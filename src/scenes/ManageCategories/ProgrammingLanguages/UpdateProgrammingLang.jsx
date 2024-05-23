import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  Modal,
  FormControl,
  FormHelperText,
  Grid,
  useTheme,
  TextField,
  Stack,
} from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UpdateProgrammingLang({ closeEvent }) {
  useEffect(() => {
    getAllSubCategories();
    getSingleProgrammingLang();
  }, []);

  const [allProgrammingLang, setAllProgrammingLang] = useState([]);
  const [programmingLangName, setProgrammingLangName] = useState("");
  const [programmingLangError, setProgrammingLangError] = useState("");

  const [allSubCategory, setAllSubCategory] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");
  const [msg, setMsg] = useState(false);

  const navigate = useNavigate();

  const onChangePL = (e) => {
    setProgrammingLangName(e.target.value);
    console.log(e.target.value);
    setProgrammingLangError("");
  };
  const onChangeSubCategory = (e) => {
    setSubCategoryName(e.target.value);
    console.log(e.target.value);
    setSubCategoryError("");
  };
  const getSingleProgrammingLang = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const id = localStorage.getItem("updateprogramminglang");
      //   setCourseId(courseid);
      //   console.log(courseid);
      let result = await axios
        .get(`http://localhost:5000/programmingLanguage/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log(result);
          console.log(result.data.data);
          // console.log(courseId);
          setProgrammingLangName(result.data.data.programmingLanguageName);
          console.log(result.data.data.programmingLanguageName);
          // console.log(category.programmingLangName);
          setSubCategoryName(result.data.data.subCategory._id);
          console.log(result.data.data.subCategory._id);
        })
        .catch((err) => {
          console.log(err.response);
          console.log(accessToken);
        });
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const getAllSubCategories = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
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
          setAllSubCategory(result.data.data);
          console.log(allSubCategory);
          // console.log(arrayPrint());
          // convertToArray(result.data.data);
        })
        .catch((err) => {
          console.log(err.response);
          console.log(accessToken);
        });
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  const handleUpdate = async (e) => {
    if (!programmingLangName) {
      setProgrammingLangError("Please select category of course");
    }
    if (!subCategoryName) {
      setSubCategoryError("Please select Subcategory of course");
    }
    if (programmingLangName && subCategoryName) {
      try {
        e.preventDefault();
        const accessToken = JSON.parse(
          localStorage.getItem("accessToken") || ""
        );
        if (!accessToken) {
          throw new Error("Access token is missing.");
        }
        const id = localStorage.getItem("updateprogramminglang");
        const fields = {
          programmingLanguageName: programmingLangName,
          subCategory: subCategoryName,
        };
        let result = await axios
          .patch(
            `http://localhost:5000/programmingLanguage/update/${id}`,
            fields,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                // "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((result) => {
            console.log("Updated");
            console.log(result);
            console.log(result.data.data);
            // setSubCategory(result.data.SubCategory.subprogrammingLangName);
            toast.success(result.data.message);
            closeEvent();
            setTimeout(() => {
              navigate("/managecategories");
            }, 3000);
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
    <>
      <Box sx={{ m: 2 }}>
        <Typography variant="h5" align="center">
          Update Programming Language
        </Typography>
        <IconButton
          style={{ position: "absolute", top: "0", right: "0" }}
          onClick={closeEvent}
        >
          <CloseIcon />
        </IconButton>
        <Box height={15} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="filled-basic"
              label="Programming Language Name"
              variant="filled"
              fullWidth
              value={programmingLangName}
              defaultValue={programmingLangName}
              onChange={onChangePL}
              error={programmingLangError}
              helperText={programmingLangError}
              sx={{ marginTop: "8px" }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="filled" fullWidth>
              <InputLabel id="demo-simple-select-filled-label">
                Subcategory
              </InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={subCategoryName}
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

              <FormHelperText style={{ color: "red" }}>
                {subCategoryError}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                // backgroundColor: "#5d5de7",
                // color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                // padding: "10px 20px",
              }}
              onClick={handleUpdate}
            >
              {/* <AddIcon sx={{ mr: "10px" }} /> */}
              Update Programming Language
            </Button>
          </Grid>
        </Grid>

        <Box height={15} />
      </Box>
      {/* <ToastContainer /> */}
    </>
  );
}
