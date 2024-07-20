import React from "react";
import { Link } from "react-router-dom";
import styles from "./Contact.module.css";

function Contact() {
  return (
    <>
      <div className={styles.about}>
        <div className={styles.overlay}></div>
        <video autoPlay loop muted className={styles.video}>
          <source
            src="https://videos.pexels.com/video-files/5257806/5257806-hd_2048_948_29fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className={styles.aboutcontent}>
          <h1 className={`${styles.aboutext} headline`}>Let's have a Talk</h1>
          {localStorage.getItem("isLogin") ? (
            <Link to="/about">
              <button className={`${styles.button} cta`}>About</button>
            </Link>
          ) : (
            <Link to="/signin">
              <button className={`${styles.button} cta`}>Connect</button>
            </Link>
          )}
        </div>
      </div>
      <div className={styles.contactpage}>
        <div className={styles.left}>
          <div className={styles.innerdiv}>
            <h1 className={styles.meetus}>Meet Us</h1>
            <div className={styles.diiiiv}>
              <div>
                <i
                  className="ri-phone-fill"
                  style={{ marginRight: "10px", color: "green" }}
                ></i>
                +91 7000334381
              </div>
              <div>
                <i
                  className="ri-at-fill"
                  style={{ marginRight: "10px", color: "green" }}
                ></i>
                yashpataliya01@gmail.com
              </div>
              <div>
                <i
                  className="ri-map-pin-5-line"
                  style={{ marginRight: "10px", color: "green" }}
                ></i>
                Indore, India
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.innerdiv1}>
            <div className={styles.innerdiv2}>
              <h1 className={styles.meetus}>Pitch Us</h1>
              <h3 className={styles.hh3}>Hello</h3>
              <p className={styles.pp}>
                My name is{" "}
                <span style={{ color: "green", fontWeight: "900" }}>
                  Yash Pataliya
                </span>{" "}
                and my e-mail address is{" "}
                <span style={{ color: "green", fontWeight: "900" }}>
                  yashpataliya01@gmail.com
                </span>{" "}
                and i would like to discuss about this project
              </p>
              <button>SEND</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
