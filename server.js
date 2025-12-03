import express from "express";
import cors from "cors";
import crmRoutes from "./routes/crmRoute.js"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/crm", crmRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
