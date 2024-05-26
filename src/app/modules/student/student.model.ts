import validator from 'validator';
import { Schema, model} from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, 'First name max length maximum 20 characters'],
    validate: {
      validator: function (value: string) {
        // Capitalize the first letter and compare
        const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
        return capitalizedValue === value;
      },
      message: '{VALUE} is not in capitalized format',
    },
  },
  middleName: {
    type: String,
    trim: true,
    maxlength: [20, 'Middle name max length maximum 20 characters'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is invalid',
    },
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [20, 'Last name max length maximum 20 characters'],
    validate: {
      validator: function (value: string) {
        // Capitalize the first letter and compare
        const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
        return capitalizedValue === value;
      },
      message: '{VALUE} is not in capitalized format',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required"],
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required"],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian's name is required"],
  },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required"],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required"],
  },
});

// const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({ this line for custom instance method 
const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: [true, 'ID is required'],
    unique: true,
  },
  user:{
    type: Schema.Types.ObjectId,
    required: [true, 'UserID is required'],
    unique: true,
    ref:'User'
  },

  name: {
    type: userNameSchema,
    required: [true, 'Name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is not a valid gender',
    },
    required: [true, 'Gender is required'],
  },
  dateOfBirth: {
    type: String,
    required: [true, 'Date of birth is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email',
    },
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
    required: [true, 'Blood group is required'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian information is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local guardian information is required'],
  },
  
  profileImg: {
    type: String,
  },
  isDeleted:{
    type:Boolean,
    default:false
  }
},{
  toJSON:{
    virtuals:true
  }
});

//virtual
studentSchema.virtual('fullName').get(function() {
  return `${this.name.firstName} ${this.name.middleName ? this.name.middleName + ' ' : ''}${this.name.lastName}`;
});





//query middleware
studentSchema.pre('find', function(next){
  this.find({isDeleted:{$ne:true}})
  next()

})
studentSchema.pre('findOne', function(next){
  this.find({isDeleted:{$ne:true}})
  next()

})
studentSchema.pre('aggregate', function(next){
 this.pipeline().unshift({$match:{isDeleted:{$ne:true}}})
  next()

})


//creating  a custom static method

studentSchema.statics.isStudentExist = async function(id:string){
  const existingStudent = await Student.findOne({id});

  return  existingStudent;
}

// creating a custom instance model 
// studentSchema.methods.isStudentExist = async function (id:string){
//   const existingUser = await Student.findOne({id})
  
//   return existingUser;
// }
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
