import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
  const router = useNavigate();

  const handlesignin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to Login");
      }

      const result = await response.json();
      console.log(result);
      localStorage.setItem("isLogin", true);
      router("/");
    } catch (error) {
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <div className="video-background">
      <video autoPlay loop muted className="video">
        <source
          src="https://videos.pexels.com/video-files/5358746/5358746-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="form-container">
        <form onSubmit={handlesignin}>
          <h2 className="form-title">Sign In</h2>
          <div className="form-group">
            <label className="form-label">Email:</label>
            <input type="email" className="form-input" name="email" required />
          </div>
          <div className="form-group">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-input"
              name="password"
              required
            />
          </div>
          <h5 style={{ fontWeight: "100" }}>New to our site</h5>
          <Link to="/signup">
            <span style={{ color: "blue" }}>Sign Up</span>
          </Link>
          <button type="submit" className="form-button">
            Sign In
          </button>
        </form>
      </div>
      <style jsx>{`
        .video-background {
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: -1;
        }

        .video {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: translate(-50%, -50%);
        }

        .form-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          max-width: 350px;
          padding: 30px;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 15px;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          z-index: 1;
        }

        .form-title {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          margin-bottom: 5px;
          color: #555;
        }

        .form-input {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #ccc;
          box-sizing: border-box;
          font-size: 16px;
        }

        .form-button {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: none;
          background-color: #007bff;
          color: white;
          font-size: 18px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .form-button:hover {
          background-color: #0056b3;
        }

        @media (max-width: 480px) {
          .form-container {
            width: 80%;
            padding: 20px;
          }

          .form-title {
            font-size: 24px;
          }

          .form-input {
            padding: 10px;
            font-size: 14px;
          }

          .form-button {
            padding: 10px;
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
}

export default Signin;
