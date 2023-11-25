import Labroom from "../../models/Labroom/labroom.js";
import User from "../../models/Users/user.js";
import { hashPassword } from "../../services/authservice/auth.js";
import { createError } from "../../utils/error.js"; // Import your custom error handler

// Create a new labroom
export const createlabroom = async (req, res, next) => {
  try {
    const {
      name,
      description,
      capacity,
      enrollmentkey,
      instructorname,
      instructoremail,
      labdate,
      step,
      meetinglink
    } = req.body;

    const newLabroom = new Labroom({
      name,
      description,
      capacity,
      enrollmentkey,
      instructorname,
      instructoremail,
      labdate,
      step,
      meetinglink
    });

    await newLabroom.validate();
    const savedLabroom = await newLabroom.save();

    res.status(200).json(savedLabroom);
  } catch (error) {
    const errorMessages = [];

    if (error.errors) {
      for (const key in error.errors) {
        if (error.errors.hasOwnProperty(key)) {
          errorMessages.push(error.errors[key].message);
        }
      }
    } else {
      errorMessages.push(error.message);
    }

    // Use your custom error handler to create and pass the error
    next(createError(400, errorMessages.join(", "))); // Pass a combined error message
  }
};

// Update labroom
export const updatelabroom = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatelab = {
      name: req.body.name,
      description: req.body.description,
      capacity: req.body.capacity,
      enrollmentkey: req.body.enrollmentkey,
      instructorname: req.body.instructorname,
      instructoremail: req.body.instructoremail,
      labdate: req.body.labdate,
      step: req.body.step,
      meetinglink: req.body.meetinglink
    };

    const update = await Labroom.findByIdAndUpdate(id, updatelab, { new: true });

    if (!update) {
      // Use your custom error handler to create and pass the error
      return next(createError(404, "Labroom not found"));
    }

    res.status(200).json(update);
  } catch (error) {
    // Use your custom error handler to create and pass the error
    next(createError(500, "Internal server error"));
  }
};

// Delete labroom
export const deletelabroom = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletelab = await Labroom.findByIdAndDelete(id);

    if (!deletelab) {
      // Use your custom error handler to create and pass the error
      return next(createError(404, "Labroom not found"));
    }

    res.status(200).send("Labroom deleted");
  } catch (error) {
    // Use your custom error handler to create and pass the error
    next(createError(500, "Internal server error"));
  }
};

// Add a new instructor
export const addinstructor = async (req, res, next) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // Use your custom error handler to create and pass the error
      return next(createError(400, "Email already exists"));
    }

    const hashedPassword = await hashPassword(req.body.password);
    const newUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role || "instructor",
      contact: req.body.contact,
      profilePicture: req.body.profilePicture,
    };

    const result = await User.create(newUser);
    res.json(result);
  } catch (error) {
    // Use your custom error handler to create and pass the error
    next(createError(500, "Internal server error"));
  }
};

// Delete an instructor
export const deleteinstructor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await User.findByIdAndDelete(id);

    if (!result) {
      // Use your custom error handler to create and pass the error
      return next(createError(404, "User not found"));
    }

    res.send("User deleted");
  } catch (error) {
    // Use your custom error handler to create and pass the error
    next(createError(500, "Internal server error"));
  }

};

// Get all instructors
export const getallinstructors = async (req, res, next) => {
  try {
    const result = await User.find({ role: "instructor" });
    res.json(result);
  } catch (error) {
    // Use your custom error handler to create and pass the error
    next(createError(500, "Internal server error"));
  }
}


//get user count seperated by role
export const getusercount = async (req, res, next) => {
  try {
    const result = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
    ]);
    res.json(result);
  } catch (error) {
    // Use your custom error handler to create and pass the error
    next(createError(500, "Internal server error"));
  }
}

//get all labrooms
export const getalllabrooms = async (req, res, next) => {
  try {
    const result = await Labroom.find({});
    res.json(result);
  } catch (error) {
    // Use your custom error handler to create and pass the error
    next(createError(500, "Internal server error"));
  }
}

// Get total labroom count
export const getlabroomcount = async (req, res, next) => {
  try {
    const count = await Labroom.countDocuments();
    res.json({ count });
  } catch (error) {
    // Use your custom error handler to create and pass the error
    next(createError(500, "Internal server error"));
  }
};

// Get all students
export const getallstudents = async (req, res, next) => {
  try {
    const result = await User.find({ role: "student" });
    res.json(result);
  } catch (error) {
    // Use your custom error handler to create and pass the error
    next(createError(500, "Internal server error"));
  }
}

// Delete a student
export const deletestudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await User.findByIdAndDelete(id);

    if (!result) {
      // Use your custom error handler to create and pass the error
      return next(createError(404, "User not found"));
    }

    res.send("User deleted");
  } catch (error) {
    // Use your custom error handler to create and pass the error
    next(createError(500, "Internal server error"));
  }

}

// Update student data
export const updatestudent = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatestudent = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role || "student",
      contact: req.body.contact,
      profilePicture: req.body.profilePicture,
    };

    const update = await User.findByIdAndUpdate(id, updatestudent, { new: true });

    if (!update) {
      // Use your custom error handler to create and pass the error
      return next(createError(404, "User not found"));
    }

    res.status(200).json(update);
  } catch (error) {
    // Use your custom error handler to create and pass the error
    next(createError(500, "Internal server error"));
  }
}