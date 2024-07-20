import express from "express"
import { createPost, getPost } from "../controllers/post.controllers.js"
import { verifyToken } from "../utils/verifyuser.js";
const router = express.Router();

router.post('/createpost', verifyToken, createPost);
router.get('/getpost', getPost);

export default router;