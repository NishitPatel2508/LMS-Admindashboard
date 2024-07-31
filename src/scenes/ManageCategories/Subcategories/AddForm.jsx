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
import { getAllCategoryInstance } from "../../../instances/CategoryInstance";
import { createSubCategoryInstance } from "../../../instances/SubCategoryInstance";

export default function AddForm({ closeEvent }) {
  useEffect(() => {
    getAllCategory();
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

  const getAllCategory = async () => {
    try {
      const res = await getAllCategoryInstance();
      setAllCategory(res);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  const handleCreate = async (e) => {
    if (!categoryName) {
      setCategoryError("Please select category of course");
    }
    if (!subCategory) {
      setSubCategoryError("Please select Subcategory of course");
    }
    if (categoryName && subCategory) {
      try {
        e.preventDefault();
        const fields = {
          category: categoryName,
          subCategoryName: subCategory,
        };
        let result = await createSubCategoryInstance(fields);
        if (result.message === "Subcategory already exists") {
          toast.error(result.message, { autoClose: 2000 });
        } else {
          toast.success(result.message, { autoClose: 2000 });
          closeEvent();
        }
      } catch (error) {
        console.error("Error during signup:", error);
      }
    }
  };
  return (
    <>
      <Box sx={{ m: 2 }}>
        <Typography variant="h5" align="center">
          Add Sub Category
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
              variant="outlined"
              fullWidth
              onChange={onChangeSubCategory}
              error={subCategoryError}
              helperText={subCategoryError}
              sx={{ marginTop: "8px" }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-filled-label">
                Category
              </InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
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
              onClick={handleCreate}
            >
              {/* <AddIcon sx={{ mr: "10px" }} /> */}
              submit
            </Button>
          </Grid>
        </Grid>

        {/* <Box height={15} /> */}
        {/* <AddNew navigateTo={"/ad"}/> */}
      </Box>
    </>
  );
}
