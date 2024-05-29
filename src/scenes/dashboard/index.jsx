import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import { Component, useEffect, useState } from "react";
import axios from "axios";
import DonutChart from "../../components/DonutChart";
import BarChart from "../../components/BarChart";
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import ReactToPrint from "react-to-print";

const options = {
  filename: "InstructorReport.pdf",
  // default is `save`
  method: "open",
  // default is Resolution.MEDIUM = 3, which should be enough, higher values
  // increases the image quality but also the size of the PDF, so be careful
  // using values higher than 10 when having multiple pages generated, it
  // might cause the page to crash or hang.
  resolution: Resolution.HIGH,
  page: {
    // margin is in MM, default is Margin.NONE = 0
    margin: Margin.HIGH,
    // default is 'A4'
    format: "letter",
    // default is 'portrait'
    orientation: "landscape",
  },
  canvas: {
    // default is 'image/jpeg' for better size performance
    mimeType: "image/png",
    qualityRatio: 1,
  },
  // Customize any value passed to the jsPDF instance and html2canvas
  // function. You probably will not need this and things can break,
  // so use with caution.
  overrides: {
    // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
    pdf: {
      compress: true,
    },
    // see https://html2canvas.hertzen.com/configuration for more options
    canvas: {
      useCORS: true,
    },
  },
};

const getTargetElement = () => document.getElementById("container");
const downloadPdf = () => generatePDF(getTargetElement, { options });
const getPageMargins = () => {
  return `@page {  size: landscape;  }`;
};
const Dashboard = () => {
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  // const [user,setUser] = useState(null)
  const [totalStudents, setTotalStudents] = useState(0);
  const [allContentVideo, setAllContentVideo] = useState({});
  const [revenue, setAllRevenue] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [courseLength, setCoursesLength] = useState("");
  const [contentFileLength, setContentFileLength] = useState("");

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const result = await axios
        .get("http://localhost:5000/dashboard", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log(result);
          console.log(result.data.data[0]);
          console.log(result.data.data);
          fetchDataFieldVise(result.data.data);
          // console.log(result.data.data[0]);
          // const c = JSON.parse(result.data.data[0])
          // console.log(c);
        })
        .catch((err) => {
          console.log(err.response);
          console.log(accessToken);
        });
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  // const fields = ["Courses","Languages","Categories","Subcategories","ProgrammingLanguages","Chapteres","ContentVideoes","Contents"]
  // const r = [cs,ls,cats,subcats,pl,ch,cv,ct]
  let r = 0;
  const hanldleRevenue = (e) => {
    e.map((i) => {
      r += i.courseAmount;
      console.log(i.courseAmount);
    });
    setTotalRevenue(r);
  };
  const fetchDataFieldVise = (records) => {
    for (const field of records) {
      if (Object.keys(field) == "Courses") {
        console.log(field);
        const j = Object.values(field)[0].length;
        setCoursesLength(j);
      }
      if (Object.keys(field) == "ContentFiles") {
        console.log(field);
        const j = Object.values(field)[0].length;
        setContentFileLength(j);
      }
      // if (Object.keys(field) == "ContentVideoes") {
      //   console.log(field);
      //   setAllContentVideo(field);
      //   // allContentVideo.push(field)
      //   console.log(allContentVideo);
      //   const j = Object.values(field)[0].length;
      //   setTotalStudents(j);
      // }
      if (Object.keys(field) == "Revenue") {
        console.log(field);
        setAllRevenue(field);
        // allContentVideo.push(field)
        const j = Object.values(field)[0];
        console.log(Object.values(field)[0]);
        hanldleRevenue(j);
        const s = Object.values(field)[0].length;
        setTotalStudents(s);
      }
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
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

            <Box>
              <ReactToPrint
                trigger={() => {
                  return (
                    <Button
                      sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 10px",
                      }}
                      onClick={downloadPdf}
                    >
                      <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                      Download Reports
                    </Button>
                  );
                }}
                content={getTargetElement}
                documentTitle="InstructorReportPDF"
                pageStyle={getPageMargins}
                onAfterPrint={() => {
                  console.log("Document is Printed");
                }}
              />
            </Box>
          </Box>

          {/* GRID & CHARTS */}
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="16px"
            id="container"
            // ref={(el) => (this.componentRef = el)}
          >
            {/* ROW 1 */}
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={courseLength}
                subtitle="Total Courses"
                // progress="0.75"
                // increase="+14%"
                icon={
                  <EmailIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={contentFileLength}
                subtitle="Total Content Files"
                // progress="0.50"
                // increase="+21%"
                icon={
                  <PointOfSaleIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={totalStudents}
                subtitle="Total Students"
                // progress="0.30"
                // increase="+5%"
                icon={
                  <PersonAddIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={`Rs. ${totalRevenue}`}
                subtitle="Revenue"
                // progress="0.80"
                // increase="+43%"
                icon={
                  <TrafficIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>

            {/* ROW 2 */}
            <Box
              gridColumn="span 6"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
            >
              <Box
                mt="25px"
                p="0 20px"
                display="flex "
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Live Courses
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                  >
                    {courseLength}
                  </Typography>
                </Box>
                <Box>
                  <IconButton>
                    <DownloadOutlinedIcon
                      sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Box height="280px" m="-20px 0 0 0">
                <DonutChart isDashboard={true} />
              </Box>
            </Box>
            {/* <Box
              gridColumn="span 4"
              gridRow="span 1"
              backgroundColor={colors.primary[400]}
              overflow="auto"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="15px"
              >
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  fontWeight="600"
                >
                  Videos
                </Typography>
              </Box> 
              {mockTransactions.map((transaction, i) => (
                <Box
                  key={`${transaction.txId}-${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                >
                  <Box>
                    <Typography
                      color={colors.greenAccent[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {transaction.txId}
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      {transaction.user}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>{transaction.date}</Box>
                  <Box
                    backgroundColor={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                  >
                    ${transaction.cost}
                  </Box>
                </Box>
              ))} 
            </Box> */}

            {/* ROW 3 */}
            {/* <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              p="30px"
            >
              <Typography variant="h5" fontWeight="600">
                Campaign
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="25px"
              >
                <PieChart />
                <Typography
                  variant="h5"
                  color={colors.greenAccent[500]}
                  sx={{ mt: "15px" }}
                >
                  $48,352 revenue generated
                </Typography>
                <Typography>Revenue Genrated Course Wise</Typography>
              </Box>
            </Box> */}
            <Box
              gridColumn="span 6"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
            >
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ padding: "30px 30px 0 30px" }}
              >
                Sold Course Per Month
              </Typography>
              <Box height="250px" mt="-20px">
                <BarChart isDashboard={true} />
              </Box>
            </Box>
            {/* <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              padding="30px"
            >
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ marginBottom: "15px" }}
              >
                Geography Based Traffic
              </Typography>
              <Box height="200px"><PieChart isDashboard={true} /></Box>
            </Box> */}
          </Box>
        </Box>
      </main>
    </div>
  );
};

export default Dashboard;
