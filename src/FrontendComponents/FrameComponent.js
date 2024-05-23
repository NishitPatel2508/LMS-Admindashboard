import styles from "./FrameComponent.module.css";

const FrameComponent = () => {
  return (
    <section className={styles.containerWrapper}>
      <div className={styles.container}>
        <h3 className={styles.heading}>Our recent blogs</h3>
        <div className={styles.content}>
          <div className={styles.column}>
            <div className={styles.blogPostCard}>
              <img
                className={styles.imageIcon}
                loading="lazy"
                alt=""
                src="/image3@2x.png"
              />
              <div className={styles.content1}>
                <div className={styles.headingAndText}>
                  <div className={styles.author}>November 16, 2014</div>
                  <div className={styles.headingAndText1}>
                    <div className={styles.heading1}>
                      Three Pillars of User Delight
                    </div>
                    <div className={styles.supportingText}>
                      Delight can be experienced viscerally, behaviourally, and
                      reflectively. A great design is ...
                    </div>
                  </div>
                </div>
                <div className={styles.categories}>
                  <div className={styles.badge}>
                    <div className={styles.badgeBase}>
                      <div className={styles.text}>Research</div>
                    </div>
                  </div>
                  <div className={styles.badge1}>
                    <div className={styles.badgeBase1}>
                      <div className={styles.text1}>UI UX</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.blogPostCard1}>
              <img className={styles.imageIcon1} alt="" src="/image-1@2x.png" />
              <div className={styles.content2}>
                <div className={styles.headingAndText2}>
                  <div className={styles.author1}>September 24, 2017</div>
                  <div className={styles.headingAndText3}>
                    <div className={styles.heading2}>UX Mapping Methods</div>
                    <div className={styles.supportingText1}>
                      Visual-design principles can be applied consistently
                      throughout the process of creating a polished UX map...
                    </div>
                  </div>
                </div>
                <div className={styles.categories1}>
                  <div className={styles.badge2}>
                    <div className={styles.badgeBase2}>
                      <div className={styles.topic}>Research</div>
                    </div>
                  </div>
                  <div className={styles.badge3}>
                    <div className={styles.badgeBase3}>
                      <div className={styles.topic1}>UI Design</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.blogPostCard2}>
            <img className={styles.imageIcon2} alt="" src="/image-2@2x.png" />
            <div className={styles.content3}>
              <div className={styles.headingAndText4}>
                <div className={styles.author2}>March 13, 2014</div>
                <div className={styles.headingAndIcon}>
                  <h3 className={styles.heading3}>
                    Agile Development Projects and Usability
                  </h3>
                </div>
                <div
                  className={styles.supportingText2}
                >{`Agile methods aim to overcome usability barriers in traditional development, but post new threats to user experience quality. `}</div>
              </div>
              <div className={styles.categories2}>
                <div className={styles.badge4}>
                  <div className={styles.badgeBase4}>
                    <div className={styles.author3}>Programming</div>
                  </div>
                </div>
                <div className={styles.badge5}>
                  <div className={styles.badgeBase5}>
                    <div className={styles.text2}>Research</div>
                  </div>
                </div>
                <div className={styles.badge6}>
                  <div className={styles.badgeBase6}>
                    <div className={styles.topic2}>Developments</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameComponent;
