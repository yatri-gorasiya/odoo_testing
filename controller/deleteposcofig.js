import { authenticate, odooAPI } from "../odoo.js";

export const deletePOSConfig = async (req, res) => {
  try {
    const sessionId = await authenticate();

    const { id } = req.body;

    const response = await odooAPI.post(
      "/web/dataset/call_kw/pos.config/unlink",
      {
        jsonrpc: "2.0",
        method: "call",
        params: {
          model: "pos.config",
          method: "unlink",
          args: [[id]],
          kwargs: {}
        }
      },
      { headers: { Cookie: sessionId } }
    );

    res.json(response.data);

  } catch (error) {
    console.log("POS Config Delete Error:", error.response?.data || error);
    res.status(500).json({ error: error.response?.data || error });
  }
};
