import jwt from "jsonwebtoken";


export const jwtToken = (user,isAccessToken) =>{
    const claims = {
        sub: user.id,                 // subject
        name: user.name,          // custom claim
        role: user.role,              // custom claim
        iss: "MyAppServer",           // issuer
        aud: "MyFrontendApp",         // audience
    }
    if(isAccessToken){
        return jwt.sign(claims,process.env.JWT_SECRET,{expiresIn: "5m" });
    } else {
        // claims[jid] =crypto.randomUUID();
        return jwt.sign(claims, process.env.JWT_SECRET,{expiresIn:"1d"});
    }
}

export const jwtTokenVerify = (jwtToken) =>{
    return jwt.verify(jwtToken, process.env.JWT_SECRET);
}