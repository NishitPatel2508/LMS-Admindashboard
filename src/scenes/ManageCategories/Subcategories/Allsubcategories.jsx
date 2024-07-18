import React from "react";
import { Box, Button, Modal, useTheme } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import AddForm from "./AddForm";
import UpdateSubCategory from "./UpdateSubCategory";
import { tokens } from "../../../theme";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import Sidebar from "../../global/Sidebar";
import Topbar from "../../global/Topbar";
import Header from "../../../components/Header";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../../basic";
import {
  deleteSubCategoryInstance,
  getAllSubCategoryInstance,
} from "../../../instances/SubCategoryInstance";

const Allsubcategories = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isSidebar, setIsSidebar] = useState(true);
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [, setUpdate] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    getAllSubCategories();
  };
  const [openHandle, setOpenHandle] = React.useState(false);
  const handleOpenUpdate = () => setOpenHandle(true);
  const handleCloseUpdate = () => {
    setOpenHandle(false);
    getAllSubCategories();
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
    getAllSubCategories();
  }, []);
  const getAllSubCategories = async () => {
    try {
      const data = await getAllSubCategoryInstance();
      setAllSubCategories(data);
    } catch (error) {
      console.error("Error during Get all subcategory:", error);
    }
  };

  const deleteSubCategory = async (id) => {
    try {
      await deleteSubCategoryInstance(id);
      toast.success("Deleted successfully", { autoClose: 2000 });
      getAllSubCategories();
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },

    // { field: "_id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Subcategory Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "category",
      headerName: "Category Name",
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

          allSubCategories.map((ele) => {
            if (currentRow.name == ele.subCategoryName) {
              setUpdate(true);
              handleOpenUpdate();
              localStorage.setItem("updatesubcategories", ele._id);
              // console.log(object);
            }
          });
        };

        const handleDelete = () => {
          const currentRow = params.row;

          // const id = ;
          allSubCategories.map((ele) => {
            if (currentRow.name == ele.subCategoryName) {
              // console.log(currentRow._id);
              deleteSubCategory(ele._id);
              // alert(JSON.stringify(currentRow));
            }
          });
        };

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            color="warning"
            onClick={handleUpdate}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDelete}
            color="error"
          />,
        ];
      },
    },
  ];
  const rows = allSubCategories.map((element, i) => {
    return {
      id: i,
      // _id: element._id,
      name: element.subCategoryName,
      category: element.category.categoryName,
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
              <AddForm closeEvent={handleClose} />
            </Box>
          </Modal>
          <Modal
            open={openHandle}
            onClose={handleCloseUpdate}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <UpdateSubCategory closeEvent={handleCloseUpdate} />
            </Box>
          </Modal>
          ,
          <Box m="18px">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Header
                title="Manage Subategories"
                subtitle="List of Subcategories"
              />
              <Box>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#5d5de7",
                    // color: colors.grey[100],
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                  }}
                  onClick={handleOpen}
                >
                  <AddIcon sx={{ mr: "10px" }} />
                  Add New Sub Category
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

export default Allsubcategories;
