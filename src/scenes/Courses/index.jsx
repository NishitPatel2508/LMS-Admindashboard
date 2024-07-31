import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  getAllCourseInstance,
  handleDeleteCourse,
} from "../../instances/Course/CourseInstance";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import Search from "../../components/Search";

const Course = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  const [allCourse, setAllCourse] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [noCourse, setNoCourse] = useState("");
  const [search, setSearch] = useState("");
  const [searchErrMsg, setSearchErrMsg] = useState("");

  useEffect(() => {
    CourseDetails();
    // subCategoryDetails();
    // getallProgrammingLanguage();
    console.log(page);
  }, [page, totalPage, search]);
  const handlePageNo = (event, value) => {
    setPage(value);
  };
  const CourseDetails = async () => {
    try {
      const response = await getAllCourseInstance(page, search);
      // console.log(data.data);
      // console.log(response.message);
      // console.log("Pagination", data);
      // console.log("Page", Math.ceil(response.pagination.pageCount));
      if (response.message === "Got data Successfully") {
        setAllCourse(response.data);
        setTotalPage(Math.ceil(response.pagination.pageCount));
        console.log(response.data);
        setSearchErrMsg("");
      }
      if (response === "Record not found") {
        setSearchErrMsg("Record not found");
      }

      // if (search.length === 0) {
      //   setAllCourse(response.data);
      // }
      // setAllCourse(data.data);
      // setSearchData(data.data);
      // const filterData = allCourse.filter((course) => course.name)
      // if (response.data.length == 0) {
      //   setNoCourse("You don't have any courses. Please create a new course.");
      // }
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

  //SEARCH
  const handleChangeSearch = async (e) => {
    setSearch(e.target.value);
  };

  //   if (search) {
  //     setAllCourse([]);
  //     setIsSearch(true);
  //     const response = await getAllCourseInstance(e.target.value).then(
  //       (response) => {
  //         if (response.message === "Got data Successfully") {
  //           setSearchData(response.data);
  //           setAllCourse(response.data);
  //           setSearchErrMsg("");
  //         } else {
  //           setSearchErrMsg("Record not found");
  //         }
  //       }
  //     );
  //   }
  //   if (e.target.value.length === 0) {
  //     setIsSearch(false);
  //     setSearchData([]);
  //   }
  // };
  // const handleSelectedSearch = (name) => {
  //   const filteredItems =
  // };

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
            <Search
              handleChangeSearch={handleChangeSearch}
              searchErrMsg={searchErrMsg}
            />
            {/* <Box
              display="inline-block"
              position="relative"
              // backgroundColor={colors.primary[400]}
              // flexDirection="row"
              // borderRadius="3px"
            >
              <input
                type="text"
                onChange={handleChangeSearch}
                placeholder="Search"
                style={{
                  marginLeft: "2px",
                  paddingLeft: "8px",
                  width: "280px",
                  border: "3px solid #eee",
                  height: "45px",
                  backgroundColor: "#6c757",
                  borderRadius: "5px",
                }}
              />
              {searchErrMsg && (
                <Box
                  // display={isSearch ? "block" : "none"}
                  position="absolute"
                  minWidth="160px"
                  padding="8px 5px"
                  zIndex="1"
                  backgroundColor={colors.primary[400]}
                  color="black"
                >
                  {searchErrMsg && (
                    <div
                      // key={item._id}
                      style={{
                        width: "270px",
                        textAlign: "left",
                        height: "35px",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      // onChange={handleSelectedSearch(item.name)}
                    >
                      {searchErrMsg}
                    </div>
                  )}
                </Box>
              )}
            </Box> */}
          </Box>
          <Box className="d-flex justify-content-center fs-4 align-items-center">
            {noCourse && <span>{noCourse}</span>}
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
          <Fab
            color="primary"
            aria-label="add"
            sx={{
              bottom: 16,
              right: 30,
              position: "fixed",
            }}
            onClick={() => {
              navigate("/addnewcourse");
            }}
          >
            <AddIcon />
          </Fab>
        </Box>
      </main>
    </div>
  );
};

export default Course;
