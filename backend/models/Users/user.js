import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: false,
        trim: true,
        min: 3,
        max: 20,
    },
    lastname: {
        type: String,
        required: false,
        trim: true,
        min: 3,
        max: 20,
    },
    email: {
        type: String,
        required: false,
        trim: true,
        unique: true,
        lowercase: true,
    },  
    password: {
        type: String,
        required: false,
    },
    role: { 
        type: String,
        required: false,
        default: "student",
    },
    contact: { type: String },
    pofilePicture: { type: String },
}, { timestamps: true });

const Customer = mongoose.model("User", CustomerSchema);

export default Customer;