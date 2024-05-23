import React from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Modal,
  useTheme,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
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
import { Document, Page } from "react-pdf";
import UpdateFiles from "./UpdateFiles";
import { pdfjs } from "react-pdf";
import AddFormContentFiles from "./AddFormContentFiles";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
// Your render function

import { tokens } from "../../../theme";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import CloseIcon from "@mui/icons-material/Close";
import { useMode } from "../../../theme";
import Sidebar from "../../global/Sidebar";
import Topbar from "../../global/Topbar";
import StatBox from "../../../components/StatBox";
import Header from "../../../components/Header";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactPDF from "@react-pdf/renderer";

const AllContentFiles = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [allFiles, setAllFiles] = useState([]);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openHandle, setOpenHandle] = React.useState(false);
  const handleOpenUpdate = () => setOpenHandle(true);
  const handleCloseUpdate = () => setOpenHandle(false);
  const handleOpenFile = () => setOpenHandleFile(true);
  const [openHandleFile, setOpenHandleFile] = React.useState(false);
  const handleCloseFile = () => setOpenHandleFile(false);
  const navigate = useNavigate();
  // const port = process.env.PORT;
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
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
  const stylePDF = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    getallContentFiles();
  }, []);
  const getallContentFiles = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      let result = await axios
        .get("http://localhost:5000/allFiles", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log(result);
          console.log(result.data.data);
          setAllFiles(result.data.data);
          // setFile(result.data.data.name);
          // console.log(result.data.data.pdf);
          console.log(allFiles);
        })

        .catch((err) => {
          console.log(err.response);
          console.log(accessToken);
        });
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const deleteContentFile = async (id) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }

      let result = await axios
        .delete(`http://localhost:5000/file/delete/${id}`, {
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
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Chapter Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "filename",
      headerName: "File Name",
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

          allFiles.map((ele) => {
            if (currentRow.filename == ele.name) {
              setUpdate(true);
              localStorage.setItem("updatefile", ele._id);
              console.log(ele._id);
              handleOpenUpdate();
            }
          });
        };

        const handleDelete = () => {
          const currentRow = params.row;

          // const id = ;
          allFiles.map((ele) => {
            if (currentRow.filename == ele.name) {
              console.log(ele._id);
              deleteContentFile(ele._id);
              // alert(JSON.stringify(currentRow));
            }
          });
        };

        const handleOpenFiles = () => {
          const currentRow = params.row;
          allFiles.map((ele) => {
            if (currentRow.filename == ele.name) {
              console.log(ele._id);
              setFile(ele.pdf);
              setFileName(ele.name);
              console.log(ele.pdf);
              // window.open(ele.name);
              // let reader = new FileReader();
              // reader.readAsDataURL(ele.name);
              // reader.onload = (e) => {
              //   setFile(e.target.result);
              // };
              // alert(JSON.stringify(currentRow));

              handleOpenFile();
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
              label="View File"
              onClick={handleOpenFiles}
              color="success"
            />
          </Box>,
        ];
      },
    },
  ];
  const rows = allFiles.map((element, i) => {
    return {
      id: i,
      // _id: element._id,
      name: element.chapter.chapterName,
      filename: element.name,
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
              <AddFormContentFiles closeEvent={handleClose} />
            </Box>
          </Modal>
          <Modal
            open={openHandle}
            onClose={handleCloseUpdate}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <UpdateFiles closeEvent={handleCloseUpdate} />
            </Box>
          </Modal>
          <Modal
            open={openHandleFile}
            // onClose={handleCloseFile}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            // onClick={handleOpenFile}
          >
            <Box sx={stylePDF}>
              <div>
                <IconButton
                  style={{ position: "absolute", top: "1", right: "0" }}
                  onClick={handleCloseFile}
                >
                  <CloseIcon />
                </IconButton>
                <h5>{fileName}</h5>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                  <div
                    style={{
                      border: "1px solid rgba(0, 0, 0, 0.3)",
                      height: "550px",
                      width: "500",
                    }}
                  >
                    <Viewer
                      fileUrl={`http://localhost:5000/uploads/${fileName}`}
                    />
                  </div>
                </Worker>
              </div>
            </Box>
          </Modal>

          <Box m="18px">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Header
                title="Manage Content Files"
                subtitle="List of Content Files"
              />
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
                  Add New Content File
                </Button>
              </Box>
            </Box>
            <Box>
              <Box
                m="40px 0 0 0"
                height="60vh"
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
            </Box>
          </Box>
          <ToastContainer />
        </main>
      </div>
    </>
  );
};

export default AllContentFiles;
