import { describe, expect, test } from "vitest";
import {
  createTicketCategory,
  updateTicketCategory,
} from "../../../src/schemas/ticket_category.schema.js";

describe("Create Ticket category", () => {
  test("accepts valid ticket category data", () => {
    const result = createTicketCategory.safeParse({
      eventId: 3,
      ticketName: "Pit",
      price: 450,
      totalAmount: 150,
      available: 100,
    });
    expect(result.success).toBe(true);
  });

  test("accepts equal total amount and available number", () => {
    const result = createTicketCategory.safeParse({
      eventId: 3,
      ticketName: "Pit",
      price: 450,
      totalAmount: 100,
      available: 100,
    });
    expect(result.success).toBe(true);
  });

  test("rejects non numerical id values", () => {
    const result = createTicketCategory.safeParse({
      eventId: "id",
      ticketName: "Pit",
      price: 450,
      totalAmount: 150,
      available: 100,
    });
    expect(result.success).toBe(false);
  });

  test("rejects extra keys", () => {
    const result = createTicketCategory.safeParse({
      eventId: 3,
      ticketName: "Standing",
      price: 450,
      totalAmount: 150,
      available: 100,
      extraKey: true,
    });
    expect(result.success).toBe(false);
  });

  test("rejects without all required fields", () => {
    const result = createTicketCategory.safeParse({
      ticketName: "Seat",
      totalAmount: 230,
    });
    expect(result.success).toBe(false);
  });

  test("rejects if total amount of tickets is smaller than the available number", () => {
    const result = createTicketCategory.safeParse({
      eventId: 3,
      ticketName: "Pit",
      price: 450,
      totalAmount: 50,
      available: 100,
    });
    expect(result.success).toBe(false);
  });

  test("rejects negative available number", () => {
    const result = createTicketCategory.safeParse({
      eventId: 3,
      ticketName: "Pit",
      price: 450,
      totalAmount: 50,
      available: -300,
    });
    expect(result.success).toBe(false);
  });

  test("rejects negative totalAmount", () => {
    const result = createTicketCategory.safeParse({
      eventId: 3,
      ticketName: "Pit",
      price: 450,
      totalAmount: -100,
      available: -100,
    });
    expect(result.success).toBe(false);
  });
});

describe("Update Ticket Category", () => {
  test("accepts if at least one value exists", () => {
    const result = updateTicketCategory.safeParse({
      price: 1000,
    });
    expect(result.success).toBe(true);
  });

  test("accepts multiple values", () => {
    const result = updateTicketCategory.safeParse({
      eventId: 15,
      price: 3400,
    });
    expect(result.success).toBe(true);
  });

  test("accepts if either available number or total amount value is passed", () => {
    const result = updateTicketCategory.safeParse({
      totalAmount: 640,
    });
    expect(result.success).toBe(true);
  });

  test("rejects empty objects", () => {
    const result = updateTicketCategory.safeParse({});
    expect(result.success).toBe(false);
  });

  test("rejects if total amount or available is not a number", () => {
    const result = updateTicketCategory.safeParse({
      available: "ten",
    });
    expect(result.success).toBe(false);
  });
});
