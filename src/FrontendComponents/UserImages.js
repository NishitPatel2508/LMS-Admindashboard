import styles from "./UserImages.module.css";

const UserImages = () => {
  return (
    <div className={styles.userImages}>
      <img className={styles.userImagesChild} alt="" src="/group-515.svg" />
      <div className={styles.placeholder} />
      <div className={styles.userImage}>
        <div className={styles.placeholder1} />
        <div className={styles.userImageMask}>
          <div className={styles.userImageMaskChild} />
          <img
            className={styles.maskGroupIcon}
            alt=""
            src="/mask-group@2x.png"
          />
        </div>
      </div>
      <div className={styles.userImagesItem} />
    </div>
  );
};
export default UserImages;
