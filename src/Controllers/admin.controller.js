import { asyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

import Agent from "../Models/agent.model.js";
import { safeParse } from "zod";
import { agentSchema } from "../Validations/auth.validation.js";

export const createAgent = asyncHandler(async(req,res)=>{
  
const validatedData = agentSchema.safeParse(req.body);
console.log(validatedData)

if (!validatedData.success) {
    throw new ApiError(400, "Invalid request data", false, result.error.errors);
}
    const {name,email,password,phoneNumber} = validatedData.data;
    console.log("--------------------------------------")
    console.log(name);
  const existingAgent = await Agent.findOne({
  $or: [
    { email: email },
    { mobile: phoneNumber }
  ]
});

if (existingAgent) {
  throw new ApiError(400, "Agent with this email or mobile already exists");
}
    const agent = await Agent.create({
        name,
        email,
        password,
        phoneNumber
        
    });
    res.status(201).json(new ApiResponse(201,{agent},"Agent created successfully",true))
}
)
 
    

