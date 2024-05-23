import { useMemo } from "react";
import { TextField, InputAdornment, Icon, IconButton } from "@mui/material";
import styles from "./GroupComponent2.module.css";

const GroupComponent2 = ({ email, propTop, propMinWidth }) => {
  const groupDivStyle = useMemo(() => {
    return {
      top: propTop,
    };
  }, [propTop]);

  const emailStyle = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  return (
    <div className={styles.rectangleParent} style={groupDivStyle}>
      <TextField
        className={styles.frameChild}
        variant="outlined"
        sx={{
          "& fieldset": { borderColor: "#676666" },
          "& .MuiInputBase-root": {
            height: "55px",
            backgroundColor: "#fff",
            borderRadius: "10px",
          },
          width: "655px",
        }}
      />
      <button className={styles.emailWrapper}>
        <div className={styles.email} style={emailStyle}>
          {email}
        </div>
      </button>
    </div>
  );
};

export default GroupComponent2;