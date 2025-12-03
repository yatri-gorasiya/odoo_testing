import { odooAPI, authenticate } from "../odoo.js";

export const updateLead = async (req, res) => {
try {
const sessionId = await authenticate();

const { id, name, contact_name, email_from, phone, stage_id } = req.body;

// Make sure lead ID is provided
if (!id) {
  return res.status(400).json({ error: "Lead ID is required" });
}

const response = await odooAPI.post(
  "/web/dataset/call_kw",
  {
    jsonrpc: "2.0",
    method: "call",
    params: {
      model: "crm.lead",
      method: "write",
      args: [
        [id], // List of lead IDs to update
        {
          ...(name && { name }),
          ...(contact_name && { contact_name }),
          ...(email_from && { email_from }),
          ...(phone && { phone }),
          ...(stage_id && { stage_id }),
        }
      ],
      kwargs: {}
    }
  },
  {
    headers: { Cookie: sessionId }
  }
);

// The response will be True if update succeeded
return res.json({ updated: response.data.result });

} catch (error) {
return res.status(500).json({ error: error.response?.data || error });
}
};