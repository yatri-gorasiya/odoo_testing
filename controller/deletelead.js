import { odooAPI, authenticate } from "../odoo.js";

export const deleteLead = async (req, res) => {
try {
const sessionId = await authenticate();

const { id } = req.body;

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
      method: "unlink",
      args: [[id]], // List of lead IDs to delete
      kwargs: {}
    }
  },
  {
    headers: { Cookie: sessionId }
  }
);

// The response will be True if deletion succeeded
return res.json({ deleted: response.data.result });

} catch (error) {
return res.status(500).json({ error: error.response?.data || error });
}
}