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

import { ToastContainer, toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UpdateContentVideoes({ closeEvent }) {
  useEffect(() => {
    getAllChapter();
    getSingleContentVideo();
  }, []);

  const [thumbnail, setThumbail] = useState("");
  const [thumbnailError, setThumbailError] = useState("");

  const [allChapter, setAllChapter] = useState([]);
  const [chapterName, setChapterName] = useState("");
  const [chapterNameError, setChapterNameError] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [videoLinkError, setVideoLinkError] = useState("");
  const [msg, setMsg] = useState(false);

  const navigate = useNavigate();

  const onChangeThumbnail = (e) => {
    setThumbail(e.target.value);
    setThumbailError("");
  };
  const onChangeVideoLink = (e) => {
    setVideoLink(e.target.value);
    setVideoLinkError("");
  };
  const onChangeChapter = (e) => {
    setChapterName(e.target.value);
    console.log(e.target.value);
    setChapterNameError("");
  };
  const getSingleContentVideo = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const id = localStorage.getItem("updatecontentvideo");
      //   setCourseId(courseid);
      //   console.log(courseid);
      let result = await axios
        .get(`http://localhost:5000/contentvideo/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log(result);
          console.log(result.data.data);
          // console.log(courseId);
          setThumbail(result.data.data.thumbnail);
          setChapterName(result.data.data.chapter._id);
          // console.log(result.data.data.programmingLanguageName);
          // console.log(category.programmingLangName);
          setVideoLink(result.data.data.videoLink);
          // console.log(result.data.data.subCategory._id);
        })
        .catch((err) => {
          console.log(err.response);
          console.log(accessToken);
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
        .get(`http://localhost:5000/getAllChapter`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log(result);
          console.log(result.data.data);
          setAllChapter(result.data.data);
          console.log(allChapter);
          // console.log(arrayPrint());
          // convertToArray(result.data.data);
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
    if (!thumbnail) {
      setThumbailError("Please select category of course");
    }
    if (!videoLink) {
      setVideoLinkError("Please enter video Link of course");
    }
    if (!chapterName) {
      setChapterNameError("Please enter Chaptername of course");
    }
    if (thumbnail && videoLink && chapterName) {
      try {
        e.preventDefault();
        const accessToken = JSON.parse(
          localStorage.getItem("accessToken") || ""
        );
        if (!accessToken) {
          throw new Error("Access token is missing.");
        }
        const id = localStorage.getItem("updatecontentvideo");
        const fields = {
          thumbnail: thumbnail,
          videoLink: videoLink,
          chapter: chapterName,
        };
        let result = await axios
          .patch(`http://localhost:5000/contentvideo/update/${id}`, fields, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              // "Content-Type": "multipart/form-data",
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
          Update Content Video
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
              label="Thumbnail"
              variant="filled"
              fullWidth
              value={thumbnail}
              defaultValue={thumbnail}
              onChange={onChangeThumbnail}
              error={thumbnailError}
              helperText={thumbnailError}
              sx={{ marginTop: "8px" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="filled-basic"
              label="Video Link"
              variant="filled"
              fullWidth
              value={videoLink}
              defaultValue={videoLink}
              onChange={onChangeVideoLink}
              error={videoLinkError}
              helperText={videoLinkError}
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
              Update Content Video
            </Button>
          </Grid>
        </Grid>

        <Box height={15} />
      </Box>
      {/* <ToastContainer /> */}
    </>
  );
}

// UpdateContentVideoes;
