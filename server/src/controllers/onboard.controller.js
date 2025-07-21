import User from "../models/User.model.js";
import { upsertStreamUser } from "../lib/stream.js";

const onboard = async (req, res) => {
    try {
        const userId = req.user._id;
        
        const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body;

        // Validate required fields
        if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
                missingFields : [
                    !fullName && "fullName",
                    !bio && "bio",
                    !nativeLanguage && "nativeLanguage",
                    !learningLanguage && "learningLanguage",
                    !location && "location",
                ].filter(Boolean)
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                ...req.body,
                isOnboarded: true, // optional flag
            },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        try {
            await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullName,
                image: updatedUser.profilePic || ""
            })
            console.log(`Stream user updated after onboarding for ${updatedUser.fullName}`);
            
        } catch (streamError) {
            console.log("Error updating stream during onboarding ", streamError.message);
            
        }

        res.status(200).json({
            success: true,
            message: "User onboarded successfully.",
            user: updatedUser,
        });

    } catch (error) {
        console.error("Onboard controller error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

export default onboard;
