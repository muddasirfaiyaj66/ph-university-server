import { Model, Types } from 'mongoose';

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TBloodGroup =
  | 'A+'
  | 'B+'
  | 'AB+'
  | 'O+'
  | 'A-'
  | 'B-'
  | 'AB-'
  | 'O-';

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TUserName;
  gender: 'male' | 'female';
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  isDeleted: boolean;
};

//for creating static

export interface StudentModel extends Model<TStudent> {
  // eslint-disable-next-line no-unused-vars
  isStudentExist(id: string): Promise<TStudent | null>;
}

//for creating custom instance
// export type StudentMethods = {
//   isStudentExist(id: string): Promise<TStudent | null> ;
// };

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;
