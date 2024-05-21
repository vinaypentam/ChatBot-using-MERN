import { Request, Response } from "express";
import User from "../models/userModel.js";
import {compare, hash} from "bcrypt"
import { create_token } from "../utils/token_manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllUsers = async(req:Request, res:Response) => {
    try {
        const users = await User.find();
        return res.status(200).json({message: "ok", users});
    } catch (error) {
        console.log(error);
        return res.json({message: "error"});
    }
};

export const userSignUp = async(req:Request, res:Response) => {
    try {
        const {name, password, email} = req.body;
        const existingUser = await User.findOne({email});
        console.log(existingUser);
        if(existingUser) return res.status(401).send("User already exist");
        const hashedPwd = await hash(password, 10);
        const user = new User({name, password:hashedPwd, email});
        await user.save();
        console.log ("user created");
        res.clearCookie("auth_token", {
            path: "/",
            signed: true,
            httpOnly: true, 
            domain: "localhost"
        });
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        const token = create_token(user._id.toString(), user.email, "7d");
        res.cookie("auth_token", token, {
            path: "/",
            expires,
            signed: true,
            httpOnly: true,
            domain: "localhost"
        });

        return res.status(201).json({message: "ok", name: user.name, email: user.email});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "error"});
    }
};

export const userLogin = async(req:Request, res:Response) =>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(401).json({message: "No user found"});
        const result = await compare(password, user.password);
        if(!result) return res.status(403).send("Incorrect password");
        res.clearCookie(`${COOKIE_NAME}`, {
            path: "/",
            signed: true,
            httpOnly: true, 
            domain: "localhost"
        });
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        const token = create_token(user._id.toString(), user.email, "7d");
        res.cookie(`${COOKIE_NAME}`, token, {
            path: "/",
            expires,
            signed: true,
            httpOnly: true,
            domain: "localhost"
        });

        return res.status(200).json({message: "ok", name: user.name, email: user.email});
    } catch (error) {
        console.log(error);
        return res.status(401).json({message: "error"});
    }
}
export const userLogout = async(req:Request, res:Response) =>{
    try {
        res.clearCookie(`${COOKIE_NAME}`, {
            path: "/",
            signed: true,
            httpOnly: true, 
            domain: "localhost"
        });
        return res.status(200).json({message: "ok"});
    } catch (error) {
        console.log(error);
        return res.status(401).json({message: "error"});
    }
}
export const verifyUser = async(req:Request, res:Response) =>{
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if(!user) return res.status(401).json({message: "No user found"});

        return res.status(200).json({message: "ok", name: user.name, email: user.email});
    } catch (error) {
        console.log(error);
        return res.status(401).json({message: "error"});
    }
}