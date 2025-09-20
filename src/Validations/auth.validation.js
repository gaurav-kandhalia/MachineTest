import { z } from "zod";



export const adminLoginSchema = z.object({
    email:z.string().email("Invalid email address"),
    password:z.string().min(6,"Password must be atleast 6 charcters"),
    
})

