import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LocomotiveScroll from "locomotive-scroll";
import Blogs from "./components/Blogs";
import Createpost from "./components/Createpost";
import Detailpost from "./components/Detailpost";
import About from "./components/About";
import Contact from "./components/Contact";

function App() {
  const locomotiveScroll = new LocomotiveScroll();
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/create" element={<Createpost />} />
        <Route path="/post/:title" element={<Detailpost />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
