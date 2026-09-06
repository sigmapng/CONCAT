import * as z from "zod";

const ticketCategory = z.strictObject({
  eventId: z.int().positive(),
  ticketName: z.string().nonempty(),
  price: z.int().positive(),
  totalAmount: z.int().positive(),
  available: z.int().min(0),
});
