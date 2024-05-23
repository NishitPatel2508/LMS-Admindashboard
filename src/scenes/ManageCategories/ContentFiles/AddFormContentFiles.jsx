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
  TextField,
} from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddFormContentFiles({ closeEvent }) {
  useEffect(() => {
    getallChapter();
  }, []);

  const [allChapter, setAllChapters] = useState([]);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [fileError, setFileError] = useState();
  const [chapterName, setChapterName] = useState("");
  const [chapterNameError, setChapterNameError] = useState("");
  const [chapterError, setChapterError] = useState("");

  const navigate = useNavigate();
  const onChangeChapter = (e) => {
    setChapterName(e.target.value);
    console.log(e.target.value);
    setChapterNameError("");
  };
  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    console.log(e.target.files[0].name);
    console.log(e.target.files[0]);
    console.log(e.target.files[0].path);
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
  const handleCreate = async (e) => {
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
        const formData = new FormData();
        formData.append("file", file);
        formData.append("chapter", chapterName);
        // formData.append("name", fileName);
        let response = await axios
          .post(`http://localhost:5000/file/upload`, formData, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log("Created");
            console.log(response);
            console.log(response.data.data);
            toast.success(response.data.message);
            closeEvent();
            setTimeout(() => {
              navigate("/managecategories");
            }, 3000);
          })
          .catch((err) => {
            console.log(err.response);
            toast.error(err.response.data.message);
            // console.log(result.data.data.message);
            console.log(accessToken);
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
          Add Content File
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
              fullWidth
              onChange={onChangeFile}
              error={fileError}
              helperText={fileError}
              sx={{ marginTop: "8px" }}
            />
          </Grid>
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
              onClick={handleCreate}
            >
              {/* <AddIcon sx={{ mr: "10px" }} /> */}
              Add Content File
            </Button>
          </Grid>
        </Grid>

        <Box height={15} />
      </Box>
      {/* <ToastContainer /> */}
    </>
  );
}
