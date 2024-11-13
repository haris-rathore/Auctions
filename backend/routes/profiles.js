import express from "express";
import createProfile from "../controllers/profileControllers/createProfile.js";
import getProfile from "../controllers/profileControllers/getProfile.js";
import changePassword from "../controllers/profileControllers/changePassword.js";

const profileRouter = express.Router();

profileRouter.post("/", createProfile);

profileRouter.get("/:id", getProfile);

profileRouter.patch("/", changePassword);

// profileRouter.patch("/:id")

export default profileRouter;