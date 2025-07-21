import User from "../models/User.model.js";
import jwt from 'jsonwebtoken';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized user - No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // throws if invalid
        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user) {
            return res.status(401).json({ message: "Unauthorized user - User not found" });
        }

        req.user = user;
        //console.log("Authenticated user:", req.user);

        next();
    } catch (error) {
        console.error("Protected route error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default protectRoute;
