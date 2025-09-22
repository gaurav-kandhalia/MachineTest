import { ApiError } from "../Utils/ApiError.js";
import { asyncHandler } from "../Utils/AsyncHandler.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import Admin from "../Models/admin.model.js";
import { adminLoginSchema } from "../Validations/auth.validation.js";

const generateAccessandRefreshTokens = async(AdminId)=>{
    
     const admin = await Admin.findById(AdminId);

   const accessToken =admin.generateAccessToken();
   const refreshToken = admin.generateRefreshToken();

 

     admin.refreshToken  = refreshToken;
     await admin.save({validateBeforeSave:false});

     return {refreshToken,accessToken}
}

export const login = asyncHandler(async (req, res) => {
    console.log("login route ")
   
    const validatedData = adminLoginSchema.parse(req.body);
     
    if(!validatedData) {
        throw new ApiError(400,"Invalid request data")
    }
    const { email, password } = validatedData;
    const admin = await Admin.findOne({ email });
    console.log("amdin",admin)
    console.log("password",password)

    if (!admin) {
        throw new ApiError(404, "Invalid email or password");
    }
    const isPasswordValid = await admin.comparePassword(password);
    console.log("isPasswordValid",isPasswordValid)
    if (!isPasswordValid) {
        throw new ApiError(404, "Invalid email or password");
    }
   
    const { accessToken, refreshToken } = await generateAccessandRefreshTokens(admin._id);


    console.log("--------------------------------------------")
   
    const loggedInAdmin = await Admin.findById(admin._id).select("-password -refreshToken");
    console.log("login",loggedInAdmin)


const options ={
    secure:true,
    httpOnly: true
}
res.
status(200)
.cookie("accessToken",accessToken,options)
.cookie("refreshToken",refreshToken,options)
.json(new ApiResponse(200,
    {
        user:loggedInAdmin,accessToken,refreshToken

},
"admin logged in successfully"
)
)



})



   
