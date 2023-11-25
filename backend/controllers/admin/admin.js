import express from "express";
import {
  createlabroom,
  updatelabroom,
  deletelabroom,
  addinstructor,
  deleteinstructor,
  getallinstructors,
  getusercount,
  getalllabrooms,
  getlabroomcount,
  getallstudents,
  deletestudent,
  updatestudent,
} from "../../services/admin/admin.js";

const router = express.Router();

//assign instructor to labroom
router.post("/createnew", createlabroom);

//update labroom
router.put("/update/:id", updatelabroom);

//delete labrrom
router.delete("/delete/:id", deletelabroom);

// add instructor to application
router.post("/addinstructor", addinstructor);

//delete instructor from application
router.delete("/deleteinstructor/:id", deleteinstructor);

//get all instructors
router.get("/getallinstructors", getallinstructors);

//get user count seperated by role
router.get("/getusercount", getusercount);

//get all labrooms
router.get("/getalllabrooms", getalllabrooms);

//get labroom count
router.get("/getlabroomcount", getlabroomcount);

//get all the students
router.get("/getallstudents", getallstudents);

//delete student
router.delete("/deletestudent/:id", deletestudent);

//update student data
router.put("/updatestudent/:id", updatestudent);

export default router;
