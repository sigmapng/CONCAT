import { describe, expect, test } from "vitest";
import { createUser, updateUser } from "../../../src/schemas/users.schema.js";

describe("Create user schema", () => {
  test("accepts valid user data", () => {
    const result = createUser.safeParse({
      username: "user",
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      password: "Password1$3",
      birthDate: "2000-01-01",
    });
    expect(result.success).toBe(true);
  });

  test("reject if username is not in lowercase", () => {
    const result = createUser.safeParse({
      username: "USER",
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      password: "Password1$3",
      birthDate: "2000-01-01",
    });
    expect(result.success).toBe(false);
  });

  test("rejects invalid email format, valid format look like this: test@gmail.com", () => {
    const result = createUser.safeParse({
      username: "user",
      firstName: "John",
      lastName: "Doe",
      email: "johndoe.email",
      password: "Password1$3",
      birthDate: "2000-01-01",
    });
    expect(result.success).toBe(false);
  });

  test("rejects if password doesn't meet the critetia, which is: minimum 8 characters, maximum 100 characters; includes: an uppercase letter, a lowercase letter, a number, a special character", () => {
    const result = createUser.safeParse({
      username: "user",
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      password: "password",
      birthDate: "2000-01-01",
    });
    expect(result.success).toBe(false);
  });

  test("rejects without all required fields", () => {
    const result = createUser.safeParse({
      username: "user",
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      birthDate: "2000-01-01",
    });
    expect(result.success).toBe(false);
  });

  test("rejects extra keys", () => {
    const result = createUser.safeParse({
      username: "user",
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      password: "Password1$3",
      birthDate: "2000-01-01",
      extraKey: true,
    });
    expect(result.success).toBe(false);
  });
});

describe("Update user schema", () => {
  test("accepts if at least one value exists", () => {
    const result = updateUser.safeParse({
      lastName: "Doe",
    });
    expect(result.success).toBe(true);
  });

  test("accepts multiple values", () => {
    const result = updateUser.safeParse({
      firstName: "Alice",
      lastName: "Doe",
    });
    expect(result.success).toBe(true);
  });

  test("rejects empty objects", () => {
    const result = updateUser.safeParse({});
    expect(result.success).toBe(false);
  });

  test("rejects the change of username", () => {
    const result = updateUser.safeParse({
      username: "newusername",
    });
    expect(result.success).toBe(false);
  });

  test("rejects the change of email", () => {
    const result = updateUser.safeParse({
      email: "new@gmail.com",
    });
    expect(result.success).toBe(false);
  });

  test("rejects the change of password", () => {
    const result = updateUser.safeParse({
      password: "Password1$3",
    });
    expect(result.success).toBe(false);
  });
});
