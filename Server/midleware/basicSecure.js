import AppError from "../utils/Exceptions.js";
import { jwtToken, jwtTokenVerify } from "../utils/jwtToken.js";
const basicSecure = async (req, res, next) =>{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) throw new AppError("Unauthorized", 401);

    const data = await jwtTokenVerify(token);
    
    if(!data) throw new AppError("Invalid Cretentials", 401);

    req.user = data;

    next();

}

export default basicSecure;