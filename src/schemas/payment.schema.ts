import * as z from "zod";

const payment = z.strictObject({
  bookingId: z.int().positive(),
  method: z.string().nonempty(),
  checkoutAmount: z.int().positive(),
  paymentStatus: z.enum(["pending", "succeeded", "failed"]),
});
