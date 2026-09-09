import * as z from "zod";

const createTicketStatusEnum = z.enum(["valid"]);

const updateTicketStatusEnum = z.enum(["valid", "used", "cancelled"]);

const ticket = z.strictObject({
  bookingId: z.int().positive(),
  ticketCategoryId: z.int().positive(),
  qrCode: z.string().nonempty(),
});

export const createTicket = ticket.safeExtend({
  ticketStatus: z.preprocess(
    (val) => (typeof val === "string" ? val.toLowerCase() : val),
    createTicketStatusEnum,
  ),
});

export const updateTicket = z
  .strictObject({
    ticketStatus: z
      .preprocess(
        (val) => (typeof val === "string" ? val.toLowerCase() : val),
        updateTicketStatusEnum,
      )
      .optional(),
  })
  .refine((obj) => Object.values(obj).length > 0, {
    message:
      "You must provide at least one value to update ticket information.",
  });
