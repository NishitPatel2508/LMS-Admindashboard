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

import { ToastContainer, toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../basic";

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
  const [msg, setMsg] = useState(false);
  const [file, setFile] = useState("");
  const [fileError, setFileError] = useState();

  const navigate = useNavigate();

  const [allCourse, setAllCourse] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [courseNameError, setCourseNameError] = useState("");
  const [chapterError, setChapterError] = useState("");
  const [chapter, setChapter] = useState("");
  const [chapterName, setChapterName] = useState("");
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
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const id = localStorage.getItem("updatecontent");

      let result = await axios
        .get(`${baseURL}/content/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log(result);

          setChapter(result.data.data.chapterDetailes._id);
          setCourseName(result.data.data.courseDetailes._id);

          setFile(result.data.data.contentFileDetailes._id);
          setContentVideo(result.data.data.contentVideoDetailes._id);
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
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      let result = await axios
        .get(`${baseURL}/getAllCourse`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          // console.log(result);
          setAllCourse(result.data.data);
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
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      let result = await axios
        .get(`${baseURL}/getAllChapter`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          setAllChapter(result.data.data);
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
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      let result = await axios
        .get(`${baseURL}/getAllContentVideo`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          setAllContentVideo(result.data.data);
          //   console.log(allProgrammingLanguage);
          // console.log(allProgrammingLanguage);
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
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      let result = await axios
        .get(`${baseURL}/allFiles`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          setAllFiles(result.data.data);
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
        const accessToken = JSON.parse(
          localStorage.getItem("accessToken") || ""
        );
        if (!accessToken) {
          throw new Error("Access token is missing.");
        }
        const id = localStorage.getItem("updatecontent");
        const fields = {
          courseDetailes: courseName,
          chapterDetailes: chapter,
          contentVideoDetailes: contentVideo,
          contentFileDetailes: file,
        };
        let result = await axios
          .patch(`${baseURL}/content/update/${id}`, fields, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              // "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            toast.success(result.data.message, { autoClose: 2000 });
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
