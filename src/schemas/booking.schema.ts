import * as z from "zod";

const createBookingStatusEnum = z.enum(["pending"]);

const updateBookingStatusEnum = z.enum([
  "pending",
  "confirmed",
  "cancelled",
  "expired",
]);

const booking = z.strictObject({
  userId: z.int().positive(),
  eventId: z.int().positive(),
  ticketAmount: z.int().positive().max(10),
});

export const createBooking = booking.safeExtend({
  bookingStatus: z.preprocess(
    (val) => (typeof val === "string" ? val.toLowerCase() : val),
    createBookingStatusEnum,
  ),
});

export const updateBooking = z
  .strictObject({
    userId: z.int().positive().optional(),
    eventId: z.int().positive().optional(),
    ticketAmount: z.int().positive().max(10).optional(),
    bookingStatus: z
      .preprocess(
        (val) => (typeof val === "string" ? val.toLowerCase() : val),
        updateBookingStatusEnum,
      )
      .optional(),
  })
  .refine((obj) => Object.values(obj).length > 0, {
    message: "You must provide at least one value to update event information.",
  });
