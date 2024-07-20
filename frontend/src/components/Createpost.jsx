import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import styles from "./Createpost.module.css";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Createpost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    discription: "",
    category: "",
    image: null,
  });
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setFormData((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  useEffect(() => {
    if (file) {
      const debounceUpload = setTimeout(() => uploadImage(file), 500);
      return () => clearTimeout(debounceUpload);
    }
  }, [file]);

  const uploadImage = async (file) => {
    setIsUploading(true);
    const storage = getStorage(app);
    const fileName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    const uploadPromise = new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setFormData((prev) => ({ ...prev, image: downloadURL }));
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });

    toast.promise(uploadPromise, {
      loading: "Uploading...",
      success: <b>Image uploaded successfully!</b>,
      error: <b>Could not upload the image.</b>,
    });

    uploadPromise.finally(() => setIsUploading(false));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/post/createpost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create post");
      }
      const result = await response.json();
      toast.success(result.message);
      navigate("/blogs");
    } catch (error) {
      console.error("Error during post creation:", error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to check if the form is valid
  const isFormValid = () => {
    const { title, discription, category, image } = formData;
    return (
      title.trim().length > 0 &&
      discription.trim().length >= 100 &&
      category.trim().length > 0 &&
      image !== null
    );
  };

  return (
    <div className={styles.maindiv}>
      <div className={styles.overlay}></div>
      <video autoPlay loop muted className={styles.video}>
        <source
          src="https://videos.pexels.com/video-files/7499056/7499056-hd_1920_1080_30fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className={styles.container}>
        <Toaster />
        <h1>Create Post</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="Post Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Wildlife Sanctuary">Wildlife Sanctuary</option>
              <option value="Animal Profiles">Animal Profiles</option>
              <option value="Conservation">Conservation</option>
              <option value="Habitats">Habitats</option>
              <option value="Behavior and Ecology">Behavior and Ecology</option>
              <option value="Travel and Adventure">Travel and Adventure</option>
            </select>
          </div>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <textarea
              name="discription"
              placeholder="Description (min. 100 characters)"
              value={formData.discription}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className={styles.formGroup}>
            {!formData.image ? (
              <label className={styles.uploadLabel} htmlFor="image">
                <FaCloudUploadAlt className={styles.uploadIcon} />
                <span>
                  Drag photo here
                  <br />
                  <span style={{ fontSize: "0.8em", color: "gray" }}>
                    SVG, PNG, JPG
                  </span>
                </span>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  required
                  className={styles.fileInput}
                />
              </label>
            ) : (
              <img
                src={formData.image}
                alt="Post"
                style={{ width: "100%", height: "40vh", objectFit: "cover" }}
              />
            )}
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isUploading || isSubmitting || !isFormValid()}
          >
            {isSubmitting ? "Creating Post..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Createpost;
