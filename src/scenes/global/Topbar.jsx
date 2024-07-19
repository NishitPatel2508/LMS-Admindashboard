import { Box, IconButton, useTheme } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../app/Slice/authSlice";
import { getInstructorInfoInstance } from "../../instances/InstructorInstance";
const Topbar = () => {

  // useEffect(() => {
  //   getInstructorInfo();
  // }, []);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [profileImg, setprofileImg] = useState("");
  //Logout
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleProfile = () => {
    navigate("/profileupdate");
  };
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(logout());
  };

  const getInstructorInfo = async () => {
    const response = await getInstructorInfoInstance().then((response) => {
      setprofileImg(response.profileImg);
    });
  };
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase
          sx={{ ml: 2, flex: 2, width: "280px" }}
          placeholder="Search"
        />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          {/* <PersonOutlinedIcon /> */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={`${profileImg}`} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "40px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="" onClick={handleCloseUserMenu}>
                <Typography
                  textAlign="center"
                  padding="2px 8px"
                  onClick={handleProfile}
                >
                  Profile
                </Typography>
              </MenuItem>

              <MenuItem key="" onClick={handleCloseUserMenu}>
                <Typography
                  textAlign="center"
                  padding="2px 8px"
                  onClick={handleLogout}
                >
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
