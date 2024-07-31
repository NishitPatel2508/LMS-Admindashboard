import React from "react";
import { Box, Fab, IconButton, Modal, useTheme } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import UpdateFiles from "./UpdateFiles";
import { pdfjs } from "react-pdf";
import AddFormContentFiles from "./AddFormContentFiles";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { tokens } from "../../../theme";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import CloseIcon from "@mui/icons-material/Close";
import Sidebar from "../../global/Sidebar";
import Topbar from "../../global/Topbar";
import Header from "../../../components/Header";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { BLOB_READ_WRITE_TOKEN } from "../../../basic";
import { del } from "@vercel/blob";
import {
  deleteContentFileInstance,
  getAllContentFileInstance,
} from "../../../instances/ContentFileInstance";
import Search from "../../../components/Search";

const AllContentFiles = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [allFiles, setAllFiles] = useState([]);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [open, setOpen] = React.useState(false);
  const [, setUpdate] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    getallContentFiles();
  };
  const [openHandle, setOpenHandle] = React.useState(false);
  const handleOpenUpdate = () => setOpenHandle(true);
  const handleCloseUpdate = () => {
    setOpenHandle(false);
    getallContentFiles();
  };
  const handleOpenFile = () => setOpenHandleFile(true);
  const [openHandleFile, setOpenHandleFile] = React.useState(false);
  const handleCloseFile = () => {
    setOpenHandleFile(false);
    // getallContentFiles();
  };

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
  }, [search]);
  const getallContentFiles = async () => {
    try {
      let response = await getAllContentFileInstance(search);
      if (response.message === "Got data Successfully") {
        setAllFiles(response.data);
        setSearchErrMsg("");
      }
      if (response.message === "Record not found") {
        setSearchErrMsg("Record not found");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const deleteContentFile = async (id) => {
    try {
      await deleteContentFileInstance(id);
      toast.success("Deleted successfully", { autoClose: 2000 });
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
        const handleUpdate = () => {
          const currentRow = params.row;

          allFiles.map((ele) => {
            if (currentRow.filename === ele.name) {
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
            if (currentRow.filename === ele.name) {
              console.log(ele._id);
              del(ele.pdf, {
                access: "public",
                token: BLOB_READ_WRITE_TOKEN,
              });
              // console.log(r.url);
              deleteContentFile(ele._id);
              // alert(JSON.stringify(currentRow));
            }
          });
        };

        const handleOpenFiles = () => {
          const currentRow = params.row;
          allFiles.map((ele) => {
            if (currentRow.filename === ele.name) {
              console.log(ele._id);
              setFile(ele.pdf);
              setFileName(ele.name);

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
                    <Viewer fileUrl={`${file}`} />
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
                <Search
                  handleChangeSearch={handleChangeSearch}
                  searchErrMsg={searchErrMsg}
                />
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

export default AllContentFiles;
