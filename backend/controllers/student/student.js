import express from 'express';
import { enroll ,updatestudent,  checkenroll,updatestatus,getenrolledlabs} from '../../services/student/student.js';

const router = express.Router();

//enroll by key 
router.get('/enroll/:key', enroll);

//check if enrollment key is valid
router.post('/enroll/check/:key', checkenroll);

//update student data
router.put("/update/:id", updatestudent);

//update enrolled lab status
router.put("/enroll/updatestatus/:studentId", updatestatus);

//get enrolled labs by student id
router.get("/enroll/lab/student/:studentId", getenrolledlabs);

export default router;