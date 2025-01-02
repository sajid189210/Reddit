import express from 'express'
const router = express.Router();
import { renderHome, userSignUp, verifyOTP } from "../controller/userController/userHomepage.mjs";

router.get('/', renderHome);
router.post('/signUp', userSignUp);
router.post('/verifyOTP', verifyOTP);

export default router;