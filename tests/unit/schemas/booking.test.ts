import { describe, expect, test } from "vitest";
import {
  createBooking,
  updateBooking,
} from "../../../src/schemas/booking.schema.js";

describe("Create booking schema", () => {
  test("accepts valid booking data", () => {
    const result = createBooking.safeParse({
      userId: 2,
      eventId: 3,
      bookingStatus: "Pending",
      ticketAmount: 6,
    });
    expect(result.success).toBe(true);
  });

  test("booking status accepts only 'pending' case doesnt matter", () => {
    const result = createBooking.safeParse({
      userId: 1,
      eventId: 5,
      bookingStatus: "pEnDiNg",
      ticketAmount: 3,
    });
    expect(result.success).toBe(true);
  });

  test("booking status rejects every status except for 'pending' case doesnt matter", () => {
    const result = createBooking.safeParse({
      userId: 1,
      eventId: 5,
      bookingStatus: "cancelled",
      ticketAmount: 3,
    });
    expect(result.success).toBe(false);
  });

  test("rejects more than 10 tickets in one booking", () => {
    const result = createBooking.safeParse({
      userId: 1,
      eventId: 5,
      bookingStatus: "pending",
      ticketAmount: 14,
    });
    expect(result.success).toBe(false);
  });

  test("rejects non numerical id values", () => {
    const result = createBooking.safeParse({
      userId: 1,
      eventId: "id",
      bookingStatus: "pending",
      ticketAmount: 9,
    });
    expect(result.success).toBe(false);
  });

  test("rejects without all required fields", () => {
    const result = createBooking.safeParse({
      userId: 1,
      eventId: 3,
      bookingStatus: "pending",
    });
    expect(result.success).toBe(false);
  });

  test("rejects extra keys", () => {
    const result = createBooking.safeParse({
      userId: 1,
      eventId: 5,
      bookingStatus: "pending",
      ticketAmount: 9,
      extraKey: true,
    });
    expect(result.success).toBe(false);
  });
});

describe("Update booking schema", () => {
  test("accepts if at least one value exists", () => {
    const result = updateBooking.safeParse({
      userId: 3,
    });
    expect(result.success).toBe(true);
  });

  test("accepts multiple values", () => {
    const result = updateBooking.safeParse({
      eventId: 5,
      ticketAmount: 1,
    });
    expect(result.success).toBe(true);
  });

  test("rejects empty objects", () => {
    const result = updateBooking.safeParse({});
    expect(result.success).toBe(false);
  });

  test("booking status accepts only pending | confirmed | cancelled | expired, case doesnt matter", () => {
    const result = updateBooking.safeParse({
      bookingStatus: "CAncElLed",
    });
    expect(result.success).toBe(true);
  });
});
