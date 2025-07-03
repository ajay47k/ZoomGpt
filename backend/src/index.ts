// Entry point to application
import "dotenv/config"
import express from "express"
import connectToDatabase from "./config/db"
import { APP_ORIGIN, PORT } from "./constants/env"
import cors from "cors"
import cookieParser from "cookie-parser"
import errorHandler from "./middleware/errorHandler"
import authRoutes from "./routes/auth.route"
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin:APP_ORIGIN,
    credentials:true
}))

app.get("/health",(req,res)=>{
    res.status(200).json({
        status:"healthy"
    })
})
app.use("/auth",authRoutes)
app.use(errorHandler)
app.use(cookieParser())
app.listen(PORT,async ()=>{
    console.log(`Server is running on port ${PORT}`)
    await connectToDatabase()
})


