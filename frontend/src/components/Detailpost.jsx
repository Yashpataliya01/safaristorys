import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styles from "./Detailpost.module.css";
import img from "../../public/WhatsApp.svg.webp";
import img1 from "../../public/github.svg";
import img2 from "../../public/Instagram.svg.webp";
import img3 from "../../public/gmail.svg";

function Detailpost() {
  const location = useLocation();
  const { state } = location;

  if (!state) {
    return <div>No post data available.</div>;
  }

  const { title, category, user, image, discription } = state;
  return (
    <>
      <div className={styles.divv}>
        <div className={styles.overlay}></div>
        <video autoPlay loop muted className={styles.video}>
          <source
            src="https://videos.pexels.com/video-files/6981404/6981404-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className={styles.maindiv}>
          <img src={image} alt="" className={styles.image} />
          <div className={styles.details}>
            <div className={styles.links}>
              <h3 className={styles.category}>{category}</h3>
              <div className={styles.icons}>
                <a
                  href={`https://api.whatsapp.com/send?phone=whatsappphonenumber&text=${encodeURIComponent(
                    title
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={img} alt="WhatsApp" className={styles.icon} />
                </a>
                <a
                  href="https://github.com/new"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={img1} alt="GitHub" className={styles.icon1} />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={img2} alt="Instagram" className={styles.icon2} />
                </a>
                <a
                  href="https://mail.google.com/mail/u/0/#inbox?compose=new"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={img3} alt="Gmail" className={styles.icon1} />
                </a>
              </div>
            </div>
            <h1 className={styles.title}>{title}</h1>
            <h5 className={styles.user}>By - {user}</h5>
            <article className={styles.discription}>{discription}</article>
            <Link to="/blogs">
              <button className={styles.return}>←</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detailpost;
