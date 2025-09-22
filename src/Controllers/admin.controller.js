import { asyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

import Agent from "../Models/agent.model.js";
import { safeParse } from "zod";
import { agentSchema } from "../Validations/auth.validation.js";
import path from "path";
  import { distributeItems, validateRow } from "../Utils/distributeItems.js";
import { parseCSV, parseXLSX } from "../Utils/fileParser.js";
import Item from "../Models/item.model.js";
import fs from 'fs'


export const createAgent = asyncHandler(async(req,res)=>{
  
const validatedData = agentSchema.safeParse(req.body);
console.log(validatedData)

if (!validatedData.success) {
    throw new ApiError(400, "Invalid request data", false, result.error.errors);
}
    const {name,email,password,phoneNumber} = validatedData.data;
    console.log("--------------------------------------")
    console.log(name);
  const existingAgent = await Agent.findOne({
  $or: [
    { email: email },
    { mobile: phoneNumber }
  ]
});

if (existingAgent) {
  throw new ApiError(400, "Agent with this email or mobile already exists");
}
    const agent = await Agent.create({
        name,
        email,
        password,
        phoneNumber
        
    });
    res.status(201).json(new ApiResponse(201,{agent},"Agent created successfully",true))
}
)


export const uploadFile = asyncHandler(async(req,res)=>{
 
  const dataFile = req.file?.path;
 
    if (!req.file) {
        throw new ApiError(400, "No file uploaded",false);
    }
     const absolutePath = path.resolve(dataFile).replace(/\\/g, '/');
    
    
    res.status(200).json(new ApiResponse(200,{file:absolutePath},"File uploaded successfully",true))
});
 


const batchSize = 1000;

export const distributeController = asyncHandler(async(req,res)=>{
  const {filePath} = req.body;
  
  if(!filePath || !fs.existsSync(filePath)){
    throw new ApiError(400,"File not found",false)
  }

  const extension = path.extname(filePath).toLowerCase();

  if (![".csv", ".xlsx", ".xls"].includes(extension)) {
    throw new ApiError(400, "Invalid file type. Only CSV, XLSX, and XLS allowed.", false);
  }
  // this app will work fetch only 5 agents from the db and perform operation on it 
  // this is scalable can work on any number of agents
  // const agents = await Agent.find().sort({ createdAt: 1 });
const agents = await Agent.find().sort({ createdAt: 1 }).limit(5);

  if(agents.length !== 5){
    console.log("agents length",agents.length)
    throw new ApiError(400,"No agents found",false)
  }
  let rows = extension === ".csv" ? await parseCSV(filePath) : await parseXLSX(filePath);

 
  let batch = [];
  let totalProcessed = 0;
  let globalAgentIndex = 0;
  

  for(let row of rows){
   
    if(validateRow(row)){
     
        batch.push(row);
       
       
    } 
    if(batch.length === batchSize){
      
      const {distributed, nextAgentIndex} = distributeItems(batch,agents,globalAgentIndex);
      await Item.insertMany(distributed);
      totalProcessed += batch.length;
      globalAgentIndex = nextAgentIndex;
      batch = [];
    }
  }

  if(batch.length > 0){

    const {distributed} = distributeItems(batch,agents,globalAgentIndex);
   
    const itemsAssigned = await Item.insertMany(distributed);
    
    totalProcessed += batch.length;
  }

  fs.unlinkSync(filePath);

  res.status(200).json(new ApiResponse(200,{
    totalProcessed,
    totalAgents: agents.length
  },"Items distributed successfully",true))
});


// export const getDistributedItems = asyncHandler(async (req, res) => {

//   const page = parseInt(req.query.page) || 1;       
//   const limit = parseInt(req.query.limit) || 50;    
//   const skip = (page - 1) * limit;

  
//   const [items, totalCount] = await Promise.all([
//     Item.find().skip(skip).limit(limit),
//     Item.countDocuments()
//   ]);
//   console.log(items.length);
//   if(!items){
//     throw new ApiError(400,"something went wrong",false)
//   }

//   if (items.length === 0) {
//     return res.status(200).json(
//       new ApiResponse(200, null, "No items are distributed", true)
//     );
//   }else{

//       return res.status(200).json(
//     new ApiResponse(200, {
//       items,
//       pagination: {
//         totalItems: totalCount,
//         totalPages: Math.ceil(totalCount / limit),
//         currentPage: page,
//         pageSize: limit,
//         hasNextPage: page * limit < totalCount,
//         hasPrevPage: page > 1
//       }
//     }, "Distributed items fetched successfully", true)
//   );
//   }


// });

export const getDistributedItems = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;       
  const limit = parseInt(req.query.limit) || 50;    
  const skip = (page - 1) * limit;

  const [items, totalCount] = await Promise.all([
    Item.find()
      .skip(skip)
      .limit(limit)
      .populate("agentId", "name email phoneNumber"),  
    Item.countDocuments()
  ]);

  if (!items) {
    throw new ApiError(400, "Something went wrong", false);
  }

  if (items.length === 0) {
    return res.status(200).json(
      new ApiResponse(200, null, "No items are distributed", true)
    );
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        items,
        pagination: {
          totalItems: totalCount,
          totalPages: Math.ceil(totalCount / limit),
          currentPage: page,
          pageSize: limit,
          hasNextPage: page * limit < totalCount,
          hasPrevPage: page > 1,
        },
      },
      "Distributed items fetched successfully",
      true
    )
  );
});










