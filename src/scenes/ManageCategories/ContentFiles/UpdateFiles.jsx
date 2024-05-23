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
  useTheme,
  TextField,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ToastContainer, toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UpdateFiles({ closeEvent }) {
  useEffect(() => {
    getallChapter();
    getSingleContentFile();
  }, []);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const [msg, setMsg] = useState(false);

  const navigate = useNavigate();

  const [allCourse, setAllCourse] = useState([]);
  const [chapterName, setChapterName] = useState("");
  const [chapterNameError, setChapterNameError] = useState("");
  const [file, setFile] = useState();
  const [fileError, setFileError] = useState();
  const [fileName, setFileName] = useState();
  const [fileNameError, setFileNameError] = useState("");
  const [chapterError, setChapterError] = useState("");
  const [chapter, setChapter] = useState("");
  const [allChapter, setAllChapters] = useState([]);

  //   const onChangeChapter = (e) => {
  //     setChapterName(e.target.value);
  //     console.log(e.target.value);
  //     setChapterNameError("");
  //   };
  const onChangeChapter = (e) => {
    setChapter(e.target.value);
    console.log(e.target.value);
    setChapterError("");
  };
  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    console.log(e.target.files[0].name);
    console.log(e.target.files[0]);
    console.log(e.target.files[0].path);
    setFileError("");
  };
  const getSingleContentFile = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const id = localStorage.getItem("updatefile");
      //   setCourseId(courseid);
      //   console.log(courseid);
      let result = await axios
        .get(`http://localhost:5000/singleFile/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log(result);
          console.log(result.data.data);
          // console.log(courseId);
          //   setChapter(result.data.data.chapter.chapterName);
          setFileName(result.data.data.name);
          console.log(result.data.data.chapter);
          setChapterName(result.data.data.chapter._id);
          console.log(result.data.data.chapter._id);
        })
        .catch((err) => {
          console.log(err.response);
          console.log(accessToken);
        });
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const getallChapter = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      let result = await axios
        .get("http://localhost:5000/getAllChapter", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log(result);
          console.log(result.data.data);
          setAllChapters(result.data.data);
          console.log(allChapter);
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
    if (!chapterName) {
      setChapterNameError("Please select the course");
    }
    if (!file) {
      setFileError("Please select the file for the chapter");
    }
    if (chapterName && file) {
      try {
        e.preventDefault();
        const accessToken = JSON.parse(
          localStorage.getItem("accessToken") || ""
        );
        if (!accessToken) {
          throw new Error("Access token is missing.");
        }
        const id = localStorage.getItem("updatefile");
        const fields = {
          course: chapterName,
          chapterName: chapter,
        };
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", fileName);
        // formData.append("chapter", chapterName);
        let result = await axios
          .patch(`http://localhost:5000/file/update/${id}`, formData, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            console.log("Updated");
            console.log(result);
            console.log(result.data.data);
            // setSubCategory(result.data.SubCategory.subprogrammingLangName);
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
              label="File Name"
              type="file"
              name="file"
              variant="outlined"
              // value={fileName}
              // defaultValue={fileName}
              fullWidth
              onChange={onChangeFile}
              error={fileError}
              helperText={fileError}
              sx={{ marginTop: "8px" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="filled-basic"
              label="File Name"
              variant="filled"
              fullWidth
              value={fileName}
              defaultValue={fileName}
              onChange={onChangeFile}
              error={fileNameError}
              helperText={fileNameError}
              sx={{ marginTop: "8px" }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="filled" fullWidth>
              <InputLabel id="demo-simple-select-filled-label">
                Chapter
              </InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={chapterName}
                onChange={onChangeChapter}
                error={chapterNameError}
                helperText={chapterNameError}
              >
                {allChapter.map((opt, i) => (
                  <MenuItem key={i} value={opt._id}>
                    {opt.chapterName}
                  </MenuItem>
                ))}
              </Select>

              <FormHelperText style={{ color: "red" }}>
                {chapterNameError}
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
              Update File
            </Button>
          </Grid>
        </Grid>

        <Box height={15} />
      </Box>
      {/* <ToastContainer /> */}
    </>
  );
}
