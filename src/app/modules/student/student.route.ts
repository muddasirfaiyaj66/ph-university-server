import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentControllers } from './student.controller';
import { studentValidations } from './student.validation';
import auth from '../../middlewares/auth';


const router = express.Router();

router.get('/',auth('admin','faculty'), StudentControllers.getAllStudents);

router.get('/:id', StudentControllers.getSingleStudent);

router.patch(
  '/:id',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete('/:id',auth('admin'), StudentControllers.deleteSingleStudent);

export const StudentRoutes = router;