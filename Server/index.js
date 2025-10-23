import express from "express";
import connectDB from "./config/db.config.js";
import CORS from "cors";
import dotenv from "dotenv";
import { auth } from "./routes/index.js";
dotenv.config();
const app = express();

app.use(express.json())
app.use(CORS())
app.get("/",(req, res)=>{
    res.send({
        message:"Hello"
    })
})

app.use("/v1/api",auth);

app.use((req, res, next) => {
  const error = new Error(`No route found at ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

app.use((error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error"
    return res.status(error.statusCode).json({
        status:"failed",
        message:"Error occured",
        conten:error.message
    })
});


app.listen(3000, async ()=>{
    console.log("Hello World");
    await connectDB();
})