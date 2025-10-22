import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";


const Otp = new Schema({
    number:{
        type:Number,
        default:0
    },
    expAt:{
        type:Date,
        default: () => Date.now() + 5 * 60 * 1000 
    },
    isActive:{
        type:Boolean,
        default:true
    }
})
const UserSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        match:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    otp:Otp,
    isActive:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

UserSchema.pre('save',function(){
    if (!this.isModified("password")) return next();
    const hash = bcrypt.hashSync(this.get("password"), 10);
    this.password = hash;
    next();
});

UserSchema.methods.comparePassword = async function(currentPassword){
    return await bcrypt.compare(currentPassword, this.password);
}

UserSchema.methods.createNewOtp = async function(){
    this.otp = await new Otp({number:Math.floor(100000 + Math.random() * 900000)})
}

UserSchema.methods.compareOtp = async function(currentOTP){
    if(currentOTP === this.otp.number)
        if(this.otp.isActive){
            this.otp.isActive = false;
            if(this.otp.expAt >= Date.now())
                return true;
        }
    
    return false;
}

const User = mongoose.model("User",UserSchema);

export default User;
