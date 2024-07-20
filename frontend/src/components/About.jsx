import React from "react";
import { Link } from "react-router-dom";
import styles from "./About.module.css";

function About() {
  return (
    <>
      <div className={styles.about}>
        <div className={styles.overlay}></div>
        <video autoPlay loop muted className={styles.video}>
          <source
            src="https://videos.pexels.com/video-files/4226627/4226627-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className={styles.aboutcontent}>
          <h1 className={`${styles.aboutext} headline`}>
            Welcome to <span className={styles.logoname}>Safari Stories</span>
          </h1>
          {localStorage.getItem("isLogin") ? (
            <Link to="/blogs">
              <button className={`${styles.button} cta`}>Blogs</button>
            </Link>
          ) : (
            <Link to="/signin">
              <button className={`${styles.button} cta`}>Connect</button>
            </Link>
          )}
        </div>
      </div>
      <div className={styles.detailabout}>
        <div className={styles.overlay}></div>
        <h1 style={{ marginTop: "50px" }}>Who We Are</h1>
        <p className={styles.description}>
          SafariStories is a platform for wildlife enthusiasts, photographers,
          and storytellers to share their experiences and insights about the
          animal kingdom. Our team is dedicated to creating a space where people
          can connect over their love for nature and wildlife.
        </p>
        <div className={styles.mission}>
          <h1 className={styles.headingmission}>Our Mission</h1>
          <p className={styles.disp}>
            We believe that storytelling has the power to inspire change. By
            sharing stories of wildlife and natural habitats, we aim to raise
            awareness about conservation efforts, endangered species, and the
            importance of preserving our planet's biodiversity.
          </p>
        </div>
        <h1>What We Offer</h1>
        <ul className={styles.list}>
          <li>
            Inspiring Stories: Read captivating tales from the wild, written by
            experts and enthusiasts alike.
          </li>
          <li>
            Stunning Photography: Explore our gallery of breathtaking wildlife
            photographs.
          </li>
          <li>
            Educational Content: Learn about different species, their habitats,
            and the challenges they face.
          </li>
          <li>
            Community Engagement: Join our community of wildlife lovers, share
            your own stories, and engage in meaningful discussions.
          </li>
        </ul>
        <div className={styles.joinus}>
          <h1 className={styles.headingmission}>Join Us</h1>
          <p className={styles.disp}>
            Whether you are a seasoned wildlife photographer, a passionate
            conservationist, or simply someone who loves animals, SafariStories
            welcomes you. Join us in our journey to celebrate the wonders of the
            natural world and make a difference through storytelling. Thank you
            for being a part of SafariStories. Together, we can inspire a deeper
            appreciation for the incredible wildlife that shares our planet.
          </p>
          <button>Join Us</button>
        </div>
      </div>
    </>
  );
}

export default About;
