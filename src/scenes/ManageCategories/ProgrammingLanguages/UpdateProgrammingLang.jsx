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
import {
  getSingleProgrammingLanguageInstance,
  updateProgrammingLanguageInstance,
} from "../../../instances/ProgrammingLangauageInstance";

export default function UpdateProgrammingLang({ closeEvent }) {
  useEffect(() => {
    getAllSubCategories();
    getSingleProgrammingLang();
  }, []);

  const [programmingLangName, setProgrammingLangName] = useState("");
  const [programmingLangError, setProgrammingLangError] = useState("");

  const [allSubCategory, setAllSubCategory] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");

  const onChangePL = (e) => {
    setProgrammingLangName(e.target.value);
    setProgrammingLangError("");
  };
  const onChangeSubCategory = (e) => {
    setSubCategoryName(e.target.value);
    setSubCategoryError("");
  };
  const getSingleProgrammingLang = async () => {
    try {
      const id = localStorage.getItem("updateprogramminglang");
      let result = await getSingleProgrammingLanguageInstance(id);
      setSubCategoryName(result.subCategory._id);
      setProgrammingLangName(result.programmingLanguageName);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const getAllSubCategories = async () => {
    try {
      let result = await getAllSubCategoryInstance();
      setAllSubCategory(result.data);
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
        const id = localStorage.getItem("updateprogramminglang");
        const fields = {
          programmingLanguageName: programmingLangName,
          subCategory: subCategoryName,
        };
        let result = await updateProgrammingLanguageInstance(fields, id);
        toast.success(result.message, { autoClose: 2000 });
        closeEvent();
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
