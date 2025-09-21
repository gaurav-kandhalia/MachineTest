import { Router } from "express";

import { isAuthenticated } from "../Middlewares/auth.middleware.js";
import { login } from "../Controllers/auth.controller.js";
import { createAgent } from "../Controllers/admin.controller.js";
const adminRouter = Router();
adminRouter.post("/login",login);
adminRouter.post("/create-agent",isAuthenticated,createAgent);

export default adminRouter;
