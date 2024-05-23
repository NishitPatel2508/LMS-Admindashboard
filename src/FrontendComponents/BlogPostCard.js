import { useMemo } from "react";
import styles from "./BlogPostCard.module.css";

const BlogPostCard = ({
  hr12Mins,
  heading,
  supportingText,
  prop,
  prop1,
  avatar,
  text,
  prop2,
  propPadding,
  propBackgroundImage,
  propMinWidth,
  propMinWidth1,
  propMinWidth2,
}) => {
  const imageStyle = useMemo(() => {
    return {
      padding: propPadding,
      backgroundImage: propBackgroundImage,
    };
  }, [propPadding, propBackgroundImage]);

  const hr12MinsStyle = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  const divStyle = useMemo(() => {
    return {
      minWidth: propMinWidth1,
    };
  }, [propMinWidth1]);

  const textStyle = useMemo(() => {
    return {
      minWidth: propMinWidth2,
    };
  }, [propMinWidth2]);

  return (
    <div className={styles.blogPostCard}>
      <div className={styles.image} style={imageStyle}>
        <button className={styles.courseMedia}>
          <img
            className={styles.mediaPlaceholderIcon}
            alt=""
            src="/media-placeholder.svg"
          />
          <div className={styles.hr12Mins} style={hr12MinsStyle}>
            {hr12Mins}
          </div>
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.courseDetails}>
          <div className={styles.headingAndSubheading}>
            <div className={styles.subheading}>Design</div>
            <div className={styles.headingAndText}>
              <div className={styles.headingAndIcon}>
                <h3 className={styles.heading}>{heading}</h3>
                <div className={styles.iconWrap}>
                  <img
                    className={styles.arrowUpRightIcon}
                    loading="lazy"
                    alt=""
                    src="/arrowupright.svg"
                  />
                </div>
              </div>
              <div className={styles.supportingText}>{supportingText}</div>
            </div>
          </div>
          <div className={styles.frameParent}>
            <div className={styles.parent}>
              <div className={styles.div}>{prop}</div>
              <div className={styles.rating}>
                <img
                  className={styles.ratingChild}
                  loading="lazy"
                  alt=""
                  src="/star-1.svg"
                />
                <img
                  className={styles.ratingItem}
                  loading="lazy"
                  alt=""
                  src="/star-1.svg"
                />
                <img className={styles.ratingInner} alt="" src="/star-1.svg" />
                <img className={styles.starIcon} alt="" src="/star-1.svg" />
                <img className={styles.ratingChild1} alt="" src="/star-1.svg" />
              </div>
            </div>
            <div className={styles.div1} style={divStyle}>
              {prop1}
            </div>
          </div>
        </div>
        <div className={styles.frameGroup}>
          <div className={styles.avatarParent}>
            <img
              className={styles.avatarIcon}
              loading="lazy"
              alt=""
              src={avatar}
            />
            <div className={styles.textParent}>
              <div className={styles.text} style={textStyle}>
                {text}
              </div>
              <div className={styles.supportingText1}>2001 Enrolled</div>
            </div>
          </div>
          <div className={styles.wrapper}>
            <b className={styles.b}>{prop2}</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
