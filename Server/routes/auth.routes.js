import { signIn } from "../controllers/index.js";
import { Router } from "express";

const authRoute = Router();


authRoute.post("/login",signIn);

export default authRoute;