import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminSchema = mongoose.Schema({
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

adminSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})

adminSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password,this.password);
}

adminSchema.methods.generateAccessToken = function(){
    
            
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

adminSchema.methods.generateRefreshToken = function(){
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


const Admin = mongoose.model("Admin",adminSchema)

export default Admin
   