import { Router } from "express";
import { getLeads } from "../controller/getlead.js";
import { createLead } from "../controller/createlead.js";
import { updateLead } from "../controller/updatelead.js";
import { deleteLead } from "../controller/deletelead.js";
import { getPOSConfigs } from "../controller/getposstate.js";
import { createPOSConfig } from "../controller/createposconfig.js";
import { updatePOSConfig } from "../controller/updateposconfig.js";
import { deletePOSConfig } from "../controller/deleteposcofig.js";

const router = Router();
router.post("/create-leads",createLead)
router.get("/leads", getLeads);
router.put("/update-leads",updateLead)
router.delete("/delete-leads",deleteLead)
router.get("/get-posconfig",getPOSConfigs)
router.post("/create-posconfig",createPOSConfig)
router.put("/update-posconfig",updatePOSConfig)
router.delete("/delete-poscofig",deletePOSConfig)
export default router;
