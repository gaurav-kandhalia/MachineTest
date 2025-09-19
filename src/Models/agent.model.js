import mongoose from "mongoose";

const agentModel = mongoose.Schema({
    Name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    Email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    Phone:{
        type:String,
        required:true,
        trim:true,
        unique:true

    },
    Password:{
        type:String,
        required:true,
    },
    Role:{
        type:String,
        default:"agent"
    }
},
{
    timestamps:true 
}
)

const Agent = mongoose.model("Agent",agentModel)

export default Agent