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
import { BLOB_READ_WRITE_TOKEN } from "../../../basic";
import { put } from "@vercel/blob";
import { getAllChapterInstance } from "../../../instances/ChapterInstance";
import {
  getSingleContentFileInstance,
  updateContentFileInstance,
} from "../../../instances/ContentFileInstance";

export default function UpdateFiles({ closeEvent }) {
  useEffect(() => {
    getallChapter();
    getSingleContentFile();
  }, []);

  const [, setChapterName] = useState("");
  const [chapterNameError, setChapterNameError] = useState("");
  const [file, setFile] = useState();
  const [, setFileError] = useState();
  const [fileName, setFileName] = useState();
  const [updatedFileName, setUpdatedFileName] = useState("");

  const [, setChapterError] = useState("");
  const [chapter, setChapter] = useState("");
  const [allChapter, setAllChapters] = useState([]);

  const onChangeChapter = (e) => {
    setChapter(e.target.value);
    setChapterError("");
  };
  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    setUpdatedFileName(e.target.files[0].name);
    setFileError("");
  };
  const getSingleContentFile = async () => {
    try {
      const id = localStorage.getItem("updatefile");
      let response = await getSingleContentFileInstance(id);
      setFileName(response.name);
      setChapterName(response.chapter._id);
      setChapter(response.chapter._id);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const getallChapter = async () => {
    try {
      let response = await getAllChapterInstance();
      setAllChapters(response.data);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  const handleUpdate = async (e) => {
    if (!chapter) {
      setChapterNameError("Please select the course");
    }
    // if (!file) {
    //   setFileError("Please select the file for the chapter");
    // }
    if (chapter) {
      try {
        e.preventDefault();

        const id = localStorage.getItem("updatefile");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", updatedFileName);
        // formData.append("chapter", chapterName);

        let r = await put(updatedFileName, formData, {
          access: "public",
          token: BLOB_READ_WRITE_TOKEN,
        });
        console.log(r);
        // setPDFURL();
        const fields = {
          name: fileName,
          pdf: r.url,
          chapter: chapter,
        };
        let response = await updateContentFileInstance(fields, id);
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
          Update Content File
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
              // error={fileError}
              // helperText={fileError}
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
              // error={fileNameError}
              // helperText={fileNameError}
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
                value={chapter}
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
        <ToastContainer />

        <Box height={15} />
      </Box>
    </>
  );
}
