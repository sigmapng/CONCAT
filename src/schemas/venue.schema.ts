import * as z from "zod";

export const createVenue = z.strictObject({
  venueName: z.string().nonempty().max(50),
  venueAddress: z.string().nonempty(),
  openingTime: z.iso.time({ precision: -1 }),
  closingTime: z.iso.time({ precision: -1 }),
  capacity: z.int().positive(),
});

export const updateVenue = createVenue
  .exactPartial()
  .refine((obj) => Object.values(obj).length > 0, {
    message: "You must provide at least one value to update venue information.",
  });
