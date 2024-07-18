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

import { ToastContainer, toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../basic";
import { getAllCourseInstance } from "../../../instances/Course/CourseInstance";
import { createChapterInstance } from "../../../instances/ChapterInstance";

export default function AddFormChapters({ closeEvent }) {
  useEffect(() => {
    getAllCourse();
  }, []);
  const [allCourse, setAllCourse] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [courseNameError, setCourseNameError] = useState("");
  const [chapterError, setChapterError] = useState("");

  const navigate = useNavigate();
  const [chapter, setChapter] = useState("");
  const onChangeCourse = (e) => {
    setCourseName(e.target.value);
    setCourseNameError("");
  };
  const onChangeChapter = (e) => {
    setChapter(e.target.value);
    setChapterError("");
  };

  const getAllCourse = async () => {
    try {
      let response = await getAllCourseInstance();
      setAllCourse(response);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  const handleCreate = async (e) => {
    if (!courseName) {
      setCourseNameError("Please select the course");
    }
    if (!chapter) {
      setChapterError("Please enter chapter of course");
    }
    if (courseName && chapter) {
      try {
        e.preventDefault();
        const fields = {
          chapterName: chapter,
          course: courseName,
        };
        let response = await createChapterInstance(fields);
        if (response.message == "Chapter already exists") {
          toast.error(response.message, { autoClose: 2000 });
        } else {
          toast.success(response.message, { autoClose: 2000 });
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
          Add Chapter
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
              label="Chapter Name"
              variant="outlined"
              fullWidth
              onChange={onChangeChapter}
              error={chapterError}
              helperText={chapterError}
              sx={{ marginTop: "8px" }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-filled-label">
                Course
              </InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                onChange={onChangeCourse}
                error={courseNameError}
                helperText={courseNameError}
              >
                {allCourse.map((opt, i) => (
                  <MenuItem key={i} value={opt._id}>
                    {opt.name}
                  </MenuItem>
                ))}
              </Select>

              <FormHelperText style={{ color: "red" }}>
                {courseNameError}
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
              Add New Chapter
            </Button>
          </Grid>
        </Grid>

        <Box height={15} />
      </Box>
      {/* <ToastContainer /> */}
    </>
  );
}
