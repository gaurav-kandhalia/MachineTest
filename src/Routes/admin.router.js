import { Router } from "express";

import { isAuthenticated } from "../Middlewares/auth.middleware.js";
import { login } from "../Controllers/auth.controller.js";
import { createAgent, distributeController, getDistributedItems } from "../Controllers/admin.controller.js";
import { upload } from "../Middlewares/multer.middleware.js";
import { uploadFile } from "../Controllers/admin.controller.js";
const adminRouter = Router();
adminRouter.post("/login",login);
adminRouter.post("/create-agent",isAuthenticated,createAgent);
adminRouter.post("/uploadFile",isAuthenticated,upload.single("file"),uploadFile);
adminRouter.post("/distributeItems",isAuthenticated,distributeController);
adminRouter.get("/Items",isAuthenticated,getDistributedItems)

export default adminRouter;
