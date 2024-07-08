import { z } from 'zod';

// Define the Zod schema for the UserName sub-document
const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, { message: 'First name max length maximum 20 characters' })
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: 'First name is not in capitalized format',
      },
    ),
  middleName: z
    .string()
    .trim()
    .max(20, { message: 'Middle name max length maximum 20 characters' })
    .optional()
    .refine((value) => (value ? /^[a-zA-Z]*$/.test(value) : true), {
      message: 'Middle name is invalid',
    }),
  lastName: z
    .string()
    .trim()
    .max(20, { message: 'Last name max length maximum 20 characters' })
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: 'Last name is not in capitalized format',
      },
    ),
});

// Define the Zod schema for the Guardian sub-document
const createGuardianValidationSchema = z.object({
  fatherName: z.string({ message: "Father's name is required" }),
  fatherOccupation: z.string({ message: "Father's occupation is required" }),
  fatherContactNo: z.string({ message: "Father's contact number is required" }),
  motherName: z.string({ message: "Mother's name is required" }),
  motherOccupation: z.string({ message: "Mother's occupation is required" }),
  motherContactNo: z.string({ message: "Mother's contact number is required" }),
});

// Define the Zod schema for the LocalGuardian sub-document
const createLocalGuardianValidationSchema = z.object({
  name: z.string({ message: "Local guardian's name is required" }),
  occupation: z.string({ message: "Local guardian's occupation is required" }),
  contactNo: z.string({
    message: "Local guardian's contact number is required",
  }),
  address: z.string({ message: "Local guardian's address is required" }),
});

// Define the Zod schema for the main Student document
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['male', 'female'], {
        message: '{VALUE} is not a valid gender',
      }),
      dateOfBirth: z.string({ message: 'Date of birth is required' }),
      email: z
        .string({ message: 'Email is required' })
        .email({ message: '{VALUE} is not a valid email' }),
      contactNo: z.string({ message: 'Contact number is required' }),
      emergencyContactNo: z.string({
        message: 'Emergency contact number is required',
      }),
      bloodGroup: z.enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'], {
        message: '{VALUE} is not a valid blood group',
      }),
      presentAddress: z.string({ message: 'Present address is required' }),
      permanentAddress: z.string({ message: 'Permanent address is required' }),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
});
const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, { message: 'First name max length maximum 20 characters' })
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: 'First name is not in capitalized format',
      },
    )
    .optional(),
  middleName: z
    .string()
    .trim()
    .max(20, { message: 'Middle name max length maximum 20 characters' })
    .optional()
    .refine((value) => (value ? /^[a-zA-Z]*$/.test(value) : true), {
      message: 'Middle name is invalid',
    }),
  lastName: z
    .string()
    .trim()
    .max(20, { message: 'Last name max length maximum 20 characters' })
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: 'Last name is not in capitalized format',
      },
    )
    .optional(),
});

// Define the Zod schema for the Guardian sub-document
const updateGuardianValidationSchema = z.object({
  fatherName: z.string({ message: "Father's name is required" }).optional(),
  fatherOccupation: z
    .string({ message: "Father's occupation is required" })
    .optional(),
  fatherContactNo: z
    .string({ message: "Father's contact number is required" })
    .optional(),
  motherName: z.string({ message: "Mother's name is required" }).optional(),
  motherOccupation: z
    .string({ message: "Mother's occupation is required" })
    .optional(),
  motherContactNo: z
    .string({ message: "Mother's contact number is required" })
    .optional(),
});

// Define the Zod schema for the LocalGuardian sub-document
const updateLocalGuardianValidationSchema = z.object({
  name: z.string({ message: "Local guardian's name is required" }).optional(),
  occupation: z
    .string({ message: "Local guardian's occupation is required" })
    .optional(),
  contactNo: z
    .string({ message: "Local guardian's contact number is required" })
    .optional(),
  address: z
    .string({ message: "Local guardian's address is required" })
    .optional(),
});

// Define the Zod schema for the main Student document
const updateStudentValidationSchema = z.object({
  body: z
    .object({
      password: z.string().optional(),
      student: z
        .object({
          name: updateUserNameValidationSchema.optional(),
          gender: z
            .enum(['male', 'female'], {
              message: '{VALUE} is not a valid gender',
            })
            .optional(),
          dateOfBirth: z
            .string({ message: 'Date of birth is required' })
            .optional(),
          email: z
            .string({ message: 'Email is required' })
            .email({ message: '{VALUE} is not a valid email' })
            .optional(),
          contactNo: z
            .string({ message: 'Contact number is required' })
            .optional(),
          emergencyContactNo: z
            .string({ message: 'Emergency contact number is required' })
            .optional(),
          bloodGroup: z
            .enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'], {
              message: '{VALUE} is not a valid blood group',
            })
            .optional(),
          presentAddress: z
            .string({ message: 'Present address is required' })
            .optional(),
          permanentAddress: z
            .string({ message: 'Permanent address is required' })
            .optional(),
          guardian: updateGuardianValidationSchema.optional(),
          localGuardian: updateLocalGuardianValidationSchema.optional(),
          admissionSemester: z.string().optional(),
          academicDepartment: z.string().optional(),
          profileImg: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
});
export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
