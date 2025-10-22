import mongoose from "mongoose";

function connectDB(){
mongoose
.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("DB Connected")
})
.catch((err)=>{
    console.log(`Error ${err.message}`);
})
}

export default connectDB;