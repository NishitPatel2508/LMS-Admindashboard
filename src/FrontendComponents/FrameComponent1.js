import { useEffect } from "react";
import styles from "./FrameComponent1.module.css";

const FrameComponent1 = () => {
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
    <section className={styles.designFileInner}>
      <div className={styles.quoteSectionParent}>
        <div className={styles.quoteSection}>
          <div className={styles.container}>
            <div className={styles.content}>
              <div
                className={styles.quoteAndAttribution}
                data-animate-on-scroll
              >
                <div className={styles.sampleLogo}>
                  <img
                    className={styles.sampleLogoChild}
                    alt=""
                    src="/group-296.svg"
                  />
                  <div className={styles.edCircle}>Ed-Circle.</div>
                </div>
                <h1 className={styles.quote}>
                  Courses was fantastic! It is Master platform for those looking
                  to start a new career, or need a refresher.
                </h1>
                <div className={styles.avatarAndText}>
                  <img
                    className={styles.avatarIcon}
                    alt=""
                    src="/avatar-7@2x.png"
                  />
                  <div className={styles.textAndSupportingText}>
                    <div className={styles.text}>Jacob Jones</div>
                    <div className={styles.supportingText}>
                      Student, National University
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img className={styles.frameChild} alt="" src="/group-521-2.svg" />
      </div>
    </section>
  );
};

export default FrameComponent1;

