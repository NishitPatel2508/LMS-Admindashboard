import React from "react";
import { Container } from "react-bootstrap";
import CircularProgress from "@mui/material/CircularProgress";
const Loading = ({ show }) => {
  return (
    show && (
      <Container
        className="d-flex justify-content-center align-items-center text-center"
        style={{
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 200,
          width: "100%",
          zIndex: 9999,
          //   backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <CircularProgress />
      </Container>
    )
  );
};
export default Loading;
