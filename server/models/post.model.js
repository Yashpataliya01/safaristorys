import mongoose from "mongoose";

const postschema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: String,
  discription: String,
  category: String,
  like: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }],
  image: String
})

const Post = mongoose.model("Post", postschema)

export default Post;