import * as z from "zod";

const ticketCategory = z.strictObject({
  eventId: z.int().positive(),
  ticketName: z.string().nonempty(),
  price: z.int().positive(),
  totalAmount: z.int().positive(),
  available: z.int().min(0),
});

export const createTicketCategory = ticketCategory.refine(
  (obj) => obj.totalAmount >= obj.available,
  {
    message:
      "Number of available tickets cannot be bigger than total amount of tickets",
  },
);

export const updateTicketCategory = ticketCategory
  .exactPartial()
  .refine((obj) => Object.values(obj).length > 0, {
    message:
      "You must provide at least one value to update ticket category information.",
  })
  .refine(
    (obj) => {
      if (
        typeof obj.totalAmount == "number" &&
        typeof obj.available == "number"
      ) {
        return obj.totalAmount >= obj.available;
      }
      return true;
    },
    {
      message:
        "Number of available tickets cannot be bigger than total amount of tickets",
    },
  );
