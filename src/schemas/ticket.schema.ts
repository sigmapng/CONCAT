import * as z from "zod";

const ticket = z.strictObject({
  bookingId: z.int().positive(),
  ticketCategoryId: z.int().positive(),
  qrCode: z.string().nonempty(),
  ticketStatus: z.enum(["valid", "used", "cancelled"]),
});
