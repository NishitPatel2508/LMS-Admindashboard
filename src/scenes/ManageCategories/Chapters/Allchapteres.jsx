import React, { useCallback } from "react";
import { Box, Button, Modal, useTheme } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";

import AddFormChapters from "./AddFormChapters";
import UpdateChapters from "./UpdateChapters";
import { tokens } from "../../../theme";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import Sidebar from "../../global/Sidebar";
import Topbar from "../../global/Topbar";

import Header from "../../../components/Header";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  deleteChapterInstance,
  getAllChapterInstance,
} from "../../../instances/ChapterInstance";

const Allchapteres = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [allChapter, setAllChapters] = useState([]);
  const [updateChapter, setUpdateChapter] = useState("");

  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    getallChapter();
  };
  const [openHandle, setOpenHandle] = React.useState(false);
  const handleOpenUpdate = () => setOpenHandle(true);
  const handleCloseUpdate = () => {
    setOpenHandle(false);
    getallChapter();
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
    getallChapter();
  }, []);
  // const show

  const getallChapter = async () => {
    try {
      let data = await getAllChapterInstance();
      setAllChapters(data);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const deleteChapter = async (id) => {
    try {
      let response = await deleteChapterInstance(id);
      toast.success(response.message, { autoClose: 2000 });
      setTimeout(() => {
        getallChapter();
      }, 2000);
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
              setUpdateChapter(ele._id);
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
                  // loading={loading}
                />
              </Box>
            </Box>
          </Box>
          <ToastContainer />
    </>
  );
};

export default Allchapteres;
