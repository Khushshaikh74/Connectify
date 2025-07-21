import express from 'express'
import dotenv from 'dotenv'
import connectDB from './lib/db.js'
import errorMiddleware from './middleware/error.middleware.js'
import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
import chatRoute from './routes/chat.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

// app.get('/', (req, res) => {
//     res.send(`<h1>Server is running</h1>`)
// })

app.use(
    cors({
        origin : "http://localhost:5173",
        credentials : true
    })
);

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());

//auth
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use('/api/chat', chatRoute)

//error middleware
app.use(errorMiddleware)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at port http://localhost:${PORT}/`)
    })
})
