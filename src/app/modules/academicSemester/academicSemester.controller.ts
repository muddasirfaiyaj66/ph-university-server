import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterServices } from "./academicSemester.service";




const createAcademicSemester = catchAsync(async(req,res)=>{

    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Academic semester is created Successfully!",
        data:result
    })

});
const getAcademicSemester = catchAsync(async(req,res)=>{
    const result = await AcademicSemesterServices.getAcademicSemesterFromDB();
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Academic Semesters is retrieved successfully",
        data:result
    })
})
const getAcademicSemesterByID = catchAsync(async(req,res)=>{
    const {semesterId} =req.params;
    const result = await AcademicSemesterServices.getAcademicSemesterFromDbByID(semesterId);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Academic Semester is retrieved successfully",
        data:result
    })
})

const updateAcademicSemester = catchAsync(async(req,res)=>{
    const {semesterId}= req.params;
    const updateData = req.body;
    const result = await AcademicSemesterServices.updateAcademicSemesterIntoDb(semesterId,updateData);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Academic Semester is updated successfully",
        data:result
    })
})


export const AcademicSemesterControllers ={
    createAcademicSemester,
    getAcademicSemester,
    getAcademicSemesterByID,
    updateAcademicSemester
}