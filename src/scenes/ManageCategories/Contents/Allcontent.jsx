import React from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Modal,
  useTheme,
  FormControl,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Stack,
} from "@mui/material";
import {
  GridRowModes,
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

// import AddFormChapters from "./AddFormChapters";
import AddFormContent from "./AddFormContent";
import UpdateContent from "./UpdateContent";
// import UpdateChapters from "./UpdateChapters";
import { tokens } from "../../../theme";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CloseIcon from "@mui/icons-material/Close";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import CancelIcon from "@mui/icons-material/Close";
import { useMode } from "../../../theme";
import Sidebar from "../../global/Sidebar";
import Topbar from "../../global/Topbar";
import StatBox from "../../../components/StatBox";
import Header from "../../../components/Header";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Import the main component

import { Viewer, Worker } from "@react-pdf-viewer/core";

// // Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";

const Allcontent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [allContent, setAllContent] = useState([]);

  const [update, setUpdate] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [openHandle, setOpenHandle] = React.useState(false);
  const handleOpenUpdate = () => setOpenHandle(true);
  const handleCloseUpdate = () => setOpenHandle(false);
  const [openHandleView, setOpenHandleView] = React.useState(false);
  const handleOpenView = () => setOpenHandleView(true);
  const handleCloseView = () => setOpenHandleView(false);
  const [viewChapterName, setViewChapterName] = useState("");
  const [viewCourse, setViewCourse] = useState("");
  const [viewContentVideo, setViewContentVideo] = useState("");
  const [viewContentFile, setViewContentFile] = useState("");
  const navigate = useNavigate();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    getAllContent();
  }, []);
  const getAllContent = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      let result = await axios
        .get("http://localhost:5000/getAllContent", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log(result);
          console.log(result.data.data);
          setAllContent(result.data.data);
          console.log(allContent);
        })

        .catch((err) => {
          console.log(err.response);
          console.log(accessToken);
        });
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const deleteContent = async (id) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }

      let result = await axios
        .delete(`http://localhost:5000/content/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((result) => {
          toast.success("Deleted successfully");
          console.log("Deleted");
          setTimeout(() => {
            navigate("/managecategories");
          }, 3000);

          console.log(result);
        })
        .catch((err) => {
          console.log(err.response);
          console.log(accessToken);
          console.log(id);
        });
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  const columns = [
    { field: "id", headerName: "ID", flex: 0.25 },
    {
      field: "name",
      headerName: "Chapter Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "course",
      headerName: "Course Name",
      flex: 1,
    },
    {
      field: "contentvideo",
      headerName: "Contnet Video Name",
      flex: 1,
    },
    {
      field: "contentfile",
      headerName: "Contnet File",
      flex: 1,
    },

    {
      field: "action",
      headerName: "Action",
      width: 180,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        const onClick = (e) => {
          const currentRow = params.row;
          return alert(JSON.stringify(currentRow, null, 4));
        };

        const handleUpdate = () => {
          const currentRow = params.row;

          allContent.map((ele) => {
            if (currentRow.contentfile == ele.contentFileDetailes.name) {
              setUpdate(true);
              handleOpenUpdate();
              localStorage.setItem("updatecontent", ele._id);
              console.log(ele._id);
            }
          });
        };

        const handleDelete = () => {
          const currentRow = params.row;

          // const id = ;
          allContent.map((ele) => {
            if (currentRow.contentfile == ele.contentFileDetailes.name) {
              // console.log(currentRow._id);
              deleteContent(ele._id);
              // alert(JSON.stringify(currentRow));
            }
          });
        };

        const handleView = () => {
          const currentRow = params.row;

          // const id = ;
          allContent.map((ele) => {
            if (currentRow.contentfile == ele.contentFileDetailes.name) {
              console.log(currentRow._id);
              setViewChapterName(currentRow.name);
              setViewCourse(currentRow.course);
              setViewContentVideo(currentRow.contentvideo);
              setViewContentFile(currentRow.contentfile);
              handleOpenView();
              // alert(JSON.stringify(currentRow));
            }
          });
        };

        return [
          <Box gap={25}>
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              color="warning"
              onClick={handleUpdate}
              sx={{
                marginRight: "10px",
              }}
            />

            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDelete}
              color="error"
              sx={{
                marginRight: "10px",
              }}
            />
            <GridActionsCellItem
              icon={<FileOpenIcon />}
              label="View"
              onClick={handleView}
              color="success"
            />
          </Box>,
        ];
      },
    },
  ];
  const rows = allContent.map((element, i) => {
    return {
      id: i,
      // _id: element._id,
      name: element.chapterDetailes.chapterName,
      course: element.courseDetailes.name,
      contentvideo: element.contentVideoDetailes.thumbnail,
      contentfile: element.contentFileDetailes.name,
    };
  });

  return (
    <>
      <div className="app">
        <Sidebar isSidebar={isSidebar} />
        <main className="content">
          <Topbar setIsSidebar={setIsSidebar} />
          <Modal
            open={open}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <AddFormContent closeEvent={handleClose} />
            </Box>
          </Modal>
          <Modal
            open={openHandle}
            onClose={handleCloseUpdate}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <UpdateContent closeEvent={handleCloseUpdate} />
            </Box>
          </Modal>
          <Modal
            open={openHandleView}
            onClose={handleCloseView}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <IconButton
                style={{ position: "absolute", top: "0", right: "0" }}
                onClick={handleCloseView}
              >
                <CloseIcon />
              </IconButton>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-read-only-input"
                    label="Chapter Name"
                    fullWidth
                    defaultValue={viewChapterName}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-read-only-input"
                    label="Course Name"
                    fullWidth
                    defaultValue={viewCourse}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-read-only-input"
                    fullWidth
                    label="ContentVideo"
                    defaultValue={viewContentVideo}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <h6>Content File : {viewContentFile}</h6>
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    <div
                      style={{
                        border: "1px solid rgba(0, 0, 0, 0.3)",
                        height: "250px",
                        width: "500",
                      }}
                    >
                      <Viewer
                        fileUrl={`http://localhost:5000/uploads/${viewContentFile}`}
                      />
                    </div>
                  </Worker>
                </Grid>
              </Grid>
            </Box>
          </Modal>

          <Box m="18px">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Header title="Manage Contnets" subtitle="List of Contents" />
              <Box>
                <Button
                  variant="contained"
                  sx={{
                    // backgroundColor: "#5d5de7",
                    // color: colors.grey[100],
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                  }}
                  onClick={handleOpen}
                >
                  <AddIcon sx={{ mr: "10px" }} />
                  Add New Content
                </Button>
              </Box>
            </Box>
            <Box>
              <Box
                m="40px 0 0 0"
                height="59vh"
                sx={{
                  "& .MuiDataGrid-root": {
                    border: "none",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                  },
                  "& .name-column--cell": {
                    color: colors.primary[300],
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none",
                  },
                  "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                  },
                  "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700],
                  },
                  "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`,
                  },
                  "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.grey[100]} !important`,
                  },
                }}
              >
                <DataGrid
                  sx={{
                    fontSize: "15px",
                  }}
                  rows={rows}
                  columns={columns}
                  components={{ Toolbar: GridToolbar }}
                  getRowId={(rows) => rows.id}
                  editMode="row"
                />
              </Box>
              <ToastContainer />
            </Box>
          </Box>
        </main>
      </div>
    </>
  );
};

export default Allcontent;
