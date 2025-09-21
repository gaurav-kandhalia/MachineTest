import { email, z } from "zod";



export const adminLoginSchema = z.object({
    email:z.string().email("Invalid email address"),
    password:z.string().min(6,"Password must be atleast 6 charcters"),
    
})
export const agentSchema = z.object({
    email:z.string().email("invalid email address"),
    name:z.string().min(3,"name must be atleast 3 character"),
    phoneNumber:z.string({ required_error: "Mobile number is required" })
    .regex(/^\+\d{1,3}\d{7,14}$/, "Invalid mobile number with country code"),
    password:z.string().min(6,"Password must be atleast 6 charcters"),
})

