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
} from "@mui/material";

import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import {
  getSingleContentInstance,
  getUpdateContentInstance,
} from "../../../instances/ContentInstance";
import { getAllCourseInstance } from "../../../instances/Course/CourseInstance";
import { getAllChapterInstance } from "../../../instances/ChapterInstance";
import { getAllContentVideoInstance } from "../../../instances/ContentVideoInstance";
import { getAllContentFileInstance } from "../../../instances/ContentFileInstance";

export default function UpdateContent({ closeEvent }) {
  useEffect(() => {
    getAllChapter();
    getAllContentVideo();
    getAllCourse();
    getallContentFiles();
    getSingleContent();
  }, []);

  const [allChapter, setAllChapter] = useState([]);
  const [allContentVideo, setAllContentVideo] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [contentVideo, setContentVideo] = useState("");
  const [contentVideoError, setContentVideoError] = useState("");
  const [file, setFile] = useState("");
  const [fileError, setFileError] = useState();

  const [allCourse, setAllCourse] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [courseNameError, setCourseNameError] = useState("");
  const [chapterError, setChapterError] = useState("");
  const [chapter, setChapter] = useState("");
  const onChangeCourse = (e) => {
    setCourseName(e.target.value);
    console.log(e.target.value);
    setCourseNameError("");
  };
  const onChangeChapter = (e) => {
    setChapter(e.target.value);
    console.log(e.target.value);
    setChapterError("");
  };
  const onChangeContentVideo = (e) => {
    setContentVideo(e.target.value);
    console.log(e.target.value);
    setContentVideoError("");
  };
  const onChangeContentFile = (e) => {
    setFile(e.target.value);
    console.log(e.target.value);
    setFileError("");
  };
  const getSingleContent = async () => {
    try {
      const id = localStorage.getItem("updatecontent");

      await getSingleContentInstance(id)
        .then((response) => {
          console.log(response);

          setChapter(response.chapterDetailes._id);
          setCourseName(response.courseDetailes._id);

          setFile(response.contentFileDetailes._id);
          setContentVideo(response.contentVideoDetailes._id);
        })
        .catch((err) => {
          console.log(err.response);
        });
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const getAllCourse = async () => {
    try {
      await getAllCourseInstance()
        .then((response) => {
          // console.log(result);
          setAllCourse(response.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  const getAllChapter = async () => {
    try {
      await getAllChapterInstance()
        .then((response) => {
          setAllChapter(response.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  const getAllContentVideo = async () => {
    try {
      await getAllContentVideoInstance()
        .then((result) => {
          setAllContentVideo(result.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  const getallContentFiles = async () => {
    try {
      await getAllContentFileInstance()
        .then((response) => {
          setAllFiles(response.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
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
        const id = localStorage.getItem("updatecontent");
        const fields = {
          courseDetailes: courseName,
          chapterDetailes: chapter,
          contentVideoDetailes: contentVideo,
          contentFileDetailes: file,
        };
        await getUpdateContentInstance(fields, id)
          .then((response) => {
            toast.success(response.message, { autoClose: 2000 });
            closeEvent();
          })
          .catch((err) => {
            console.log(err.response);
            toast.error(err.response.data.message);
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
          Update Content
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
                value={chapter}
                defaultValue={chapter}
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
                value={courseName}
                defaultValue={courseName}
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
                value={contentVideo}
                defaultValue={contentVideo}
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
                value={file}
                defaultValue={file}
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
                padding: "10px 20px",
              }}
              onClick={handleUpdate}
            >
              {/* <AddIcon sx={{ mr: "10px" }} /> */}
              Update Content
            </Button>
          </Grid>
        </Grid>

        <Box height={15} />
      </Box>
      {/* <ToastContainer /> */}
    </>
  );
}
