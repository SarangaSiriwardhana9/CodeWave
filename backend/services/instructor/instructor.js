import User from "../../models/Users/user.js";
import EnrolledLab from "../../models/Users/enrolledlab.js";

export const updateinstructor = async (req, res, next) => {
    const { id } = req.params;
  
    //update instructor
    const updatedata = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        contact: req.body.contact,
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

  export const getenrolledstudents = async (req, res, next) => {
    const { id } = req.params;

    //get completed labs
    const completed = await EnrolledLab.find({
      labId: id
    });
    
    if (!completed) {
      return res.status(404).json("not found");
    }else{
      return res.status(200).json(completed);
    }
  }
