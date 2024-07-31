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
import { getAllSubCategoryInstance } from "../../../instances/SubCategoryInstance";
import { createProgrammingLanguageInstance } from "../../../instances/ProgrammingLangauageInstance";

export default function AddFormPL({ closeEvent }) {
  useEffect(() => {
    getAllSubCategories();
  }, []);
  const [allSubCategory, setAllSubCategory] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");
  const [programmingLang, setProgrammingLang] = useState("");
  const [programmingLangError, setProgrammingLangError] = useState("");

  const onChangeSubCategory = (e) => {
    setSubCategoryName(e.target.value);

    setSubCategoryError("");
  };
  const onChangePL = (e) => {
    setProgrammingLang(e.target.value);
    setProgrammingLangError("");
  };

  const getAllSubCategories = async () => {
    try {
      let response = await getAllSubCategoryInstance();
      setAllSubCategory(response.data);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  const handleCreate = async (e) => {
    if (!subCategoryName) {
      setSubCategoryError("Please select Subcategory of course");
    }
    if (!programmingLang) {
      setProgrammingLangError("Please enter programming lang of course");
    }
    if (subCategoryName && programmingLang) {
      try {
        e.preventDefault();
        const fields = {
          programmingLanguageName: programmingLang,
          subCategory: subCategoryName,
        };
        let result = await createProgrammingLanguageInstance(fields);
        if (result.message === "Programming Language already exists") {
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
          Add Programming Languages
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
              variant="outlined"
              fullWidth
              onChange={onChangePL}
              error={programmingLangError}
              helperText={programmingLangError}
              sx={{ marginTop: "8px" }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-filled-label">
                Subcategory
              </InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
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
              onClick={handleCreate}
            >
              {/* <AddIcon sx={{ mr: "10px" }} /> */}
              {/* Add New Programming Language */}
              submit
            </Button>
          </Grid>
        </Grid>

        <Box height={15} />
      </Box>
      {/* <ToastContainer /> */}
    </>
  );
}
