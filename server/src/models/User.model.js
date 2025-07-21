import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        bio: {
            type: String,
            default: "",
        },
        profilePic: {
            type: String,
            default: "",
        },
        nativeLanguage: {
            type: String,
            default: "",
        },
        learningLanguage: {
            type: String,
            default: "",
        },
        location: {
            type: String,
            default: "",
        },
        isOnboarded: {
            type: Boolean,
            default: false,
        },
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);


/* -------------------------------------------------------------------- */
/*                   Securing password using bcrypt                     */
/* -------------------------------------------------------------------- */
userSchema.pre("save", async function (next) {
    try {
        const user = this
        
        if (!user.isModified("password")) return next();
        
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})

/* -------------------------------------------------------------------- */
/*                         Json web Token                               */
/* -------------------------------------------------------------------- */
userSchema.methods.generateToken = function () {
    try {
        const token = jwt.sign(
            { userId: this._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        );
        return token;
    } catch (error) {
        console.error("Token generation error:", error);
        throw error;
    }
};

/* -------------------------------------------------------------------- */
/*                         password compare                             */
/* -------------------------------------------------------------------- */
userSchema.methods.comparePassword = async function (enteredPassword) {
    const isPasswordCorrect = bcrypt.compare(enteredPassword, this.password)
    return isPasswordCorrect
}

const User = new mongoose.model("User", userSchema);

export default User;