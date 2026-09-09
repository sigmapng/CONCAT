import { describe, expect, test } from "vitest";
import {
  createPayment,
  updatePayment,
} from "../../../src/schemas/payment.schema.js";

describe("Create payment schema", () => {
  test("accepts valid payment data", () => {
    const result = createPayment.safeParse({
      bookingId: 3,
      method: "Card",
      checkoutAmount: 1500,
      paymentStatus: "Pending",
    });
    expect(result.success).toBe(true);
  });

  test("payment status accepts only 'pending' case doesnt matter", () => {
    const result = createPayment.safeParse({
      bookingId: 3,
      method: "google pay",
      checkoutAmount: 1500,
      paymentStatus: "PeNDinG",
    });
    expect(result.success).toBe(true);
  });

  test("payment status rejects every status except for 'pending' case doesnt matter", () => {
    const result = createPayment.safeParse({
      bookingId: 3,
      method: "google pay",
      checkoutAmount: 1500,
      paymentStatus: "cancelled",
    });
    expect(result.success).toBe(false);
  });

  test("rejects without all required fields", () => {
    const result = createPayment.safeParse({
      method: "apple pay",
      checkoutAmount: 10,
    });
    expect(result.success).toBe(false);
  });

  test("rejects extra keys", () => {
    const result = createPayment.safeParse({
      bookingId: 2,
      method: "master card",
      checkoutAmount: 1500,
      paymentStatus: "Pending",
      extraKey: true,
    });
    expect(result.success).toBe(false);
  });

  test("rejects non numerical id values", () => {
    const result = createPayment.safeParse({
      bookingId: "id",
      method: "master card",
      checkoutAmount: 1500,
      paymentStatus: "Pending",
    });
    expect(result.success).toBe(false);
  });
});

describe("Update payment schema", () => {
  test("accepts if at least one value exists", () => {
    const result = updatePayment.safeParse({
      method: "google pay",
    });
    expect(result.success).toBe(true);
  });

  test("accepts multiple values", () => {
    const result = updatePayment.safeParse({
      bookingId: 4,
      paymentStatus: "succeeded",
    });
    expect(result.success).toBe(true);
  });

  test("booking status accepts only pending | succeeded | failed, case doesnt matter", () => {
    const result = updatePayment.safeParse({
      paymentStatus: "FaiLED",
    });
    expect(result.success).toBe(true);
  });

  test("booking status rejects everything except for pending | succeeded | failed, case doesnt matter", () => {
    const result = updatePayment.safeParse({
      paymentStatus: "created",
    });
    expect(result.success).toBe(false);
  });

  test("rejects empty objects", () => {
    const result = updatePayment.safeParse({});
    expect(result.success).toBe(false);
  });

  test("rejects update of checkout amount", () => {
    const result = updatePayment.safeParse({
      checkoutAmount: 150,
    });
    expect(result.success).toBe(false);
  });
});
