import { Box } from "@mui/material";
import React from "react";

const Search = ({ handleChangeSearch, searchErrMsg }) => {
  return (
    <Box
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
          height: "40px",
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
          backgroundColor="#ececec"
          color="black"
        >
          {searchErrMsg && (
            <div
              // key={item._id}
              style={{
                width: "270px",
                textAlign: "left",
                height: "30px",
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
    </Box>
  );
};

export default Search;
