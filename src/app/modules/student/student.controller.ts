
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

// import Joi from 'joi';
// import studentValidationSchema from './student.validation';
// import studentValidationSchema from './student.joi.validation';



const getAllStudents = catchAsync(async (req, res) => {
  
    const result = await StudentServices.getAllStudentsFromDB();

    //send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
 
});
const getSingleStudent=catchAsync( async (req, res) => {
 
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentsFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrieved successfully',
    data: result,
  });

});
const deleteSingleStudent = catchAsync(async (req, res) => {
  
  const { studentId } = req.params;
  const result = await StudentServices.deleteSingleStudentsFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is deleted successfully',
    data: result,
  });

});
export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};