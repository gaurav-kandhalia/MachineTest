import { Router } from "express";

import { isAuthenticated } from "../Middlewares/auth.middleware.js";
import { login } from "../Controllers/auth.controller.js";
const adminRouter = Router();
adminRouter.post("/login",login);

export default adminRouter;
