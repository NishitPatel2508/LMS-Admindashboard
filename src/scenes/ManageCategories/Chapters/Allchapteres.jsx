import React from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Modal,
  useTheme,
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

import AddFormChapters from "./AddFormChapters";
import UpdateChapters from "./UpdateChapters";
import { tokens } from "../../../theme";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
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

const Allchapteres = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [allChapter, setAllChapters] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openHandle, setOpenHandle] = React.useState(false);
  const handleOpenUpdate = () => setOpenHandle(true);
  const handleCloseUpdate = () => setOpenHandle(false);
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
    getallChapter();
  }, []);
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

  const deleteChapter = async (id) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }

      let result = await axios
        .delete(`http://localhost:5000/chapter/delete/${id}`, {
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
      field: "course",
      headerName: "Course Name",
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

          allChapter.map((ele) => {
            if (
              currentRow.name == ele.chapterName &&
              currentRow.course == ele.course.name
            ) {
              setUpdate(true);
              handleOpenUpdate();
              localStorage.setItem("updatechapter", ele._id);
              console.log(ele._id);
            }
          });
        };

        const handleDelete = () => {
          const currentRow = params.row;

          // const id = ;
          allChapter.map((ele) => {
            if (
              currentRow.name == ele.chapterName &&
              currentRow.course == ele.course.name
            ) {
              // console.log(currentRow._id);
              deleteChapter(ele._id);
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
            />
          </Box>,
        ];
      },
    },
  ];
  const rows = allChapter.map((element, i) => {
    return {
      id: i,
      // _id: element._id,
      name: element.chapterName,
      course: element.course.name,
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
              <AddFormChapters closeEvent={handleClose} />
            </Box>
          </Modal>
          <Modal
            open={openHandle}
            onClose={handleCloseUpdate}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <UpdateChapters closeEvent={handleCloseUpdate} />
            </Box>
          </Modal>
          ,
          <Box m="18px">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Header title="Manage Chapters" subtitle="List of Chapters" />
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
                  Add New Chapter
                </Button>
              </Box>
            </Box>
            <Box>
              <Box
                m="40px 0 0 0"
                height="56vh"
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

export default Allchapteres;
