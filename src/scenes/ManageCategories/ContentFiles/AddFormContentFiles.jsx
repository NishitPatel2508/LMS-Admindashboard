import React, { useEffect, useState, useRef } from "react";
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
import { BLOB_READ_WRITE_TOKEN } from "../../../basic";
import { put } from "@vercel/blob";
import { getAllChapterInstance } from "../../../instances/ChapterInstance";
import { createContentFileInstance } from "../../../instances/ContentFileInstance";

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

  //Vercel File Upload
  const inputFileRef = useRef(null);
  const onChangeChapter = (e) => {
    setChapterName(e.target.value);
    setChapterNameError("");
  };
  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const getallChapter = async () => {
    try {
      let response = await getAllChapterInstance();
      setAllChapters(response);
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
        const formData = new FormData();
        formData.append("file", file);
        formData.append("chapter", chapterName);
        // formData.append("extractArchive", "false");
        formData.append("name", fileName);
        let r = await put(fileName, formData, {
          access: "public",
          token: BLOB_READ_WRITE_TOKEN,
        });
        console.log(r.url);
        const fields = {
          fileName: r.pathname,
          pdf: r.url,
          chapter: chapterName,
        };
        let response = await createContentFileInstance(fields);
        toast.success(response.message, { autoClose: 2000 });
        closeEvent();
        // if (result.message == "Programming Language already exists") {
        //   toast.error(result.message, { autoClose: 2000 });
        // } else {
        //   toast.success(result.message, { autoClose: 2000 });
        //   closeEvent();
        // }
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
              ref={inputFileRef}
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
      <ToastContainer />
    </>
  );
}
