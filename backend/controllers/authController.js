import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req,res) =>{
    const {email,password} = req.body;
    try{
        const existingUser= await User.findOne({email});
        if(existingUser)
            return res.status(400).json({message: "User already exists"});

        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({email, password: hashedPassword});

        res.status(201).json({message: "User registered"});
    }catch(err){
        res.status(500).json({message: "Signup Failed", error: err.message});
    }
};

export const login = async (req,res) =>{
    const {email,password} = req.body;
    try{
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid id/password"});
            }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message : "Incorrect id/password"});
            }
        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.json({token});
    }catch(err){
        res.status(500).json({message:"Login failed",error: err.message});
    }
};