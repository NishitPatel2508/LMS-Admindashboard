import React from "react";
import { Box, Modal, useTheme } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";

import Fab from "@mui/material/Fab";
import AddFormPL from "./AddFormPL";
import UpdateProgrammingLang from "./UpdateProgrammingLang";
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
  deleteProgrammingLanguageInstance,
  getAllProgrammingLanguageInstance,
} from "../../../instances/ProgrammingLangauageInstance";
import Search from "../../../components/Search";

const Allprogramminglang = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);

  const [allProgrammingLanguage, setAllProgrammingLanguage] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [, setUpdate] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    getallProgrammingLanguage();
  };
  const [openHandle, setOpenHandle] = React.useState(false);
  const handleOpenUpdate = () => setOpenHandle(true);
  const handleCloseUpdate = () => {
    setOpenHandle(false);
    getallProgrammingLanguage();
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

  useEffect(() => {
    getallProgrammingLanguage();
  }, [search]);
  const getallProgrammingLanguage = async () => {
    try {
      let response = await getAllProgrammingLanguageInstance(search);
      if (response.message === "Got data Successfully") {
        setAllProgrammingLanguage(response.data);
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

  const deleteProgramingLang = async (id) => {
    try {
      await deleteProgrammingLanguageInstance(id);
      toast.success("Deleted successfully", { autoClose: 2000 });
      getallProgrammingLanguage();
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Programming Language Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "subcategory",
      headerName: "Subcategory Name",
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

          allProgrammingLanguage.map((ele) => {
            if (currentRow.name === ele.programmingLanguageName) {
              setUpdate(true);
              handleOpenUpdate();
              localStorage.setItem("updateprogramminglang", ele._id);
            }
          });
        };

        const handleDelete = () => {
          const currentRow = params.row;

          // const id = ;
          allProgrammingLanguage.map((ele) => {
            if (currentRow.name === ele.programmingLanguageName) {
              // console.log(currentRow._id);
              deleteProgramingLang(ele._id);
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
  const rows = allProgrammingLanguage.map((element, i) => {
    return {
      id: i,
      // _id: element._id,
      name: element.programmingLanguageName,
      subcategory: element.subCategory.subCategoryName,
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
              <AddFormPL closeEvent={handleClose} />
            </Box>
          </Modal>
          <Modal
            open={openHandle}
            onClose={handleCloseUpdate}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <UpdateProgrammingLang closeEvent={handleCloseUpdate} />
            </Box>
          </Modal>
          <Box m="18px">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Header
                title="Manage Programming Languages"
                subtitle="List of Programming Languages"
              />
              {/* <Box>
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
                  Add New Programming Languages
                </Button>
              </Box> */}
              <Search
                handleChangeSearch={handleChangeSearch}
                searchErrMsg={searchErrMsg}
              />
            </Box>
            <Box>
              <Box
                m="40px 0 0 0"
                height="57vh"
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

export default Allprogramminglang;
