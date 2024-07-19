import { Box, Typography, useTheme, Button, Link } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  getAllCourseInstance,
  handleDeleteCourse,
} from "../../instances/Course/CourseInstance";

const Course = () => {
  const theme = useTheme();
  const [isSidebar, setIsSidebar] = useState(true);
  const colors = tokens(theme.palette.mode);
  const [allCourse, setAllCourse] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  useEffect(() => {
    CourseDetails();
    console.log(page);
  }, [page, totalPage]);
  const handlePageNo = (event, value) => {
    setPage(value);
  };
  const CourseDetails = async () => {
    try {
      const data = await getAllCourseInstance(page);
      // console.log(data.data);
      // // console.log(data);
      // console.log("Pagination", data);
      // console.log("Page", Math.round(data.pagination.pageCount));
      setTotalPage(Math.round(data.pagination.pageCount));
      setAllCourse(data.data);
    } catch (e) {
      console.log("ttt", e);
    }
  };
  const setDetailsToLocalStorage = async (id) => {
    // debugger;
    await localStorage.setItem("courseid", id);
    // localStorage.courseid = id;
    const i = localStorage.getItem("courseid");

    navigate("/courseupdates");
    console.log(i);
  };
  const handleDelete = async (id) => {
    try {
      try {
        const response = await handleDeleteCourse(id).then((res) => {
          toast.success("Deleted successfully", { autoClose: 2000 });
          console.log("Deleted");
          setTimeout(() => {
            setPage(1);
            CourseDetails();
          }, 2000);
        });
      } catch (error) {
        console.log("deleteEr", error);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Courses" subtitle="Your Courses" />

        <Box>
          <Button
            sx={{
              backgroundColor: "#590ed3",
              color: "white",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              ":hover": { color: "black" },
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
        mb="12px"
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
                  title={`${element.name}`}
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
      <ToastContainer />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "5px",
          height: "25px",
        }}
      >
        <Stack
          spacing={2}
          sx={{
            fontSize: "15px",
            fontWeight: 600,
          }}
        >
          <Pagination
            count={totalPage}
            onChange={handlePageNo}
            page={page}
            variant="outlined"
            shape="rounded"
            color="secondary"
            showFirstButton
            showLastButton
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default Course;
