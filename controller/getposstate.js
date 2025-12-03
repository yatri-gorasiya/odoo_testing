import { odooAPI, authenticate } from "../odoo.js";

export const getPOSConfigs = async (req, res) => {
  try {
    const sessionId = await authenticate();

    const response = await odooAPI.post(
      "/web/dataset/call_kw/pos.config/get_views",
      {
        jsonrpc: "2.0",
        method: "call",
        params: {
          model: "pos.config",
          method: "search_read",
          args: [],
          kwargs: {
            fields: ["id", "name", "company_id", "picking_type_id", "journal_id"]
          }
        }
      },
      { headers: { Cookie: sessionId } }
    );

    res.json(response.data);

  } catch (error) {
    console.log("POS Config List Error:", error.response?.data || error);
    res.status(500).json({ error: error.response?.data || error });
  }
};
