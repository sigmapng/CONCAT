import * as z from "zod";

const events = z.strictObject({
  venueId: z.int().positive(),
  eventName: z.string().nonempty(),
  artistName: z.string().nonempty(),
  minAge: z.int().positive(),
  startingTime: z.iso.time({ precision: -1 }),
  eventDate: z.iso.date(),
  minTicketPrice: z.int().positive(),
  maxTicketPrice: z.int().positive(),
});

export const createEvents = events.refine(
  (obj) => obj.minTicketPrice <= obj.maxTicketPrice,
  {
    message:
      "Minimal ticket price cannot be bigger or equal to maximum ticket price",
  },
);

export const updateEvents = events
  .exactPartial()
  .refine((obj) => Object.values(obj).length > 0, {
    message: "You must provide at least one value to update event information.",
  })
  .refine(
    (obj) => {
      if (
        typeof obj.minTicketPrice == "number" &&
        typeof obj.maxTicketPrice == "number"
      ) {
        return obj.minTicketPrice <= obj.maxTicketPrice;
      }
      return true;
    },
    {
      message:
        "Minimal ticket price cannot be bigger or equal to maximum ticket price",
    },
  );
