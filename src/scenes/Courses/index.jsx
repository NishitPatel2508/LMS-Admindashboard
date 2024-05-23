import { Box, Typography, useTheme, Button, Link } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { tokens } from "../../theme";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import Header from "../../components/Header";
import { ColorModeContext, useMode } from "../../theme";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// import { Outlet, Link } from "react-router-dom";

const Course = () => {
  const theme = useTheme();
  const [theme1, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const colors = tokens(theme.palette.mode);
  const [allCourse, setAllCourse] = useState([]);
  const navigate = useNavigate();
  // let allCourse = [];
  // const columns = [
  //   { field: "id", headerName: "ID" },
  //   {
  //     field: "name",
  //     headerName: "Name",
  //     flex: 1,
  //     cellClassName: "name-column--cell",
  //   },
  //   {
  //     field: "Category",
  //     headerName: "Category",
  //     type: "number",
  //     headerAlign: "left",
  //     align: "left",
  //   },
  //   {
  //     field: "Chapters",
  //     headerName: "Chapters",
  //     flex: 1,
  //   },
  //   {
  //     field: "Language",
  //     headerName: "Language",
  //     flex: 1,
  //   },

  //   {
  //     field: "accessLevel",
  //     headerName: "Access Level",
  //     flex: 1,
  //     renderCell: ({ row: { access } }) => {
  //       return (
  //         <Box
  //           width="60%"
  //           m="0 auto"
  //           p="5px"
  //           display="flex"
  //           justifyContent="center"
  //           backgroundColor={
  //             access === "Paid"
  //               ? colors.greenAccent[600]
  //               : access === "Paid"
  //               ? colors.greenAccent[700]
  //               : colors.greenAccent[700]
  //           }
  //           borderRadius="4px"
  //         >
  //           {access === "Paid" && <AdminPanelSettingsOutlinedIcon />}
  //           {access === "Free" && <SecurityOutlinedIcon />}

  //           <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
  //             {access}
  //           </Typography>
  //         </Box>
  //       );
  //     },
  //   },
  // ];
  useEffect(() => {
    getAllCourse();
  }, []);

  const getAllCourse = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      let result = await axios
        .get("http://localhost:5000/getAllCourse", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log(result);
          console.log(result.data.data[0]);
          console.log(allCourse, "all");
          setAllCourse(result.data.data);
        })
        .catch((err) => {
          console.log(err.response);
          console.log(accessToken);
        });
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  const setDetailsToLocalStorage = (id) => {
    debugger;
    localStorage.setItem("courseid", id);
    // localStorage.courseid = id;
    const i = localStorage.getItem("courseid");

    navigate("/courseupdates");
    console.log(i);
  };
  const handleDelete = async (id) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }

      let result = await axios
        .delete(`http://localhost:5000/course/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((result) => {
          toast.success("Deleted successfully");
          console.log("Deleted");
          setTimeout(() => {
            navigate("/db");
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
  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="20px">
          {/* HEADER */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header title="Courses" subtitle="Your Courses" />

            <Box>
              <Button
                sx={{
                  backgroundColor: "#5d5de7",
                  // color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
                onClick={() => {
                  navigate("/addnewcourse");
                }}
              >
                <AddIcon sx={{ mr: "10px" }} />
                Add New Course
              </Button>
            </Box>
          </Box>
          <Box
            display="grid"
            gap="25px"
            gridTemplateColumns="repeat(7, minmax(0, 1fr))"
            sx={{
              "& > div": {
                gridColumn: "span 2",
              },
            }}
          >
            {allCourse.map((element) => {
              return (
                <Box mt="12px">
                  <Card sx={{ width: 285 }} m="0 30px">
                    <CardMedia
                      sx={{ height: 140 }}
                      image={`${element.courseImg}`}
                      // title="green iguana"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        component="div"
                        style={{ fontWeight: "bold", fontSize: "16px" }}
                      >
                        {`${element.name}`}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ fontWeight: "bold" }}
                      >
                        <CurrencyRupeeIcon />
                        {`${element.price}`}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                          setDetailsToLocalStorage(element._id);
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          handleDelete(element._id);
                        }}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              );
            })}
          </Box>
        </Box>

        <ToastContainer />
      </main>
    </div>
  );
};

export default Course;
