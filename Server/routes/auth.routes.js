import { signIn,logIn, getAccessToken } from "../controllers/index.js";
import { Router } from "express";

const authRoute = Router();


authRoute.post("/login",signIn);
authRoute.route("/login-user")
        .post(logIn)
        .get(getAccessToken);


export default authRoute;