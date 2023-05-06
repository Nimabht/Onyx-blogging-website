import express from "express";
import asyncMiddleware from "../middlewares/async.js";
import controllers from "../controllers/auth.js";
const router = express.Router();

router.post("/signup", asyncMiddleware(controllers.signupUser));

export default router;