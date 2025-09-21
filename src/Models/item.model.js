import mongoose from "mongoose";
import { number } from "zod";

const itemSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    notes:{
        type: String,
        trim: true,
        default: ""
    },
    phoneNumber:{
        type:Number,
        required:true,
        unique:true,

    },
    agentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agent",
        required: true,
    }
}, { timestamps: true });
const Item = mongoose.model("Item", itemSchema);
export default Item;