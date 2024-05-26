import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, Student: studentData } = req.body;
    //data validation using zod

    // const {error,value}= studentValidationSchema.validate(studentData)
    // const zodParseData = studentValidationSchema.parse(studentData)
    // console.log(error,value);
    const result = await UserService.createStudentIntoDB(password, studentData);
    // if(error){
    //   res.status(500).json({
    //     success: false,
    //     message: 'something Went wrong',
    //     error:error.details
    //   });
    // }

    //will call service function to send this data

    //send response
    // res.status(200).json({
    //   success: true,
    //   message: 'Student is created successfully',
    //   data: result,
    // });
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:'Student is created successfully',
      data:result
    })
  } catch (err) {
    next(err);
  }
};

export const UserController = {
  createStudent,
};
