import express from "express";
import { updateinstructor, getenrolledstudents } from "../../services/instructor/instructor.js";

const router = express.Router();

//update instructor data
router.put("/update/:id", updateinstructor);

//get enrolled students list
router.get("/enrolled/count/:id", getenrolledstudents);
export default router;