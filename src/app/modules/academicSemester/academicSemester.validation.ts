import { z } from 'zod';

import {
  academicSemesterCode,
  academicSemesterName,
  months,
} from './academicSemester.constant';

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...academicSemesterName] as [string, ...string[]], {
      required_error: 'Semester name is required',
    }),
    code: z.enum([...academicSemesterCode] as [string, ...string[]], {
      required_error: 'Semester code is required',
    }),
    year: z.string({
      required_error: 'Year is required',
    }),
    startMonth: z.enum([...months] as [string, ...string[]], {
      required_error: 'Start month is required',
    }),
    endMonth: z.enum([...months] as [string, ...string[]], {
      required_error: 'End month is required',
    }),
  }),
});
const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...academicSemesterName] as [string, ...string[]]).optional(),
    code: z.enum([...academicSemesterCode] as [string, ...string[]]).optional(),
    year: z.string().optional(),
    startMonth: z.enum([...months] as [string, ...string[]]).optional(),
    endMonth: z.enum([...months] as [string, ...string[]]).optional(),
  }),
});
export const AcademicSemesterValidations = {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
};
