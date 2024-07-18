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
import axios from "axios";
import { baseURL } from "../../../basic";
import {
  getAllChapterInstance,
  getSingleChapterInstance,
} from "../../../instances/ChapterInstance";
import { getSingleContentVideoInstance, getUpdateContentVideoInstance } from "../../../instances/ContentVideoInstance";

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
    setChapterNameError("");
  };
  const getSingleContentVideo = async () => {
    try {
      const id = localStorage.getItem("updatecontentvideo");
      let response = await getSingleContentVideoInstance(id);
      setThumbail(response.thumbnail);
      setChapterName(response.chapter._id);
      setVideoLink(response.videoLink);
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
        const id = localStorage.getItem("updatecontentvideo");
        const fields = {
          thumbnail: thumbnail,
          videoLink: videoLink,
          chapter: chapterName,
        };
        let response = await getUpdateContentVideoInstance(fields, id);
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
    </>
  );
}
