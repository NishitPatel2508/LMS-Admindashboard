import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";

import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import {
  getSingleSubCategoryInstance,
  getUpdateSubCategoryInstance,
} from "../../../instances/SubCategoryInstance";
import { getAllCategoryInstance } from "../../../instances/CategoryInstance";

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

  const onChangeCategory = (e) => {
    setCategoryName(e.target.value);

    setCategoryError("");
  };
  const onChangeSubCategory = (e) => {
    setSubCategory(e.target.value);
    setSubCategoryError("");
  };
  const getSingleSubCategory = async () => {
    try {
      const id = localStorage.getItem("updatesubcategories");

      const data = await getSingleSubCategoryInstance(id);

      setCategoryName(data.category._id);
      setSubCategory(data.subCategoryName);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const getAllCategory = async () => {
    try {
      const data = await getAllCategoryInstance();
      setAllCategory(data);
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
        const id = localStorage.getItem("updatesubcategories");
        const fields = {
          category: categoryName,
          subCategoryName: subCategory,
        };
        await getUpdateSubCategoryInstance(fields, id)
          .then((response) => {
            toast.success(response.message, { autoClose: 2000 });
            closeEvent();
          })
          .catch((err) => {
            console.log(err.response);
            toast.error(err.response.data.message, { autoClose: 2000 });

            // console.log(result);
          });
      } catch (error) {
        console.error("Error during UpdateSubcategory:", error);
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
