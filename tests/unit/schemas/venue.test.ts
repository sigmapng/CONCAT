import { describe, expect, test } from "vitest";
import { createVenue, updateVenue } from "../../../src/schemas/venue.schema.js";

describe("Create venue schema", () => {
  test("accept valid venue data", () => {
    const result = createVenue.safeParse({
      venueName: "Test name",
      venueAddress: "Test address",
      openingTime: "09:00",
      closingTime: "17:30",
      capacity: 100,
    });
    expect(result.success).toBe(true);
  });

  test("rejects empty values", () => {
    const result = createVenue.safeParse({
      venueName: "",
      venueAddress: "Test address",
      openingTime: "09:00",
      closingTime: "17:30",
      capacity: 100,
    });
    expect(result.success).toBe(false);
  });

  test("rejects negative capacity", () => {
    const result = createVenue.safeParse({
      venueName: "Test name",
      venueAddress: "Test address",
      openingTime: "09:00",
      closingTime: "17:30",
      capacity: -100,
    });
    expect(result.success).toBe(false);
  });

  test("rejects without all required fields", () => {
    const result = createVenue.safeParse({
      openingTime: "09:00",
      closingTime: "17:30",
      capacity: 100,
    });
    expect(result.success).toBe(false);
  });

  test("rejects schema incorrect values", () => {
    const result = createVenue.safeParse({
      capacity: -30,
    });
    expect(result.success).toBe(false);
  });

  test("rejects explicit undefined value", () => {
    const result = createVenue.safeParse({
      venueAddress: undefined,
    });
    expect(result.success).toBe(false);
  });

  test("rejects null value", () => {
    const result = createVenue.safeParse({
      venueAddress: null,
    });
    expect(result.success).toBe(false);
  });

  test("rejects extra keys", () => {
    const result = createVenue.safeParse({
      venueName: "Test name",
      venueAddress: "Test address",
      openingTime: "09:00",
      closingTime: "17:30",
      capacity: 100,
      extraKey: true,
    });
    expect(result.success).toBe(false);
  });
});

describe("Update venue schema", () => {
  test("accepts if at least one value exists", () => {
    const result = updateVenue.safeParse({
      closingTime: "19:00",
    });
    expect(result.success).toBe(true);
  });

  test("accepts multiple values", () => {
    const result = updateVenue.safeParse({
      venueAddress: "New address",
      openingTime: "06:30",
      capacity: 20,
    });
    expect(result.success).toBe(true);
  });

  test("rejects empty objects", () => {
    const result = updateVenue.safeParse({});
    expect(result.success).toBe(false);
  });
});
