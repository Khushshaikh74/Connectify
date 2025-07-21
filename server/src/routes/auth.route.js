import express from 'express'
import authController from '../controllers/auth.controller.js'
import validate from '../middleware/validate.middleware.js'
import {userSignUpSchema} from '../validators/auth.validate.js'
import onboard from '../controllers/onboard.controller.js'
import protectRoute from '../middleware/onboard.middleware.js'

const router = express.Router()

router.route('/signup').post(validate(userSignUpSchema), authController.register)
router.route('/signin').post(authController.login)
router.route('/logout').get(authController.logout)
router.route("/onboarding").post(protectRoute, onboard)
router.route("/me").get(protectRoute, (req, res)=>{
    res.status(200).json({ success: true, user: req.user })
})

export default router