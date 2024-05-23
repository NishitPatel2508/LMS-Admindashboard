import { useMemo } from "react";
import styles from "./GroupComponent1.module.css";

const GroupComponent1 = ({ firstName, propWidth }) => {
  const frameButtonStyle = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  return (
    <div className={styles.rectangleParent}>
      <div className={styles.frameChild} />
      <button className={styles.firstNameWrapper} style={frameButtonStyle}>
        <div className={styles.firstName}>{firstName}</div>
      </button>
    </div>
  );
};

export default GroupComponent1;
