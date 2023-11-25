import Labroom from "../../models/Labroom/labroom.js";
import { createError } from "../../utils/error.js";


//update labroom
export const updatelabroom = async (req, res, next) => {
  const { id } = req.params;

  //update labroom
  const updatelab = {
    name: req.body.name,
    description: req.body.description,
    capacity: req.body.capacity,
    enrollmentkey: req.body.enrollmentkey,
    instructorname: req.body.instructorname,
    instructoremail: req.body.instructoremail,
    labdate: req.body.labdate,
    step: req.body.step,
    meetinglink: req.body.meetinglink,
  };
  const update = Labroom.findByIdAndUpdate(id, updatelab, { new: true })
    .then((update) => {
      res.status(200).json(update);
    })
    .catch((err) => {
      res.status(500).json("not found");
    });
};
//delete labroom
export const deletelabroom = async (req, res, next) => {
  try {
  const { id } = req.params;
  const deletelab = await Labroom.findByIdAndDelete(id);
  res.status(200).send("labroom deleted");
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};

//get all labrooms
export const getalllabrooms = async (req, res, next) => {

  try {
  const { id } = req.params;
    const labroom = await Labroom.find({instructoremail: id});
    if(!labroom){
        return res.status(404).send("Labroom not found");
    }
    res.status(200).json(labroom);
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};

//get labroom by id
export const getlabroombyid = async (req, res, next) => {
  try {
    const { id } = req.params;
    const labroom = await Labroom.findById(id);
    res.status(200).json(labroom);
  } catch (error) {
    next(createError(500, "labroom not found"));
  }

};
