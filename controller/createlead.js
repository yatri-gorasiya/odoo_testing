import { odooAPI, authenticate } from "../odoo.js";

export const createLead = async (req, res) => {
try {
const sessionId = await authenticate();

const { name, contact_name, email_from, phone, stage_id } = req.body;

// Make sure at least 'name' is provided
if (!name) {
  return res.status(400).json({ error: "Lead name is required" });
}

const response = await odooAPI.post(
  "/web/dataset/call_kw",
  {
    jsonrpc: "2.0",
    method: "call",
    params: {
      model: "crm.lead",
      method: "create",
      args: [
        {
          name,
          contact_name,
          email_from,
          phone,
          stage_id,     
        }
      ],
      kwargs: {}
    }
  },
  {
    headers: { Cookie: sessionId }
  }
);
console.log("create lead res",response)

// The response will contain the ID of the newly created lead
return res.json({ leadId: response.data.result });

} catch (error) {
console.log("lead creation error")
return res.status(500).json({ error: error.response?.data || error });
}
};