import CategoryCards from "./CategoryCards";
import styles from "./MainContentArea.module.css";

const MainContentArea = () => {
  return (
    <section className={styles.mainContentArea}>
      <div className={styles.learningHeader}>
        <div className={styles.headingAndSupportingText}>
          <div className={styles.headingAndSubheading}>
            <div className={styles.subheading}>Our Services</div>
            <h1
              className={styles.heading}
            >{`Fostering a playful & engaging learning environment`}</h1>
          </div>
        </div>
        <div className={styles.learningFeatures}>
          <div className={styles.learningCategories}>
            <CategoryCards
              icon="/icon-2@2x.png"
              userExperience="User Experience"
              lessonsOnDesignThatCoverT="Lessons on design that cover the most recent developments."
              vector="/vector.svg"
            />
            <div className={styles.categoryCards}>
              <div className={styles.frameParent}>
                <div className={styles.frameGroup}>
                  <div className={styles.iconWrapper}>
                    <img className={styles.icon} alt="" src="/icon-3.svg" />
                  </div>
                  <b className={styles.webDevelopment}>Web Development</b>
                </div>
                <div className={styles.classesInDevelopment}>
                  Classes in development that cover the most recent advancements
                  in web.
                </div>
              </div>
              <div className={styles.learnMoreParent}>
                <div className={styles.learnMore}>Learn More</div>
                <img className={styles.vectorIcon} alt="" src="/vector-1.svg" />
              </div>
            </div>
            <CategoryCards
              icon="/icon-4@2x.png"
              userExperience="Marketing"
              lessonsOnDesignThatCoverT="Marketing courses that cover the most recent marketing trends"
              vector="/vector-1.svg"
              propBackgroundColor="#fff"
              propPadding="var(--padding-11xl) var(--padding-20xl)"
              propBorder="1px solid var(--color-gainsboro-200)"
              propBackgroundColor1="#fce7f6"
              propColor="#101828"
              propMinWidth="124px"
              propColor1="#646464"
              propColor2="#7e56d9"
            />
          </div>
          <img
            className={styles.learningFeaturesChild}
            loading="lazy"
            alt=""
            src="/group-521.svg"
          />
        </div>
      </div>
    </section>
  );
};

export default MainContentArea;
