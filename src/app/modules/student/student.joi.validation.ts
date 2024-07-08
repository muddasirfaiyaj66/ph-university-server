import Joi from 'joi';

// Define the Joi schema for the UserName sub-document
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .pattern(/^[A-Z][a-z]*$/, 'capitalized format')
    .messages({
      'string.base': 'First name must be a string',
      'string.empty': 'First name is required',
      'string.max': 'First name max length maximum 20 characters',
      'string.pattern.name': 'First name is not in capitalized format',
    }),
  middleName: Joi.string()
    .trim()
    .max(20)
    .optional()
    .pattern(/^[a-zA-Z]*$/, 'alpha')
    .messages({
      'string.base': 'Middle name must be a string',
      'string.max': 'Middle name max length maximum 20 characters',
      'string.pattern.name': 'Middle name is invalid',
    }),
  lastName: Joi.string()
    .trim()
    .max(20)
    .required()
    .pattern(/^[A-Z][a-z]*$/, 'capitalized format')
    .messages({
      'string.base': 'Last name must be a string',
      'string.empty': 'Last name is required',
      'string.max': 'Last name max length maximum 20 characters',
      'string.pattern.name': 'Last name is not in capitalized format',
    }),
});

// Define the Joi schema for the Guardian sub-document
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.base': "Father's name must be a string",
    'string.empty': "Father's name is required",
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.base': "Father's occupation must be a string",
    'string.empty': "Father's occupation is required",
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.base': "Father's contact number must be a string",
    'string.empty': "Father's contact number is required",
  }),
  motherName: Joi.string().required().messages({
    'string.base': "Mother's name must be a string",
    'string.empty': "Mother's name is required",
  }),
  motherOccupation: Joi.string().required().messages({
    'string.base': "Mother's occupation must be a string",
    'string.empty': "Mother's occupation is required",
  }),
  motherContactNo: Joi.string().required().messages({
    'string.base': "Mother's contact number must be a string",
    'string.empty': "Mother's contact number is required",
  }),
});

// Define the Joi schema for the LocalGuardian sub-document
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': "Local guardian's name must be a string",
    'string.empty': "Local guardian's name is required",
  }),
  occupation: Joi.string().required().messages({
    'string.base': "Local guardian's occupation must be a string",
    'string.empty': "Local guardian's occupation is required",
  }),
  contactNo: Joi.string().required().messages({
    'string.base': "Local guardian's contact number must be a string",
    'string.empty': "Local guardian's contact number is required",
  }),
  address: Joi.string().required().messages({
    'string.base': "Local guardian's address must be a string",
    'string.empty': "Local guardian's address is required",
  }),
});

// Define the Joi schema for the main Student document
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.base': 'ID must be a string',
    'string.empty': 'ID is required',
  }),
  name: userNameValidationSchema.required().messages({
    'object.base': 'Name must be an object',
    'object.empty': 'Name is required',
  }),
  gender: Joi.string().valid('male', 'female').required().messages({
    'string.base': 'Gender must be a string',
    'string.empty': 'Gender is required',
    'any.only': '{#value} is not a valid gender',
  }),
  dateOfBirth: Joi.string().required().messages({
    'string.base': 'Date of birth must be a string',
    'string.empty': 'Date of birth is required',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email is required',
    'string.email': '{#value} is not a valid email',
  }),
  contactNo: Joi.string().required().messages({
    'string.base': 'Contact number must be a string',
    'string.empty': 'Contact number is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'string.base': 'Emergency contact number must be a string',
    'string.empty': 'Emergency contact number is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-')
    .required()
    .messages({
      'string.base': 'Blood group must be a string',
      'string.empty': 'Blood group is required',
      'any.only': '{#value} is not a valid blood group',
    }),
  presentAddress: Joi.string().required().messages({
    'string.base': 'Present address must be a string',
    'string.empty': 'Present address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.base': 'Permanent address must be a string',
    'string.empty': 'Permanent address is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'object.base': 'Guardian must be an object',
    'object.empty': 'Guardian information is required',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'object.base': 'Local guardian must be an object',
    'object.empty': 'Local guardian information is required',
  }),
  isActive: Joi.string().valid('active', 'inActive').required().messages({
    'string.base': 'Status must be a string',
    'string.empty': 'Status is required',
    'any.only': '{#value} is not a valid status',
  }),
  profileImg: Joi.string().optional().messages({
    'string.base': 'Profile image must be a string',
  }),
});

export default studentValidationSchema;
