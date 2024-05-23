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
  TextField,
} from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UpdateSubCategory({ closeEvent }) {
  useEffect(() => {
    getAllCategory();
    getSingleSubCategory();
  }, []);

  const [allCategory, setAllCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");
  const [msg, setMsg] = useState(false);

  const navigate = useNavigate();

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
  const getSingleSubCategory = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const id = localStorage.getItem("updatesubcategories");
      //   setCourseId(courseid);
      //   console.log(courseid);
      let result = await axios
        .get(`http://localhost:5000/subCategory/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log(result);
          console.log(result.data.data);
          // console.log(courseId);
          setCategoryName(result.data.data.category._id);
          console.log(result.data.data.category._id);
          // console.log(category.categoryName);
          setSubCategory(result.data.data.subCategoryName);
          console.log(result.data.data.subCategoryName);
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

  const getAllCategory = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }

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
          setAllCategory(result.data.data);
          // console.log(allCategory);
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
    if (!categoryName) {
      setCategoryError("Please select category of course");
    }
    if (!subCategory) {
      setSubCategoryError("Please select Subcategory of course");
    }
    if (categoryName && subCategory) {
      try {
        e.preventDefault();
        const accessToken = JSON.parse(
          localStorage.getItem("accessToken") || ""
        );
        if (!accessToken) {
          throw new Error("Access token is missing.");
        }
        const id = localStorage.getItem("updatesubcategories");
        const fields = {
          category: categoryName,
          subCategoryName: subCategory,
        };
        let result = await axios
          .patch(`http://localhost:5000/subCategory/update/${id}`, fields, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              // "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            console.log("Updated");
            console.log(result);
            console.log(result.data.data);
            // setSubCategory(result.data.SubCategory.subCategoryName);
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
          Update Sub Category
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
              label="Subcategory Name"
              variant="filled"
              fullWidth
              value={subCategory}
              defaultValue={subCategory}
              onChange={onChangeSubCategory}
              error={subCategoryError}
              helperText={subCategoryError}
              sx={{ marginTop: "8px" }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="filled" fullWidth>
              <InputLabel id="demo-simple-select-filled-label">
                Category
              </InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={categoryName}
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

              <FormHelperText style={{ color: "red" }}>
                {categoryError}
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
              Update Sub Category
            </Button>
          </Grid>
        </Grid>

        <Box height={15} />
      </Box>
    </>
  );
}
