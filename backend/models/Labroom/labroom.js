import mongoose from "mongoose";
import validator from "validator";

const LabroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    description: {
        type: String,
        required: false,
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    capacity: {
        type: Number, // Assuming capacity is a number
        required: false,
        validate: {
            validator: (value) => value >= 3 && value <= 20, // Custom validation for capacity
            message: "Capacity must be between 3 and 20",
        },
    },
    enrollmentkey: {
        type: String,
        required: false,
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    instructorname: {
        type: String,
        required: false,
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    instructoremail: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (value) => validator.isEmail(value), // Validate as email
            message: "Invalid email address",
        },
    },
    labdate: {
        type: Date, // Assuming labdate is a Date
        required: false,
    },
    step: {
        type: [String], // Define "step" as an array of strings
        default: [],    // Set a default empty array if needed
    },
    meetinglink: {
        type: String,
        required: false,
        trim: true,
        minlength: 3,
    },
}, { timestamps: true });

const Labroom = mongoose.model("Labroom", LabroomSchema);

export default Labroom;
