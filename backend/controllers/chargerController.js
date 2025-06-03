import Charger from "../models/Charger.js";

export const createCharger = async (req,res) =>{
    console.log("Request body:", req.body);
    console.log("User ID:", req.user.userId);
    try{
        const newCharger = await Charger.create({...req.body,
            madeBy: req.user.userId,
        });
        res.status(201).json(newCharger);
    }catch(err){
        res.status(500).json({message: "Failed to create charger", error: err.message});
    }
};

export const getAllCharger = async(req, res) =>{
    try{
        const chargers = await Charger.find();
        res.json(chargers);
    }catch(err){
        res.status(500).json({message: "Failed to fetch chargers", error: err.message});
    }
};

export const updateCharger = async(req,res) =>{
    try{
        const update= await Charger.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!update) 
            return res.status(404).json({message: "Charger not found"});
        res.json(update);
    }catch(err){
        res.status(500).json({message: " Update fail", error: err.message});
    }
};

export const deleteCHarger = async (req, res) =>{
    try{
        const deleted = await Charger.findByIdAndDelete(req.params.id);
        if(!deleted)
            return res.status(404).json({message: "Charger not found"});
        res.json({message:"Charger deleted"});
    }catch(err){
        res.status(500).json({message:"Delete fail", error: err.message});
    }
}