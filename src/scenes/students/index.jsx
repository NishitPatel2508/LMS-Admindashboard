import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Contacts = () => {
  const [allData, setAllData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getAllRevenue();
  }, []);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let i = 0;
  const getAllRevenue = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const result = await axios
        .get(`http://localhost:5000/getAllRevenue`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          if (response) {
            if (response.data) {
              setAllData(response.data.data);
              console.log(response.data.data);
              console.log("all", allData);
              response.data.data.map((e) => {
                i += e.courseAmount;
                console.log(e.courseAmount);
              });
              console.log(i);
            }
          }
        })
        .catch((err) => {
          // toast.error(err.response.data.message);
          console.log(err.response.data);
          // setError(err.response.data.message);
        });
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "coursename",
      headerName: "Course",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "username",
      headerName: "Username",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "date",
      headerName: "Buy Date",
      flex: 1,
      cellClassName: "name-column--cell",
    },
  ];
  const rows = allData.map((element, i) => {
    const formattedDate = moment(element.buyDate).format("llll");
    return {
      id: i,
      // _id: element._id,
      username: element.userInfo.name,
      coursename: element.courseInfo,
      price: element.courseAmount,
      date: formattedDate,
    };
  });

  const [theme1, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="20px">
          <Header
            title="STUDENTS"
            subtitle="List of Students for Future Reference"
          />
          <Box
            m="40px 0 0 0"
            height="63vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
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
      </main>
    </div>
  );
};

export default Contacts;
