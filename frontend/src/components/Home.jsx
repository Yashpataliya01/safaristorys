import React, { useEffect } from "react";
import gsap from "gsap";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import Topnews from "./Topnews";
import Homeblog from "./Homeblog";

function Home() {
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

  return (
    <>
      <div className={styles.hero}>
        <div className={styles.overlay}></div>
        <video autoPlay loop muted className={styles.video}>
          <source
            src="https://videos.pexels.com/video-files/7492891/7492891-uhd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className={styles.content}>
          <h1 className={`${styles.saveText} headline`}>SAVE</h1>
          <h1 className={`${styles.headline} headline`}>WILD CATS</h1>
          <p className={`${styles.subheadline} subheadline`}>
            Welcome to our wildlife news and blog website, where enthusiasts
            share their knowledge and stories about wildlife. Join us in
            spreading awareness and protecting the incredible creatures that
            inhabit our planet.
          </p>
          {localStorage.getItem("isLogin") ? (
            <Link to="/blogs">
              <button className={`${styles.button} cta`}>Blog</button>
            </Link>
          ) : (
            <Link to="/signin">
              <button className={`${styles.button} cta`}>Connect</button>
            </Link>
          )}
        </div>
      </div>
      <div className={styles.topnews}>
        <Topnews />
      </div>
      <div>
        <Homeblog />
      </div>
    </>
  );
}

export default Home;
