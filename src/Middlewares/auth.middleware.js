import { ApiError } from "../Utils/ApiError.js";
import { asyncHandler } from "../Utils/AsyncHandler.js";
import Admin from "../Models/admin.model.js";
import jwt from "jsonwebtoken"

export const isAuthenticated = asyncHandler(async(req, _, next) => {
    try {
        console.log("this auth middlware")
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        
                   

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
        const user = await Admin.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})


;