import { type } from "os";
import { string } from "zod";

export const distributeItems = (items, agents, startIndex) => {
  const distributed = [];
  let agentIndex = startIndex;

  for (let item of items) {
    const agent = agents[agentIndex % agents.length];
    distributed.push({
      firstName: item.firstName,
      phoneNumber: item.phoneNumber,
      notes: item.notes || "",
      agentId: agent._id,
    });
    agentIndex++;
  }

  return { distributed, nextAgentIndex: agentIndex };
};
export const validateRow = (row) => {


  const firstName = String(row.firstName || "").trim();
  const phoneNumber = String(row.phoneNumber || "").trim();
  const notes = String(row.notes || "").trim();

  console.log('.........................')

  if (!firstName) {
    console.log("First name is not valid", firstName);
    return false;
  }

  const phoneRegex = /^\+?\d{7,15}$/;
  if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
    console.log("Phone number is not valid", phoneNumber);
    return false;
  }

  if (notes && typeof notes !== "string") {
    console.log("Notes are not valid", notes);
    return false;
  }
   
  console.log("..........................validated e d")

  return true;
};




