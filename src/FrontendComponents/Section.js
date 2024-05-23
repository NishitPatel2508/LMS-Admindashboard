import styles from "./Section.module.css";

const Section = () => {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.footerText}>
            © 2022 Ed-Circle. All rights reserved.
          </div>
          <div className={styles.socialIcons}>
            <img
              className={styles.socialIcon}
              alt=""
              src="/social-icon-8.svg"
            />
            <img
              className={styles.socialIcon1}
              alt=""
              src="/social-icon-9.svg"
            />
            <img
              className={styles.socialIcon2}
              alt=""
              src="/social-icon-10.svg"
            />
            <img
              className={styles.socialIcon3}
              alt=""
              src="/social-icon-11.svg"
            />
            <img
              className={styles.socialIcon4}
              alt=""
              src="/social-icon-12.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;

