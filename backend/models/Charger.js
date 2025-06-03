import mongoose from "mongoose";

const chargerSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    location :{
        latitude:{
            type: Number,
            required: true
        },
        longitude:{
            type: Number,
            required: true
        },
        
    },
    status:{
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
    },
    powerOp :{
        type: Number,
        required : true
    },
    connectorType:{
        type: String,
        required : true
    },
    madeBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
});

export default mongoose.model("Charger", chargerSchema);