import { Box, IconButton, useTheme } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../app/Slice/authSlice";
import { getInstructorInfoInstance } from "../../instances/InstructorInstance";

const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [profileImg, setprofileImg] = useState("");
  useEffect(() => {
    getInstructorInfo();
  }, []);
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
    navigate("/login");
  };

  const getInstructorInfo = async () => {
    await getInstructorInfoInstance().then((response) => {
      setprofileImg(response.profileImg);
    });
  };
  // const handleChangeSearch = async (e) => {
  //   setSearch(e.target.value);

  //   if (search) {
  //     setIsSearch(true);
  //     await searchDBInstance(e.target.value).then((response) => {
  //       setSearchData(response.data);
  //       // console.log(response.data);
  //       // searchData.map((item) => {
  //       //   console.log(item.name);
  //       // });
  //     });
  //   }
  //   if (e.target.value.length === 0) {
  //     setIsSearch(false);
  //     setSearchData([]);
  //   }
  // };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="inline-block"
        position="relative"
        // backgroundColor={colors.primary[400]}
        // flexDirection="row"
        // borderRadius="3px"
      >
        {/* <input
          type="text"
          onChange={handleChangeSearch}
          placeholder="Search"
          style={{
            marginLeft: "2px",
            width: "280px",
            border: "3px solid #eee",
            height: "45px",
            backgroundColor: "#6c757",
            borderRadius: "5px",
          }}
        />
        {searchData && (
          <Box
            display={isSearch ? "block" : "none"}
            position="absolute"
            minWidth="160px"
            padding="8px 5px"
            zIndex="1"
            backgroundColor={colors.primary[400]}
            color="black"
          >
            {searchData.map((item) => {
              return (
                <div
                  key={item._id}
                  style={{
                    width: "270px",
                    textAlign: "left",
                    height: "35px",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={handleSelectedSearch(item._id)}
                >
                  {item.name}
                </div>
              );
            })}
          </Box>
        )} */}
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
