import { Request, Response } from 'express';
import { StudentServices } from './student.service';
// import Joi from 'joi';
import studentValidationSchema from './student.validation';
// import studentValidationSchema from './student.joi.validation';
const createStudent = async (req: Request, res: Response) => {
  try {
    
    const { Student: studentData } = req.body;
    //data validation using zod 

    // const {error,value}= studentValidationSchema.validate(studentData)
    const zodParseData = studentValidationSchema.parse(studentData)
    // console.log(error,value);
    const result = await StudentServices.createStudentIntoDB(zodParseData);
    // if(error){
    //   res.status(500).json({
    //     success: false,
    //     message: 'something Went wrong',
    //     error:error.details
    //   });
    // }
    


    
    //will call service function to send this data
   

    //send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err:any) {
    res.status(500).json({
      success: false,
      message:err.message ||  'something Went wrong',
      data: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    //send response
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } catch (err:any) {
    res.status(500).json({
      success: false,
      message:err.message ||  'something Went wrong',
      data: err,
    });
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentsFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
  } catch (err:any) {
    res.status(500).json({
      success: false,
      message:err.message ||  'something Went wrong',
      data: err,
    });
  }
};
const deleteSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteSingleStudentsFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is deleted successfully',
      data: result,
    });
  } catch (err:any) {
    res.status(500).json({
      success: false,
      message:err.message ||  'something Went wrong',
      data: err,
    });
  }
};
export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent
};
