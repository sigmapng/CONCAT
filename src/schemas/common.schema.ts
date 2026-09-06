import * as z from "zod";

export const id = z.strictObject({ id: z.coerce.number() });
