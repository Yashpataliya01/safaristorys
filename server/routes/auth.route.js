import express from "express"
import { signup, signin, signout, getuser } from "../controllers/auth.controllers.js"
import { verifyToken } from "../utils/verifyuser.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);
router.get('/getuser', verifyToken , getuser);


export default router;