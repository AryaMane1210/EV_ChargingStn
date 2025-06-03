import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import chargerRoutes from "./routes/chargerRoutes.js";

dotenv.config();
const app=express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/chargers", chargerRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT, ()=>{
            console.log("Server id running on port", process.env.PORT);
        });
    })
    .catch((err)=> console.error("MongoDB connection error"));

