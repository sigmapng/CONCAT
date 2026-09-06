import { describe, expect, test } from "vitest";
import { createEvents, updateEvents } from "../../src/schemas/events.schema.js";

describe("Create events schema", () => {
  test("accepts valid event data", () => {
    const result = createEvents.safeParse({
      venueId: 2,
      eventName: "Test event",
      artistName: "Testing",
      minAge: 12,
      startingTime: "18:30",
      eventDate: "2026-05-08",
      minTicketPrice: 500,
      maxTicketPrice: 1000,
    });
    expect(result.success).toBe(true);
  });

  test("accepts equal min and max ticket price", () => {
    const result = createEvents.safeParse({
      venueId: 2,
      eventName: "Test event",
      artistName: "Testing",
      minAge: 12,
      startingTime: "18:30",
      eventDate: "2026-05-08",
      minTicketPrice: 500,
      maxTicketPrice: 500,
    });
    expect(result.success).toBe(true);
  });

  test("rejects non numerical venueId", () => {
    const result = createEvents.safeParse({
      venueId: "id",
      eventName: "Test event",
      artistName: "Testing",
      minAge: 12,
      startingTime: "18:30",
      eventDate: "2026-05-08",
      minTicketPrice: 200,
      maxTicketPrice: 400,
    });
    expect(result.success).toBe(false);
  });

  test("rejects if min ticket price is bigger than max", () => {
    const result = createEvents.safeParse({
      venueId: 2,
      eventName: "Test event",
      artistName: "Testing",
      minAge: 12,
      startingTime: "18:30",
      eventDate: "2026-05-08",
      minTicketPrice: 2000,
      maxTicketPrice: 400,
    });
    expect(result.success).toBe(false);
  });

  test("rejects negative ticket price values", () => {
    const result = createEvents.safeParse({
      venueId: 2,
      eventName: "Test event",
      artistName: "Testing",
      minAge: 12,
      startingTime: "18:30",
      eventDate: "2026-05-08",
      minTicketPrice: -100,
      maxTicketPrice: -100,
    });
    expect(result.success).toBe(false);
  });

  test("rejects without all required fields", () => {
    const result = createEvents.safeParse({
      artistName: "Testing",
      minTicketPrice: 200,
      maxTicketPrice: 300,
    });
    expect(result.success).toBe(false);
  });

  test("rejects extra keys", () => {
    const result = createEvents.safeParse({
      venueId: 2,
      eventName: "Test event",
      artistName: "Testing",
      minAge: 12,
      startingTime: "18:30",
      eventDate: "2026-05-08",
      minTicketPrice: 500,
      maxTicketPrice: 1000,
      extraKey: true,
    });
    expect(result.success).toBe(false);
  });
});

describe("Update events schema", () => {
  test("accepts if at least one value exists", () => {
    const result = updateEvents.safeParse({
      eventDate: "2026-01-01",
    });
    expect(result.success).toBe(true);
  });

  test("accepts multiple values", () => {
    const result = updateEvents.safeParse({
      artistName: "New name",
      startingTime: "17:30",
    });
    expect(result.success).toBe(true);
  });

  test("accepts one ticket price value", () => {
    const result = updateEvents.safeParse({
      maxTicketPrice: 500,
    });
    expect(result.success).toBe(true);
  });

  test("rejects empty objects", () => {
    const result = updateEvents.safeParse({});
    expect(result.success).toBe(false);
  });

  test("rejects if ticket price is undefined", () => {
    const result = updateEvents.safeParse({
      minTicketPrice: undefined,
      maxTicketPrice: 300,
    });
    expect(result.success).toBe(false);
  });

  test("rejects null values", () => {
    const result = updateEvents.safeParse({
      maxTicketPrice: null,
    });
    expect(result.success).toBe(false);
  });
});
