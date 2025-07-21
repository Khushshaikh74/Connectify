import User from '../models/User.model.js'
import { upsertStreamUser } from '../lib/stream.js';

/* -------------------------------------------------------------------- */
/*                           Registeration Logic                        */
/* -------------------------------------------------------------------- */
const register = async (req, res, next) => {
    try {
        //console.log(req.body);

        const { fullName, email, password } = req.body;

        // Check if user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "Email already exists, please try different one or Try to login" });
        }

        const idx = Math.floor(Math.random() * 500) + 1;
        const randomAvatar = `https://i.pravatar.cc/300?u=${idx}`;

        // Create new user
        const user = await User.create({ fullName, email, password, profilePic: randomAvatar });

        /* -------------------------------------------------------------------- */
        /*                      Creating user in stream                         */
        /* -------------------------------------------------------------------- */
        try {
            await upsertStreamUser({
                id : user._id.toString(),
                name : user.fullName,
                image : user.profilePic || ""
            })
            console.log(`Stream user created for ${user.fullName}`);
            
        } catch (error) {
            console.error("Error creating stream user")
        }

        const token = await user.generateToken();
        res.cookie("jwt", token, {
          httpOnly: true,
          secure: true,            // Always true for deployed (HTTPS)
          sameSite: "None",        // Required for cross-site cookies
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            userId: user._id.toString()
        });

    } catch (error) {
        next(error)
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = await user.generateToken();
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: true,           // Always true for production (HTTPS)
            sameSite: "None",       // ✅ Required for cross-site
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ success: true, user });

    } catch (error) {
        next(error); // now this will work properly
    }
}


const logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ status: true, message: "Logout Successfully" });
};


export default { register, login, logout }
