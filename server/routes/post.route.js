import express from "express"
import { createPost, getPost, getusersPost, deletepost } from "../controllers/post.controllers.js"
import { verifyToken } from "../utils/verifyuser.js";
const router = express.Router();

router.post('/createpost', verifyToken, createPost);
router.get('/getpost', getPost);
router.get('/getusersPost', verifyToken,  getusersPost);
router.delete('/deletepost',verifyToken, deletepost);


export default router;