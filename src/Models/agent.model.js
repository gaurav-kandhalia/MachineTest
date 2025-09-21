import mongoose from "mongoose";
import bcrypt from "bcrypt";

const agentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    phoneNumber:{
        type:String,
        required:true,
        trim:true,
        unique:true

    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"agent"
    }
},
{
    timestamps:true 
}
)

agentSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})

agentSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password,this.password);
}

const Agent = mongoose.model("Agent",agentSchema)

export default Agent