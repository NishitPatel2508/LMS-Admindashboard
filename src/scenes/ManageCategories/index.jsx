import { Box, Typography, useTheme, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Invoices = () => {
  const theme = useTheme();
  const [isSidebar, setIsSidebar] = useState(true);
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const fields = [
    // {
    //   name: "Categories",
    //   subtitle: "Manage Categories",
    //   links: "/allCategories",
    // },
    {
      name: "Subcategories",
      subtitle: "Manage Subategories",
      links: "/manageallsubcategories",
    },
    {
      name: "Programming Languages",
      subtitle: "Manage Programming Languages",
      links: "/manageallprogramminglanguages",
    },
    {
      name: "Chapters",
      subtitle: "Manage Chapters",
      links: "/manageallchapters",
    },
    {
      name: "Content Videos",
      subtitle: "Manage Content Videos",
      links: "/manageallcontentvideos",
    },
    {
      name: "Content Files",
      subtitle: "Manage Content Files",
      links: "/manageallcontentfiles",
    },
    {
      name: "Contents",
      subtitle: "Manage Contents",
      links: "/manageallcontents",
    },
  ];
  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="18px">
          <Header
            title="Manage Categories"
            subtitle="List of Categories, Subcategories and Programming languages"
          />

          <Box
            display="grid"
            gridTemplateColumns="repeat(9, 1fr)"
            gridAutoRows="175px"
            sx={{
              "& > div": {
                gridColumn: "span 3",
              },
            }}
          >
            {fields.map((element) => {
              return (
                <Box>
                  <Card sx={{ width: 320 }} m="5px 20px">
                    <CardContent>
                      <Typography
                        gutterBottom
                        component="div"
                        style={{ fontWeight: "bold", fontSize: "17px" }}
                      >
                        {`${element.name}`}
                      </Typography>
                      <Typography
                        gutterBottom
                        component="div"
                        style={{
                          fontSize: "16px",
                        }}
                      >
                        {`${element.subtitle}`}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {/* <Box
                        display="flex"
                        gap={"20px"}
                        justifyContent=""
                        alignItems="end"
                      > */}
                      <Button
                        fullWidth
                        // color="secondary"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          navigate(element.links);
                        }}
                      >
                        {`${element.subtitle}`}
                      </Button>

                      {/* <Button
                          variant="contained"
                          color="success"
                          // onClick={() => {
                          //   setDetailsToLocalStorage(element._id);
                          // }}
                        >
                          Update
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          // onClick={() => {
                          //   handleDelete(element._id);
                          // }}
                        >
                          Delete
                        </Button> */}
                      {/* </Box> */}
                    </CardActions>
                  </Card>
                </Box>
              );
            })}
          </Box>
        </Box>
      </main>
    </div>
  );
};

export default Invoices;
