import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Profile.module.css";
import toast, { Toaster } from "react-hot-toast";

function Profile() {
  const [userData, setUserData] = useState({});
  const [allpost, setAllpost] = useState([]);
  const [message, setMessage] = useState("");

  const getuserspost = async () => {
    try {
      const response = await fetch("/api/post/getusersPost", {
        method: "GET",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get Blogs");
      }
      const result = await response.json();
      if (result.data && result.data.length > 0) {
        setAllpost(result.data);
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
  useEffect(() => {
    const getuserdetails = async () => {
      const response = await fetch("/api/auth/getuser", {
        method: "GET",
      });
      const result = await response.json();
      setUserData(result.data);
    };
    getuserdetails();
    getuserspost();
  }, []);

  const deletepost = async (e) => {
    e.preventDefault();
    const postId = e.target.id;
    try {
      const response = await fetch("/api/post/deletepost", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: postId }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get Blogs");
      }
      const result = await response.json();
      toast.success(result.message);
      getuserspost();
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };
  return (
    <>
      <Toaster />
      <div className={styles.profile}>
        <div className={styles.friesr}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
            className={styles.imges}
          />
          <div className={styles.userdetails}>
            <h1 className={styles.heading1}>{userData.username}</h1>
            <p className={styles.pagra}>{userData.email}</p>
          </div>
        </div>
      </div>
      <div className={styles.blogss}>
        {message ? (
          <div className={styles.messageContainer}>
            <p className={styles.message}>{message}</p>
            <NavLink to="/create">
              <button className={styles.createButton}>Create</button>
            </NavLink>
          </div>
        ) : (
          allpost.map((post, index) => (
            <form
              action=""
              className={styles.formmm}
              onSubmit={deletepost}
              key={post._id}
              id={post._id}
            >
              <div className={styles.bloging}>
                <div className={styles.leftt}>
                  <img src={post.image} alt={post.title} />
                </div>
                <div className={styles.rightt}>
                  <h1>{post.title}</h1>
                  <h4>@{post.user.username}</h4>
                  <p>{post.discription.slice(0, 100)}...</p>
                  <div className={styles.bottom}>
                    <button className={styles.button}>Delete</button>
                  </div>
                </div>
              </div>
            </form>
          ))
        )}
      </div>
    </>
  );
}

export default Profile;
