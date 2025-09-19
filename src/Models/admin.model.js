import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminModel = mongoose.Schema({
   email:{
    type:String,
    required:true,
    trim:true,
    unique:true
    },
    password:{
        type:String,
        required:true,
    },
    refreshToken:{
        type:String,
        default:""
    },
},
{
    timestamps:true 
}
)

adminModel.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})

adminModel.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password,this.password);
}

adminModel.methods.generateAccessToken = function(){
    
            
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,  
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

adminModel.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY

        }
    )
}


const Admin = mongoose.model("Admin",adminModel)

export default Admin
   