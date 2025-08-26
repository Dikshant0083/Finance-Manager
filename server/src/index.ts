//MJGDSngiDKHcEqYA
// mongodb+srv://khileridikshant:MJGDSngiDKHcEqYA@finance-manager.sqmbyla.mongodb.net/
import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records";
import cors from "cors";
import path from "path";
import routes from "./routes/financial-records";
const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const mongoURI: string ="mongodb+srv://khileridikshant:MJGDSngiDKHcEqYA@finance-manager.sqmbyla.mongodb.net/";

mongoose
  .connect(mongoURI)
  .then(() => console.log("CONNECTED TO MONGODB!"))
  .catch((err) => console.error("Failed to Connect to MongoDB:", err));

app.use("/financial-records", financialRecordRouter);
app.use(express.json());

// Your API routes
app.use("/api/financial-records", routes);

// Serve frontend build
app.use(express.static(path.join(__dirname, "../public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});