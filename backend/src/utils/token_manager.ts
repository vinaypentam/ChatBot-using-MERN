import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { COOKIE_NAME } from "./constants.js";
import { resolve } from "path";
export const create_token = (id: string, email: string, expiresIn: string) =>{
    const payload = {id, email};
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn});
    return token;
}

export const verify_token = (req: Request, res: Response, next: NextFunction)=>{
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if(!token || token.trim() === "") return res.status(401).send("Token not received");
    console.log(token);
    return new Promise<void>((resolve, reject)=>{
        return jwt.verify(token, process.env.JWT_SECRET, (err, success)=>{
            if(err){
                reject(err.message);
                return res.status(401).send("Invalid token");
            }else{
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        })
    })
}