import * as z from "zod";

const createPaymentStatusEnum = z.enum(["pending"]);

const updatePaymentStatusEnum = z.enum(["pending", "succeeded", "failed"]);

const payment = z.strictObject({
  bookingId: z.int().positive(),
  method: z.string().nonempty(),
});

export const createPayment = payment.safeExtend({
  paymentStatus: z.preprocess(
    (val) => (typeof val === "string" ? val.toLowerCase() : val),
    createPaymentStatusEnum,
  ),
  checkoutAmount: z.int().positive(),
});

export const updatePayment = z
  .strictObject({
    bookingId: z.int().positive().optional(),
    method: z.string().nonempty().optional(),
    paymentStatus: z
      .preprocess(
        (val) => (typeof val === "string" ? val.toLowerCase() : val),
        updatePaymentStatusEnum,
      )
      .optional(),
  })
  .refine((obj) => Object.values(obj).length > 0, {
    message:
      "You must provide at least one value to update payment information.",
  });
