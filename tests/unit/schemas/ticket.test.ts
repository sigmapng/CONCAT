import { describe, expect, test } from "vitest";
import {
  createTicket,
  updateTicket,
} from "../../../src/schemas/ticket.schema.js";

describe("Create ticket schema", () => {
  test("accepts valid ticket data", () => {
    const result = createTicket.safeParse({
      bookingId: 3,
      ticketCategoryId: 4,
      qrCode: "vdsamkokiwoe32#om3n23",
      ticketStatus: "valid",
    });
    expect(result.success).toBe(true);
  });

  test("ticket status accepts only 'valid' case doesnt matter", () => {
    const result = createTicket.safeParse({
      bookingId: 3,
      ticketCategoryId: 4,
      qrCode: "vdsamkokiwoe32#om3n23",
      ticketStatus: "vAlId",
    });
    expect(result.success).toBe(true);
  });

  test("ticket status rejects every status except for 'valid' case doesnt matter", () => {
    const result = createTicket.safeParse({
      bookingId: 3,
      ticketCategoryId: 4,
      qrCode: "vdsamkokiwoe32#om3n23",
      ticketStatus: "created",
    });
    expect(result.success).toBe(false);
  });

  test("rejects without all required fields", () => {
    const result = createTicket.safeParse({
      bookingId: 3,
      ticketCategoryId: 4,
      ticketStatus: "valid",
    });
    expect(result.success).toBe(false);
  });

  test("rejects extra keys", () => {
    const result = createTicket.safeParse({
      bookingId: 3,
      ticketCategoryId: 4,
      qrCode: "vdsamkokiwoe32#om3n23",
      ticketStatus: "valid",
      extraKey: true,
    });
    expect(result.success).toBe(false);
  });

  test("rejects non numerical id values", () => {
    const result = createTicket.safeParse({
      bookingId: "id",
      ticketCategoryId: "id",
      qrCode: "vdsamkokiwoe32#om3n23",
      ticketStatus: "valid",
    });
    expect(result.success).toBe(false);
  });
});

describe("Update ticket schema", () => {
  test("accepts if at least one value exists", () => {
    const result = updateTicket.safeParse({
      ticketStatus: "used",
    });
    expect(result.success).toBe(true);
  });

  test("ticket status accepts only valid | used | cancelled, case doesnt matter", () => {
    const result = updateTicket.safeParse({
      ticketStatus: "CaNCeLleD",
    });
    expect(result.success).toBe(true);
  });

  test("rejects everything except for ticket status value", () => {
    const result = updateTicket.safeParse({
      qrCode: "vdsamkokiwoe32#om3n23",
    });
    expect(result.success).toBe(false);
  });

  test("rejects empty objects", () => {
    const result = updateTicket.safeParse({});
    expect(result.success).toBe(false);
  });
});
