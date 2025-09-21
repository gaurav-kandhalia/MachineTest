import express, { urlencoded } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import adminRouter from './Routes/admin.router.js'
import agentRouter from './Routes/agent.router.js'

const app = express()

app.use(morgan("dev"))
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(cookieParser())
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({
    limit:"16kb",
    extended:true
}))

app.use("/api/v1/admin",adminRouter)
app.use("/api/v1/agent",agentRouter)

app.get("/",(_,res)=>{
    res.send("API is working")
})







export default app

app.use((err, req, res, next) => {
 if (err.name === "ZodError") {
    return res.status(400).json({
      success: false,
      message: err.errors?.[0]?.message || err.message || "Validation error",
      errors: err.errors || [],
    });

}


  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});