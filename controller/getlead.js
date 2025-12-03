import { odooAPI, authenticate } from "../odoo.js";

export const getLeads = async (req, res) => {
  try {
    const sessionId = await authenticate();

    const response = await odooAPI.post(
      "/web/dataset/call_kw",
      {
        jsonrpc: "2.0",
        method: "call",
        params: {
          model: "crm.lead",
          method: "search_read",
          args: [[]],
          kwargs: {
            fields: ["name", "contact_name", "email_from", "phone"],
            limit: 20
          }
        }
      },
      {
        headers: { Cookie: sessionId }
      }
    );

    return res.json(response.data.result);

  } catch (error) {
    return res.status(500).json({ error: error.response?.data || error });
  }
};
