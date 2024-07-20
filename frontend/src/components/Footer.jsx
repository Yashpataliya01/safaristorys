import React from "react";
import Styles from "./Footer.module.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className={Styles.footer}>
      <div className={Styles.container}>
        <ul className={Styles.list}>
          <li className={Styles.listItem}>
            <Link className={Styles.link} to="/">
              Home
            </Link>
          </li>
          <li className={Styles.listItem}>
            <Link className={Styles.link} to="/about">
              About
            </Link>
          </li>
          <li className={Styles.listItem}>
            <a className={Styles.link} href="mailto:julesforrest@gmail.com">
              Contact
            </a>
          </li>
          <li className={Styles.listItem}>
            <a
              className={Styles.link}
              href="https://www.linkedin.com/in/yash-pataliya01"
              target="_blank" // Opens the link in a new tab
              rel="noopener noreferrer" // Security reasons, prevents the new page from accessing the window.opener property
            >
              LinkedIn
            </a>
          </li>
          <li className={Styles.listItem}>
            <a
              className={Styles.link}
              href="https://github.com/Yashpataliya01"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
          <li className={Styles.listItem}>
            <p>👋</p>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
