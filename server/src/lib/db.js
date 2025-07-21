import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const URI = process.env.MONGO_URI; //mern_admin => DB name

const connectDb = async ()=>{
    try {
        await mongoose.connect(URI)
        console.log("Database Connection Successful")
    } catch (error) {
        console.error("Database Connection Failed")
        process.exit(0)
    }
}

export default connectDb;