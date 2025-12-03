import { authenticate, odooAPI } from "../odoo.js";

export const createPOSConfig = async (req, res) => {
  try {
    const sessionId = await authenticate();

    const { name, company_id, picking_type_id, journal_id } = req.body;

    const response = await odooAPI.post(
      "/web/dataset/call_kw/pos.config/create",
      {
        jsonrpc: "2.0",
        method: "call",
        params: {
          model: "pos.config",
          method: "create",
          args: [
            {
              name,
              company_id,
              picking_type_id,
              journal_id,
              module_pos_restaurant: true,  
              iface_cashdrawer: true        
            }
          ],
          kwargs: {}
        }
      },
      { headers: { Cookie: sessionId } }
    );

    return res.json(response.data);

  } catch (error) {
    console.log("POS Create Error:", error.response?.data || error);
    res.status(500).json({ error: error.response?.data || error });
  }
};
