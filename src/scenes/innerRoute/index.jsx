import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import { useState } from "react";

const InnerRoutes = () => {
    const theme = useTheme();
    const [theme1, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme1}>
      <CssBaseline />
      <div className="app">
    <Sidebar isSidebar={isSidebar} />
      <main className="content">
      <Topbar setIsSidebar={setIsSidebar} />
 
    </main>
    </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default InnerRoutes;
