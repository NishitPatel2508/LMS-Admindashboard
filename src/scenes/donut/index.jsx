import { Box } from "@mui/material";
import Header from "../../components/Header";
import DonutChart from "../../components/DonutChart";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import { useState } from "react";
const Donut = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
        <Box m="20px">
          <Header title="Donut Chart" subtitle="Revenue Course Vise" />

          <Box height="58vh">
            <DonutChart />
          </Box>
        </Box>
  );
};

export default Donut;
