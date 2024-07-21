import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import LOGO from "../../public/SafariStories.png";

function Navbar() {
  const tl = useRef(gsap.timeline());

  useGSAP(() => {
    tl.current.to(".full", {
      right: 0,
      duration: 0.8,
    });
    tl.current.from(".full h3", {
      x: 150,
      duration: 0.7,
      stagger: 0.3,
      opacity: 0,
      ease: "ease-in",
    });
    tl.current.from(".full i", {
      opacity: 0,
    });
    tl.current.pause();
  });

  const openMenu = () => {
    tl.current.play();
  };

  const closeMenu = () => {
    tl.current.reverse();
  };

  return (
    <>
      <nav>
        <Link to="/">
          <img src={LOGO} alt="" className={styles.logo} />
        </Link>
        <i className="ri-menu-3-fill" onClick={openMenu}></i>
      </nav>
      <div className={`${styles.full} full`}>
        <Link to="/blogs" onClick={closeMenu}>
          <h3>Blogs</h3>
        </Link>
        <Link to="/about" onClick={closeMenu}>
          <h3>About</h3>
        </Link>
        <Link to="/profile" onClick={closeMenu}>
          <h3>Profile</h3>
        </Link>
        <Link to="/signin" onClick={closeMenu}>
          <h3>News</h3>
        </Link>
        <Link to="/contact" onClick={closeMenu}>
          <h3>Contact Us</h3>
        </Link>
        <i className="ri-close-circle-fill" onClick={closeMenu}></i>
      </div>
    </>
  );
}

export default Navbar;
