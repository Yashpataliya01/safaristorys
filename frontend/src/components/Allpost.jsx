import React, { useEffect, useState } from "react";
import styles from "./Allpost.module.css";
import { Link } from "react-router-dom";

function Allpost() {
  const [allpost, setAllpost] = useState([]);
  const [message, setMessage] = useState("");

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
          setAllpost(result.data);
          console.log(result.data);
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
  }, []);

  return (
    <div className={styles.blogs}>
      {message ? (
        <p className={styles.message}>{message}</p>
      ) : (
        allpost.map((post, index) => (
          <div key={index} className={styles.blog}>
            <div className={styles.left}>
              <img src={post.image} alt={post.title} />
            </div>
            <div className={styles.right}>
              <h1>{post.title}</h1>
              <h4>@{post.user.username}</h4>
              <p>{post.discription.slice(0, 100)}...</p>
              <div className={styles.bottom}>
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
                  <button className={styles.button}>Read More</button>
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Allpost;
