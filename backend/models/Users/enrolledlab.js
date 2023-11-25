import mongoose from "mongoose";

const EnrolledLabSchema = new mongoose.Schema({

    studentId: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    labId: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    description: {
        type: String,
        required: false,
        trim: true,
        minlength: 3,
    },
    instructoremail: {
        type: String,
        required: true,
        trim: true,
    },
    labdate: {
        type: Date, // Assuming labdate is a Date
        required: false,
    },
    status: {
        type: String,
        required: false,
        trim: true,
        minlength: 3,
        maxlength: 20,
    },

}, { timestamps: true });

const EnrolledLab = mongoose.model("EnrolledLab", EnrolledLabSchema);

export default EnrolledLab;