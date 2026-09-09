import * as z from "zod";

const user = z.strictObject({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  birthDate: z.iso.date(),
});

export const createUser = user.safeExtend({
  username: z.string().nonempty().lowercase().max(15),
  email: z.email(),
  password: z
    .string()
    .nonempty()
    .min(8)
    .max(100)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .regex(/[^A-Za-z0-9]/),
});

export const updateUser = user
  .exactPartial()
  .refine((obj) => Object.values(obj).length > 0, {
    message: " You must provide at least one value to update user information",
  });
