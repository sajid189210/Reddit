import express from 'express'
const router = express.Router();
import { renderHome } from "../controller/userController/userHomepage.mjs";

router.get('/', renderHome);

export default router;