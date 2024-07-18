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
} from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { baseURL } from "../../../basic";
import { getAllCourseInstance } from "../../../instances/Course/CourseInstance";
import { getAllChapterInstance } from "../../../instances/ChapterInstance";
import { getAllContentVideoInstance } from "../../../instances/ContentVideoInstance";
import { getAllContentFileInstance } from "../../../instances/ContentFileInstance";
import { createContentInstance } from "../../../instances/ContentInstance";

export default function AddFormContent({ closeEvent }) {
  useEffect(() => {
    getAllChapter();
    getAllContentVideo();
    getAllCourse();
    getallContentFiles();
  }, []);

  const [allCourse, setAllCourse] = useState([]);
  const [allChapter, setAllChapter] = useState([]);
  const [allContentVideo, setAllContentVideo] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [chapter, setChapter] = useState("");
  const [contentVideo, setContentVideo] = useState("");
  const [courseNameError, setCourseNameError] = useState("");
  const [chapterError, setChapterError] = useState("");
  const [contentVideoError, setContentVideoError] = useState("");
  const [allFiles, setAllFiles] = useState([]);
  const [file, setFile] = useState();
  const [fileError, setFileError] = useState();
  const onChangeCourse = (e) => {
    setCourseName(e.target.value);
    setCourseNameError("");
  };
  const onChangeChapter = (e) => {
    setChapter(e.target.value);
    setChapterError("");
  };
  const onChangeContentVideo = (e) => {
    setContentVideo(e.target.value);
    setContentVideoError("");
  };
  const onChangeContentFile = (e) => {
    setFile(e.target.value);
    setFileError("");
  };

  const getAllCourse = async () => {
    try {
      let response = await getAllCourseInstance();
      setAllCourse(response);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  const getAllChapter = async () => {
    try {
      let response = await getAllChapterInstance();
      setAllChapter(response);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  const getAllContentVideo = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      let response = await getAllContentVideoInstance();
      setAllContentVideo(response);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  const getallContentFiles = async () => {
    try {
      let response = await getAllContentFileInstance();
      setAllFiles(response);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  const handleCreate = async (e) => {
    if (!courseName) {
      setCourseNameError("Please select the course");
    }
    if (!chapter) {
      setChapterError("Please select chapter of course");
    }
    if (!contentVideo) {
      setContentVideoError("Please select content video of course");
    }
    if (courseName) {
      try {
        e.preventDefault();
        const fields = {
          course: courseName,
          chapter: chapter,
          contentvideo: contentVideo,
          contentfile: file,
        };

        let response = await createContentInstance(fields);
        if (response.message == "Content already exists") {
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
          Add Content
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
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-filled-label">
                Chapter
              </InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                onChange={onChangeChapter}
                error={chapterError}
                helperText={chapterError}
              >
                {allChapter.map((opt, i) => (
                  <MenuItem key={i} value={opt._id}>
                    {opt.chapterName}
                  </MenuItem>
                ))}
              </Select>

              <FormHelperText style={{ color: "red" }}>
                {courseNameError}
              </FormHelperText>
            </FormControl>
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
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-filled-label">
                Content Video
              </InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                onChange={onChangeContentVideo}
                error={contentVideoError}
                helperText={contentVideoError}
              >
                {allContentVideo.map((opt, i) => (
                  <MenuItem key={i} value={opt._id}>
                    {opt.thumbnail}
                  </MenuItem>
                ))}
              </Select>

              <FormHelperText style={{ color: "red" }}>
                {contentVideoError}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-filled-label">
                Content File
              </InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                onChange={onChangeContentFile}
                error={fileError}
                helperText={fileError}
              >
                {allFiles.map((opt, i) => (
                  <MenuItem key={i} value={opt._id}>
                    {opt.name}
                  </MenuItem>
                ))}
              </Select>

              <FormHelperText style={{ color: "red" }}>
                {fileError}
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
              Add New Content
            </Button>
          </Grid>
        </Grid>

        {/* <Box height={15} /> */}
        {/* <ToastContainer /> */}
      </Box>
    </>
  );
}
