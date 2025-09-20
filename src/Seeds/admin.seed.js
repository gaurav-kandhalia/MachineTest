import Admin from "../Models/admin.model.js";
import bcrypt from "bcrypt";
import  dotenv from "dotenv"
import mongoose from "mongoose";
dotenv.config();



const seedAdmin = async () => {
  try {

     await mongoose.connect(process.env.MONGODB_URI);

   

      const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const existingAdmin = await Admin.findOne({ Email: adminEmail });
    if (existingAdmin) {
      console.log("Admin already exists");
      return process.exit();
    }

 
    

    // Create admin
    await Admin.create({
      email: adminEmail,
      password: adminPassword
    });

    console.log(" Admin user seeded successfully");
    process.exit();
  } catch (err) {
    console.error("Error seeding admin:", err.message);
    process.exit(1);
  }
};

seedAdmin();
