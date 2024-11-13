import express from "express";
import cors from "cors";
import auctionRoutes from "./routes/auctions.js";
import profileRoutes from "./routes/profiles.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware
app.use(express.json())
app.use((req, res, next)=>{
    console.log(req.path, req.method);
    next();
})

// routes
app.use("/auctions", auctionRoutes);
app.use("/profiles", profileRoutes);
