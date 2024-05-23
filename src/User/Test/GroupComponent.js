
import { Button } from "@mui/material";
import GroupComponent2 from "./GroupComponent2";
import GroupComponent1 from "./GroupComponent1";
import styles from "./GroupComponent.module.css";

const GroupComponent = () => {
  return (
    <div className={styles.frameParent}>
      <GroupComponent2 email="Email" />
      <GroupComponent2 email="Password" propTop="198px" propMinWidth="69px" />
      <div className={styles.frameGroup}>
        <GroupComponent1 firstName="First Name" />
        <GroupComponent1 firstName="Last Name" propWidth="unset" />
      </div>
      <Button
        className={styles.frameChild}
        disableElevation={true}
        variant="contained"
        sx={{
          textTransform: "none",
          color: "#fff",
          fontSize: "18",
          background: "#212121",
          borderRadius: "10px",
          "&:hover": { background: "#212121" },
          width: 655,
          height: 55,
        }}
      >
        Create Account
      </Button>
      <div className={styles.alreadyHaveAnAccountParent}>
        <div className={styles.alreadyHaveAnContainer}>
          {/* <span className={styles.a}>A</span> */}
          <span className={styles.lreadyHaveAn}>Have an account?</span>
        </div>
        <div className={styles.login}>Login</div>
      </div>
    </div>
  );
};
export default GroupComponent;
