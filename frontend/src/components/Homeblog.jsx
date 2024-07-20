import React, { useState, useEffect } from "react";
import styles from "./Homeblog.module.css";
import { Link } from "react-router-dom";

function Homeblog() {
  const [allpost, setAllpost] = useState([]);
  const [message, setMessage] = useState("");
  const [cataguryname, setCataguryname] = useState("Conservation");

  useEffect(() => {
    const callposts = async () => {
      try {
        const response = await fetch("/api/post/getpost", {
          method: "GET",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to get Blogs");
        }

        const result = await response.json();
        if (result.data && result.data.length > 0) {
          let newpost = result.data;
          let catagurywisepost = newpost.filter(
            (news) => news.category === cataguryname
          );
          if (catagurywisepost.length > 6) {
            setAllpost(catagurywisepost.slice(0, 6));
          } else {
            setAllpost(catagurywisepost);
          }
          console.log(catagurywisepost);
        } else if (result.message) {
          setMessage(result.message);
        } else {
          setMessage("No posts available");
        }
      } catch (error) {
        console.error("Error during fetching posts:", error);
        setMessage(`Error: ${error.message}`);
      }
    };

    callposts();
  }, [cataguryname]);

  const showblog = (e) => {
    setCataguryname(e.currentTarget.innerText);
  };

  return (
    <div className={styles.contant}>
      <div className={styles.blog}>
        <div className={styles.blogcontant}>
          <h1 className={styles.hh1}>TOP BLOGS</h1>
          <div className={styles.category1}>
            <ul className={styles.ullist}>
              <li className={styles.list}>
                <button id="1" onClick={showblog}>
                  Wildlife Sanctuary
                </button>
              </li>
              <li className={styles.list}>
                <button id="2" onClick={showblog}>
                  Animal Profiles
                </button>
              </li>
              <li className={styles.list}>
                <button id="3" onClick={showblog}>
                  Conservation
                </button>
              </li>
              <li className={styles.list}>
                <button id="4" onClick={showblog}>
                  Habitats
                </button>
              </li>
              <li className={styles.list}>
                <button id="5" onClick={showblog}>
                  Behavior and Ecology
                </button>
              </li>
              <li className={styles.list}>
                <button id="6" onClick={showblog}>
                  Travel and Adventure
                </button>
              </li>
            </ul>
          </div>
          <div className={styles.blog1}>
            <div className={styles.card1}>
              {allpost.length > 0 ? (
                allpost.map((post) => (
                  <Link
                    to={`/post/${post.title}`}
                    state={{
                      title: post.title,
                      category: post.category,
                      user: post.user.username,
                      image: post.image,
                      discription: post.discription,
                    }}
                  >
                    <div className={styles.blogcard} key={post.title}>
                      <h2>
                        {post.title.length > 50
                          ? post.title.slice(0, 50)
                          : post.title}
                      </h2>
                      <p>
                        {post.discription.length > 300
                          ? post.discription.slice(0, 300)
                          : post.discription}
                        ...
                      </p>
                      <h5>@{post.user.username}</h5>
                    </div>
                  </Link>
                ))
              ) : (
                <h1 className={styles.error}>Not Post To Show</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homeblog;
