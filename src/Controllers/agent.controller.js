
import Agent from "../Models/agent.model.js";
import { asyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

import Item from "../Models/item.model.js";




export const getAgentItems = asyncHandler(async(req,res)=>{
    const {agentId} = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;
    const agent = await Agent.findById(agentId);
    if(!agent){
        throw new ApiError(404,"Agent not found",false)
    }
    // promise all will save the time of execution
    // as if seperately items and total count is queried it will take more time
    const [items,total] = await Promise.all([
        Item.find({agentId}).skip(skip).limit(limit),
        Item.countDocuments({agentId})
    ]);
    if(!items.length){
        res.status(200).json(new ApiResponse(200,"no items assigned to this agent",true))
        return;
    }

    res.status(200).json(new ApiResponse(200,{
        agent:{ 
            id: agent._id,
            name: agent.name,
            email: agent.email
        },
        assignedItems: items,
        pagination:{
            totalItems: total,
            currentPage: page,
            totalPages: Math.ceil(total/limit),
            pageSize: limit
        }
    }))
}
);