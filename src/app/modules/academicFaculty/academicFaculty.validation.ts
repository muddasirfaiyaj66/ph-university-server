import { z } from 'zod';

const academicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Academic Faculty Name is Required',
    }),
  }),
});

export const AcademicFacultyValidations = {
  academicFacultyValidationSchema,
};
