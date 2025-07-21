import express from "express";
import protectRoute from "../middleware/onboard.middleware.js";
import getStreamToken from '../controllers/chat.controller.js'

const router = express.Router();

router.use(protectRoute)

router.route('/token').get(getStreamToken)

export default router;