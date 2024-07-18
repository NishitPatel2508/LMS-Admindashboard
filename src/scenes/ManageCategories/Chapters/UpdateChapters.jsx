import React, { useCallback, useEffect, useState } from "react";
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
import { baseURL } from "../../../basic";
import {
  getAllChapterInstance,
  getSingleChapterInstance,
  updateChapterInstance,
} from "../../../instances/ChapterInstance";
import { getAllCourseInstance } from "../../../instances/Course/CourseInstance";

export default function UpdateChapters({ closeEvent }) {
  useEffect(() => {
    getAllCourse();
    getSingleChapter();
    getallChapter();
  }, []);

  const navigate = useNavigate();

  const [allCourse, setAllCourse] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [courseNameError, setCourseNameError] = useState("");
  const [chapterError, setChapterError] = useState("");
  const [chapter, setChapter] = useState("");
  const [courseId, setCourseId] = useState("");
  const [allChapter, setAllChapters] = useState([]);
  const [updated, setUpdated] = useState(false);

  const onChangeCourse = (e) => {
    setCourseName(e.target.value);

    setCourseNameError("");
  };
  const onChangeChapter = (e) => {
    setChapter(e.target.value);
    setChapterError("");
  };
  const getSingleChapter = async () => {
    try {
      const id = localStorage.getItem("updatechapter");
      let data = await getSingleChapterInstance(id);
      setChapter(data.chapterName);
      setCourseName(data.course._id);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const getAllCourse = async () => {
    try {
      let data = await getAllCourseInstance();
      setAllCourse(data);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  const getallChapter = async () => {
    try {
      let data = await getAllChapterInstance();
      setAllChapters(data);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  const handleUpdate = async (e) => {
    if (!courseName) {
      setCourseNameError("Please select the course");
    }
    if (!chapter) {
      setChapterError("Please enter chapter of course");
    }
    if (courseName && chapter) {
      try {
        e.preventDefault();
        const id = localStorage.getItem("updatechapter");
        const fields = {
          course: courseName,
          chapterName: chapter,
        };
        let response = await updateChapterInstance(fields, id);
        toast.success(response.message, { autoClose: 2000 });
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
          Update Chapter
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
              variant="filled"
              fullWidth
              value={chapter}
              defaultValue={chapter}
              onChange={onChangeChapter}
              error={chapterError}
              helperText={chapterError}
              sx={{ marginTop: "8px" }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="filled" fullWidth>
              <InputLabel id="demo-simple-select-filled-label">
                Course
              </InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={courseName}
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
              onClick={handleUpdate}
            >
              {/* <AddIcon sx={{ mr: "10px" }} /> */}
              Update Chapter
            </Button>
          </Grid>
        </Grid>

        <Box height={15} />
      </Box>
      {/* <ToastContainer /> */}
    </>
  );
}
