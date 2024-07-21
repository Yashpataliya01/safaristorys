import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import User from "../models/user.model.js"
import express from "express";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cookieParser());

export const signup = async (req, res, next) => {
  const {username, email, password} = req.body;
  console.log(username, email, password);
  try {
    const userData = await User.findOne({email})
    if (userData) {
      res.status(400).json({ error: "User already exists" });;
    }
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({ error: "Something went wrong" });
      } 
      const newUser = User.create({
        username,
        email,
        password : hash
      })
      res.status(201).json({ message: "Signup successful" });
    })
  } catch (error) {
    res.status(500).json({err: error.message});
  }
};

export const signin = async (req, res, next) => {
  const {email, password} = req.body;
  console.log(email, password);
  try {
    const newuser = await User.findOne({ email });
    if (!newuser) {
      return res.status(500).json({message:"Create User First"});
    }
    bcrypt.compare(password, newuser.password, function(err,result){
      if (err) {
        return res.status(400).json({message:"Check Password Again"})
      }
      if(result) {
        let token = jwt.sign({email: email},process.env.secret_toke);
        res.cookie("token", token);
        return res.status(200).json({ message: "Login successful" });
      } else {
        return res.status(401).json({ error: "Invalid credentials" });
      }
    })
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

export const signout = async (req, res, next) => {
  res.cookie('token', '');
  return res.status(200).json({ message: "Logout successful" });
}

export const getuser = async (req, res, next) => {
  try {
    const userdetails = await User.findOne({ email: req.user.email });
    res.status(200).json({ data: userdetails });
  } catch (error) {
    console.log(error);
  }
}