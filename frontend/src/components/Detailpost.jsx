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
                <Link
                  to="https://api.whatsapp.com/send?phone=whatsappphonenumber&text=urlencodedtext"
                  target="_blank"
                  query={{ test: title }}
                >
                  <img src={img} alt="" className={styles.icon} />
                </Link>
                <Link
                  to="https://github.com/new"
                  target="_blank"
                  query={{ test: title }}
                >
                  <img src={img1} alt="" className={styles.icon1} />
                </Link>
                <Link
                  to="https://www.instagram.com/"
                  target="_blank"
                  query={{ test: title }}
                >
                  <img src={img2} alt="" className={styles.icon2} />
                </Link>
                <Link
                  to="https://mail.google.com/mail/u/0/#inbox?compose=new"
                  target="_blank"
                  query={{ test: title }}
                >
                  <img src={img3} alt="" className={styles.icon1} />
                </Link>
              </div>
            </div>
            <h1 className={styles.title}>{title}</h1>
            <h5 className={styles.user}>By - {user}</h5>
            <article className={styles.discription}>{discription}</article>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detailpost;
