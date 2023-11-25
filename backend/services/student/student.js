import Labroom from "../../models/Labroom/labroom.js";
import User from "../../models/Users/user.js";
import EnrolledLab from "../../models/Users/enrolledlab.js";
import { createError } from "../../utils/error.js";

export const enroll = async (req, res, next) => {
  const { key } = req.params;

  try {
    const labroom = await Labroom.findOne({ enrollmentkey: key });

    if (!labroom) {
      return next(createError(404, "Labroom not found"));
    }

    res.status(200).json(labroom);
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};

export const updatestudent = async (req, res, next) => {
  const { id } = req.params;

  //update instructor
  const updatedata = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    contactNumber: req.body.contactNumber,
    profilePicture: req.body.profilePicture,
  };

  const update = User.findByIdAndUpdate(id, updatedata, { new: true })
    .then((update) => {
      res.status(200).json(update);
    })
    .catch((err) => {
      res.status(500).json("not found");
    });
};

//check if enrollment key is valid
export const checkenroll = async (req, res, next) => {
  const { key } = req.params;

  //check if enrollment key is valid
  const labroom = await Labroom.findOne({ enrollmentkey: key });

  if (!labroom) {
    return res.status(200).json("invalid");
  } else {
    //check enrollment lab already exists
    const enrolledlab = await EnrolledLab.findOne({
      labId: labroom._id,
      studentId: req.body.studentId,
    });

    if (!enrolledlab) {
      //save enrolled lab
      const enrolledlab = new EnrolledLab({
        studentId: req.body.studentId,
        labId: labroom._id,
        name: labroom.name,
        description: labroom.description,
        instructoremail: labroom.instructoremail,
        labdate: labroom.labdate,
        status: "pending",
      });
      enrolledlab.save();
    } else {
      //check if student already completed the lab
      if (enrolledlab.status == "completed") {
        return res.status(200).json("completed");
      }
    }

    return res.status(200).json("valid");
  }

  // if (labroom) {
  //   //check if student already completed the lab
  //   const enrolledlab = await EnrolledLab.findOne({
  //     labId: labroom._id,
  //     studentId: req.body.studentId,
  //   });

  //   //check status of enrolled lab is completed
  //   if (enrolledlab && enrolledlab.status == "completed") {
  //     return res.status(200).json("completed");
  //   }else{
  //     if (labroom || enrolledlab.status != "completed") {

  //       // check if enrolledLab already exists
  //       const enrolledlabalready = await EnrolledLab.findOne({
  //         labId: labroom._id,
  //         studentId: req.body.studentId,
  //       });

  //       // if (enrolledlabalready) {
  //       //   return res.status(200).json("already");
  //       // }
  //       // else{
  //       //   //save enrolled lab
  //       //   const enrolledlab = new EnrolledLab({
  //       //     studentId: req.body.studentId,
  //       //     labId: labroom._id,
  //       //     name: labroom.name,
  //       //     description: labroom.description,
  //       //     instructoremail: labroom.instructoremail,
  //       //     labdate: labroom.labdate,
  //       //     status: "pending",
  //       //   });
  //       //   enrolledlab.save();
  //       // }

  //       // const enrolledlab = new EnrolledLab({
  //       //   studentId: req.body.studentId,
  //       //   labId: labroom._id,
  //       //   name: labroom.name,
  //       //   description: labroom.description,
  //       //   instructoremail: labroom.instructoremail,
  //       //   labdate: labroom.labdate,
  //       //   status: "pending",
  //       // });
  //       // enrolledlab.save();
  //     }

  //     if (labroom) {
  //       return res.status(200).json("valid");
  //     }
  //   }
  // }
};

//update enrolled lab status
export const updatestatus = async (req, res, next) => {
  const { studentId } = req.params;
  const labId = req.body.labId;

  //find releavnat enrolledlab by labId  and student id
  const enrolledlab = await EnrolledLab.findOne({
    labId: labId,
    studentId: studentId,
  });

  if (!enrolledlab) {
    return next(createError(404, "Enrolled lab not found"));
  }

  //update status
  const status = "completed";

  const update = EnrolledLab.findByIdAndUpdate(
    enrolledlab._id,
    { status: status },
    { new: true }
  )
    .then((update) => {
      res.status(200).json(update);
    })
    .catch((err) => {
      res.status(500).json("not found");
    });
};

//get enrolled labs by student id
export const getenrolledlabs = async (req, res, next) => {
  const { studentId } = req.params;

  //find all enrolled labs by student id
  const enrolledlabs = await EnrolledLab.find({ studentId: studentId });

  if (!enrolledlabs) {
    return next(createError(404, "Enrolled labs not found"));
  }

  res.status(200).json(enrolledlabs);
};
