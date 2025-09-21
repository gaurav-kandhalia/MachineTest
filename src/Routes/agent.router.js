import { Router } from "express";

import { getAgentItems } from "../Controllers/agent.controller.js";

const agentRouter = Router();

agentRouter.get('/getTasks',getAgentItems);

export default agentRouter;