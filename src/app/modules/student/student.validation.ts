import { optional } from 'joi';
import { z } from 'zod';

// Define the Zod schema for the UserName sub-document
const userNameValidationSchema = z.object({
  firstName: z.string()
    .trim()
    .max(20, { message: 'First name max length maximum 20 characters' })
    .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, {
      message: 'First name is not in capitalized format'
    }),
    middleName: z.string()
    .trim()
    .max(20, { message: 'Middle name max length maximum 20 characters' })
    .optional()
    .refine(value => (value ? /^[a-zA-Z]*$/.test(value) : true), {
      message: 'Middle name is invalid'
    }),
  lastName: z.string()
    .trim()
    .max(20, { message: 'Last name max length maximum 20 characters' })
    .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, {
      message: 'Last name is not in capitalized format'
    })
});

// Define the Zod schema for the Guardian sub-document
const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty({ message: "Father's name is required" }),
  fatherOccupation: z.string().nonempty({ message: "Father's occupation is required" }),
  fatherContactNo: z.string().nonempty({ message: "Father's contact number is required" }),
  motherName: z.string().nonempty({ message: "Mother's name is required" }),
  motherOccupation: z.string().nonempty({ message: "Mother's occupation is required" }),
  motherContactNo: z.string().nonempty({ message: "Mother's contact number is required" }),
});

// Define the Zod schema for the LocalGuardian sub-document
const localGuardianValidationSchema = z.object({
  name: z.string().nonempty({ message: "Local guardian's name is required" }),
  occupation: z.string().nonempty({ message: "Local guardian's occupation is required" }),
  contactNo: z.string().nonempty({ message: "Local guardian's contact number is required" }),
  address: z.string().nonempty({ message: "Local guardian's address is required" }),
});

// Define the Zod schema for the main Student document
const studentValidationSchema = z.object({
  id: z.string().nonempty({ message: 'ID is required' }),
  password:z.string(),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female'], { message: '{VALUE} is not a valid gender' }),
  dateOfBirth: z.string().nonempty({ message: 'Date of birth is required' }),
  email: z.string()
    .nonempty({ message: 'Email is required' })
    .email({ message: '{VALUE} is not a valid email' }),
  contactNo: z.string().nonempty({ message: 'Contact number is required' }),
  emergencyContactNo: z.string().nonempty({ message: 'Emergency contact number is required' }),
  bloodGroup: z.enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'], { message: '{VALUE} is not a valid blood group' }),
  presentAddress: z.string().nonempty({ message: 'Present address is required' }),
  permanentAddress: z.string().nonempty({ message: 'Permanent address is required' }),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  isActive: z.enum(['active', 'inActive'], { message: '{VALUE} is not a valid status' }).default('active'),
  profileImg: z.string().optional(),
  isDeleted:z.boolean().optional()
});


export default studentValidationSchema;