import { useMemo, useEffect } from "react";
import styles from "./CategoryCards.module.css";

const CategoryCards = ({
  icon,
  userExperience,
  lessonsOnDesignThatCoverT,
  vector,
  propBackgroundColor,
  propPadding,
  propBorder,
  propBackgroundColor1,
  propColor,
  propMinWidth,
  propColor1,
  propColor2,
}) => {
  const categoryCardsStyle = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor,
      padding: propPadding,
      border: propBorder,
    };
  }, [propBackgroundColor, propPadding, propBorder]);

  const categoryDescriptionsStyle = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor1,
    };
  }, [propBackgroundColor1]);

  const userExperienceStyle = useMemo(() => {
    return {
      color: propColor,
      minWidth: propMinWidth,
    };
  }, [propColor, propMinWidth]);

  const lessonsOnDesignStyle = useMemo(() => {
    return {
      color: propColor1,
    };
  }, [propColor1]);

  const learnMoreStyle = useMemo(() => {
    return {
      color: propColor2,
    };
  }, [propColor2]);

  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add(styles.animate);
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);
  return (
    <div
      className={styles.categoryCards}
      data-animate-on-scroll
      style={categoryCardsStyle}
    >
      <div className={styles.categoryIcons}>
        <div className={styles.categoryLabels}>
          <div
            className={styles.categoryDescriptions}
            style={categoryDescriptionsStyle}
          >
            <img className={styles.icon} alt="" src={icon} />
          </div>
          <h3 className={styles.userExperience} style={userExperienceStyle}>
            {userExperience}
          </h3>
        </div>
        <div className={styles.lessonsOnDesign} style={lessonsOnDesignStyle}>
          {lessonsOnDesignThatCoverT}
        </div>
      </div>
      <div className={styles.actionButtons}>
        <div className={styles.learnMore} style={learnMoreStyle}>
          Learn More
        </div>
        <img className={styles.vectorIcon} alt="" src={vector} />
      </div>
    </div>
  );
};

export default CategoryCards;