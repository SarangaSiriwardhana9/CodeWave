import express from "express";
import {
  updatelabroom,
  deletelabroom,
  getalllabrooms,
  getlabroombyid,
} from "../../services/labroom/labroom.js";

const router = express.Router();


//update labroom
router.put("/update/:id", updatelabroom);
//delete labrrom
router.delete("/delete/:id", deletelabroom);

//get all labrooms
router.get("/getall/:id", getalllabrooms);

//get labroom by id
router.get("/getlab/:id", getlabroombyid);

export default router;

