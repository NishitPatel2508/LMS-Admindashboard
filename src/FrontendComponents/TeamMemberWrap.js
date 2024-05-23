import { useMemo, useEffect } from "react";
import styles from "./TeamMemberWrap.module.css";

const TeamMemberWrap = ({
  avatar,
  name1,
  role,
  supportingText,
  teamMemberOpacity,
}) => {
  const teamMemberStyle = useMemo(() => {
    return {
      opacity: teamMemberOpacity,
    };
  }, [teamMemberOpacity]);

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
    <div className={styles.teamMemberWrap}>
      <div
        className={styles.teamMember}
        data-animate-on-scroll
        style={teamMemberStyle}
      >
        <img className={styles.avatarIcon} alt="" src={avatar} />
        <div className={styles.textAndSocialLinks}>
          <div className={styles.nameAndSupportingText}>
            <div className={styles.nameAndRole}>
              <div className={styles.name}>{name1}</div>
              <div className={styles.role}>{role}</div>
            </div>
            <div className={styles.supportingText}>{supportingText}</div>
          </div>
          <div className={styles.socialIcons}>
            <img
              className={styles.socialIcon}
              loading="lazy"
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
  );
};
export default TeamMemberWrap;