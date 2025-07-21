import express from 'express'
import userController from '../controllers/user.controller.js'
import protectRoute from '../middleware/onboard.middleware.js'

const router = express.Router()
router.use(protectRoute)

router.route('/').get(userController.getRecommendedUsers)
router.route('/friends').get(userController.getMyFriends)

router.route('/friend-requests/:id').post(userController.sendFriendRequest)
router.put("/friend-requests/:id/accept", userController.acceptFriendRequest);

router.route("/friend-requests").get(userController.getFriendRequests);
router.route("/outgoing-friend-requests").get(userController.getOutgoingFriendReqs);

export default router