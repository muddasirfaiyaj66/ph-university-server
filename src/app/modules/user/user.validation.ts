import { z } from 'zod';

const userSchemaValidation = z.object({
  password: z
    .string({
      invalid_type_error: 'Password Must be String',
    })
    .max(20, { message: 'Password can not be more than 20 character' })
    .optional(),
});

export const UserValidation = {
  userSchemaValidation,
};
