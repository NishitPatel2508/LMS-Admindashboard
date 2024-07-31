import React from "react";
import {
  Box,
  Button,
  IconButton,
  Modal,
  useTheme,
  Grid,
  TextField,
  Fab,
} from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";

import AddFormContent from "./AddFormContent";
import UpdateContent from "./UpdateContent";
import { tokens } from "../../../theme";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CloseIcon from "@mui/icons-material/Close";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import Sidebar from "../../global/Sidebar";
import Topbar from "../../global/Topbar";
import Header from "../../../components/Header";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import {
  deleteContentInstance,
  getAllContentInstance,
} from "../../../instances/ContentInstance";
import Search from "../../../components/Search";

const Allcontent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isSidebar, setIsSidebar] = useState(true);
  const [allContent, setAllContent] = useState([]);

  const [, setUpdate] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    getAllContent();
  };
  const [openHandle, setOpenHandle] = React.useState(false);
  const handleOpenUpdate = () => setOpenHandle(true);
  const handleCloseUpdate = () => {
    setOpenHandle(false);
    getAllContent();
  };
  const [openHandleView, setOpenHandleView] = React.useState(false);
  const handleOpenView = () => setOpenHandleView(true);
  const handleCloseView = () => setOpenHandleView(false);
  const [viewChapterName, setViewChapterName] = useState("");
  const [viewCourse, setViewCourse] = useState("");
  const [viewContentVideo, setViewContentVideo] = useState("");
  const [viewContentFile, setViewContentFile] = useState("");
  const [viewContentFilePDF, setViewContentFilePDF] = useState("");

  const [search, setSearch] = useState("");
  const [searchErrMsg, setSearchErrMsg] = useState("");

  const handleChangeSearch = async (e) => {
    setSearch(e.target.value);
  };

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
  }, [search]);
  const getAllContent = async () => {
    try {
      let response = await getAllContentInstance(search);
      if (response.message === "Got data Successfully") {
        setAllContent(response.data);
        // setTotalPage(Math.ceil(response.pagination.pageCount));
        // console.log(response.data);
        setSearchErrMsg("");
      }
      if (response === "Record not found") {
        setSearchErrMsg("Record not found");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const deleteContent = async (id) => {
    try {
      await deleteContentInstance(id);
      toast.success("Deleted successfully", { autoClose: 2000 });
      console.log("Deleted");
      getAllContent();
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
        const handleUpdate = () => {
          const currentRow = params.row;

          allContent.map((ele) => {
            if (currentRow.contentfile === ele.contentFileDetailes.name) {
              setUpdate(true);
              handleOpenUpdate();
              localStorage.setItem("updatecontent", ele._id);
            }
          });
        };

        const handleDelete = () => {
          const currentRow = params.row;

          // const id = ;
          allContent.map((ele) => {
            if (currentRow.contentfile === ele.contentFileDetailes.name) {
              deleteContent(ele._id);
            }
          });
        };

        const handleView = () => {
          const currentRow = params.row;

          // const id = ;
          allContent.map((ele) => {
            if (currentRow.contentfile === ele.contentFileDetailes.name) {
              console.log(currentRow._id);
              setViewChapterName(currentRow.name);
              setViewCourse(currentRow.course);
              setViewContentVideo(currentRow.contentvideo);
              setViewContentFile(currentRow.contentfile);
              setViewContentFilePDF(ele.contentFileDetailes.pdf);
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
                      <Viewer fileUrl={`${viewContentFilePDF}`} />
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
                <Search
                  handleChangeSearch={handleChangeSearch}
                  searchErrMsg={searchErrMsg}
                />
                {/* <Button
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
                </Button> */}
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
                  // loading={loading}
                />
              </Box>
            </Box>
            <Fab
              color="primary"
              aria-label="add"
              sx={{
                bottom: 16,
                right: 30,
                position: "fixed",
              }}
              onClick={() => {
                setOpen(true);
              }}
            >
              <AddIcon />
            </Fab>
          </Box>
          <ToastContainer />
        </main>
      </div>
    </>
  );
};

export default Allcontent;
