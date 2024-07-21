import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
username: {
  type: String,
  required:true,
  unique: true,
},
email:{
  type: String,
  required:true,
  unique: true
},
password: {
  type: String,
  required:true
},
post: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "Post"
}],
},{ timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
