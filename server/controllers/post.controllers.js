import cookieParser from "cookie-parser";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import express from "express";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cookieParser());

export const createPost = async (req, res, next) => {
  const {title, discription, category, image} = req.body;
  let user = await User.findOne({email: req.user.email})
  
  let newBlog = await Post.create({
    title,
    discription,
    category,
    user: user._id,
    image
  })
  const savedPost = await newBlog.save();
  user.post.push(savedPost._id);
  await user.save();
  return res.status(200).json({ message: "Post Created" });
};

export const getPost = async (req, res, next) => {
  try {
    const data = await Post.find({}).populate('user', 'username');
    if (data.length === 0) {
      return res.status(200).json({ message: 'No posts available' });
    }
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
