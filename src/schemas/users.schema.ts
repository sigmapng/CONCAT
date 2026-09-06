import * as z from "zod";

const users = z.strictObject({
  username: z.string().nonempty().lowercase().max(15),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
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
  birthDate: z.iso.date(),
});
