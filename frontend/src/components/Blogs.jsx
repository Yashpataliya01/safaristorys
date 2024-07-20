import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import styles from "./Blogs.module.css";
import Allpost from "./Allpost";

function Blogs() {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(
      ".headline",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.5, delay: 1 }
    );
    gsap.fromTo(
      ".subheadline",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, delay: 1.5 }
    );
    gsap.fromTo(
      ".cta",
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1.5, delay: 2 }
    );
  }, []);

  const createpost = () => {
    if (localStorage.getItem("isLogin")) {
      navigate("/create");
    } else {
      navigate("/signin");
    }
  };

  return (
    <>
      <div className={styles.hero}>
        <div className={styles.overlay}></div>
        <video autoPlay loop muted className={styles.video}>
          <source
            src="https://videos.pexels.com/video-files/10418864/10418864-hd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className={styles.content}>
          <h1 className={`${styles.saveText} headline`}>Our Blogs</h1>
          {localStorage.getItem("isLogin") ? (
            <Link to="/create" className={styles.link}>
              <button className={`${styles.button} cta`}>Create</button>
            </Link>
          ) : (
            <Link to="/signin">
              <button className={`${styles.button} cta`}>Connect</button>
            </Link>
          )}
        </div>
      </div>
      <Allpost />
      <button className={styles.postbtn} onClick={createpost}>
        +
      </button>
    </>
  );
}

export default Blogs;
