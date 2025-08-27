import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import financialRecordRouter from "./routes/financial-records";

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// ✅ Add your database name here
const mongoURI: string = "mongodb+srv://khileridikshant:MJGDSngiDKHcEqYA@finance-manager.sqmbyla.mongodb.net/financeDB";

mongoose
  .connect(mongoURI)
  .then(() => console.log("CONNECTED TO MONGODB!"))
  .catch((err) => console.error("Failed to Connect to MongoDB:", err));

// ✅ Use router only once
app.use("https://finance-manager-3.onrender.com/api/financial-records", financialRecordRouter);

// Serve frontend build
app.use(express.static(path.join(__dirname, "../public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html")); 
});

app.listen(port, () => {
  console.log(`Server Running on Port ${port} http://localhost:${port}`);
});
