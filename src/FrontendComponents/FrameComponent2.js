import { useEffect } from "react";
import { Button } from "@mui/material";
import BlogPostCard from "./BlogPostCard";
import TeamMemberWrap from "./TeamMemberWrap";
import styles from './FrameComponent2.module.css';
// import "./FrameComponent2.css";

const FrameComponent2 = () => {
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
    <section className={styles.popularContentWrapper}>
      <div className={styles.popularContent} data-animate-on-scroll>
        <div className={styles.subheading}>Explore Programs</div>
        <div className={styles.headingParent}>
          <h1 className={styles.heading}>Our Most Popular Class</h1>
          <div className={styles.popularCards}>
            <div className={styles.cardGrid}>
              <div className={styles.supportingText}>
                Let's join our famous class, the knowledge provided will
                definitely be useful for you.
              </div>
              <div className={styles.popularCourseCards}>
                <BlogPostCard
                  hr12Mins="08 hr 12 mins"
                  heading="Figma UI UX Design.."
                  supportingText="Use Figma to get a job in UI Design, User Interface, User Experience design."
                  prop="4.3"
                  prop1="(16,325)"
                  avatar="/avatar@2x.png"
                  text="Jane Cooper"
                  prop2="$17.84"
                />
                <div className={styles.blogPostCard}>
                  <div className={styles.image}>
                    <div className={styles.parent}>
                      <img
                        className={styles.icon}
                        alt=""
                        src="/media-placeholder.svg"
                      />
                      <div className={styles.hr3Mins}>06 hr 3 mins</div>
                    </div>
                  </div>
                  <div className={styles.content}>
                    <div className={styles.headingAndSubheadingParent}>
                      <div className={styles.headingAndSubheading}>
                        <div className={styles.subheading1}>Design</div>
                        <div className={styles.headingAndText}>
                          <div className={styles.headingAndIcon}>
                            <div className={styles.heading1}>
                              Learn With Shoaib
                            </div>
                            <div className={styles.iconWrap}>
                              <img
                                className={styles.arrowUpRightIcon}
                                alt=""
                                src="/arrowupright.svg"
                              />
                            </div>
                          </div>
                          <div className={styles.supportingText1}>
                            Design Web Sites and Mobile Apps that Your Users
                            Love and Return to Again.
                          </div>
                        </div>
                      </div>
                      <div className={styles.frameParent}>
                        <div className={styles.group}>
                          <div className={styles.div}>3.9</div>
                          <div className={styles.rating}>
                            <img
                              className={styles.ratingChild}
                              alt=""
                              src="/star-1.svg"
                            />
                            <img
                              className={styles.ratingItem}
                              alt=""
                              src="/star-1.svg"
                            />
                            <img
                              className={styles.ratingInner}
                              alt=""
                              src="/star-1.svg"
                            />
                            <img
                              className={styles.starIcon}
                              alt=""
                              src="/star-1.svg"
                            />
                            <img
                              className={styles.ratingChild1}
                              alt=""
                              src="/star-1.svg"
                            />
                          </div>
                        </div>
                        <div className={styles.div1}>(832)</div>
                      </div>
                    </div>
                    <div className={styles.frameGroup}>
                      <div className={styles.avatarParent}>
                        <img
                          className={styles.avatarIcon}
                          alt=""
                          src="/avatar-1@2x.png"
                        />
                        <div className={styles.textParent}>
                          <div className={styles.text}>Jenny Wilson</div>
                          <div className={styles.supportingText2}>
                            2001 Enrolled
                          </div>
                        </div>
                      </div>
                      <div className={styles.wrapper}>
                        <b className={styles.b}>$8.99</b>
                      </div>
                    </div>
                  </div>
                </div>
                <BlogPostCard
                  hr12Mins="01 hr 2 mins"
                  heading="Building User Interface.."
                  supportingText="Learn how to apply User Experience (UX) principles to your website designs."
                  prop="4.2"
                  prop1="(125)"
                  avatar="/avatar-2@2x.png"
                  text="Esther Howard"
                  prop2="$11.70"
                  propPadding="var(--padding-2xs) var(--padding-3xs) var(--padding-181xl)"
                  propBackgroundImage="url('/image2@3x.png')"
                  propMinWidth="81px"
                  propMinWidth1="34px"
                  propMinWidth2="100px"
                />
              </div>
              <div className={styles.cardGridInner}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/group-521-1.svg"
                />
              </div>
              <div className={styles.buttonWrapper}>
                <Button
                  className={styles.button}
                  disableElevation={true}
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    color: "#101828",
                    fontSize: "14",
                    background: "#f9fafb",
                    borderRadius: "8px",
                    "&:hover": { background: "#f9fafb" },
                    width: 173,
                  }}
                >
                  Explore All Programs
                </Button>
              </div>
            </div>
            <div className={styles.headingAndSupportingTextParent}>
              <div className={styles.headingAndSupportingText}>
                <div className={styles.headingAndSubheading1}>
                  <div className={styles.subheading2}>Tutors</div>
                  <h1 className={styles.heading2}>Meet the Heroes</h1>
                </div>
                <div className={styles.ourPhilosophyIs}>
                  On Ed-Circle, instructors from all over the world instruct
                  millions of students. We offer the knowledge and abilities.
                </div>
              </div>
              <div className={styles.content1}>
                <TeamMemberWrap
                  avatar="/avatar-3@2x.png"
                  name1="Theresa Webb"
                  role="Application Support Analyst Lead"
                  supportingText="Former co-founder of Opendoor. Early staff at Spotify and Clearbit."
                />
                <TeamMemberWrap
                  avatar="/avatar-4@2x.png"
                  name1="Courtney Henry"
                  role="Director, Undergraduate Analytics and Planning"
                  supportingText="Lead engineering teams at Figma, Pitch, and Protocol Labs."
                  teamMemberOpacity="unset"
                />
                <div className={styles.teamMemberWrapWrapper}>
                  <div className={styles.teamMemberWrap} data-animate-on-scroll>
                    <img
                      className={styles.avatarIcon1}
                      alt=""
                      src="/avatar-5@2x.png"
                    />
                    <div className={styles.textAndSocialLinks}>
                      <div className={styles.nameAndSupportingText}>
                        <div className={styles.nameAndRole}>
                          <div className={styles.name}>Albert Flores</div>
                          <div className={styles.role}>Career Educator</div>
                        </div>
                        <div className={styles.supportingText3}>
                          <p className={styles.formerPmFor}>
                            Former PM for Linear, Lambda School, and On Deck.
                          </p>
                        </div>
                      </div>
                      <div className={styles.socialIcons}>
                        <img
                          className={styles.socialIcon}
                          alt=""
                          src="/social-icon.svg"
                        />
                        <img
                          className={styles.socialIcon1}
                          alt=""
                          src="/social-icon-1.svg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <TeamMemberWrap
                  avatar="/avatar-6@2x.png"
                  name1="Marvin McKinney"
                  role={`Co-op & Internships Program & Operations Manager`}
                  supportingText="Former frontend dev for Linear, Coinbase, and Postscript."
                  teamMemberOpacity="unset"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameComponent2;

