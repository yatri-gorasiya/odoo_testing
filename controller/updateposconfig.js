import { authenticate, odooAPI } from "../odoo.js";

export const updatePOSConfig = async (req, res) => {
  try {
    const sessionId = await authenticate();

    const { id, data } = req.body;

    const response = await odooAPI.post(
      "/web/dataset/call_kw/pos.config/write",
      {
        jsonrpc: "2.0",
        method: "call",
        params: {
          model: "pos.config",
          method: "write",
          args: [[id], data],
          kwargs: { context: { lang: "en_US" } }
        }
      },
      { headers: { Cookie: sessionId } }
    );

    res.json(response.data);
  } catch (error) {
    console.log("Update POS Error:", error.response?.data || error);
    res.status(500).json({ error: error.response?.data || error });
  }
};
