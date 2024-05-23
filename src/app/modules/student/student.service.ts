import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {

  if(await Student.isStudentExist(studentData.id)){
    throw new  Error ("User already exists")
  }
  const result = await Student.create(studentData);//build in static method
  // const student = new Student(studentData); //creating an instance

  // if(await student.isStudentExist(studentData.id)){
  //   throw new  Error ("User already exists")
  // }

  // const result = await student.save(); //build in instant method

  
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudentsFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });

  const result = await Student.aggregate([
    {$match:{id:id}}
  ])
  return result;
};
const deleteSingleStudentsFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, {isDeleted:true});
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteSingleStudentsFromDB
};
