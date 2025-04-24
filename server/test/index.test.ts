import request from "supertest";
import { app } from "../src/index.js";

let server: any;

beforeAll(() => {
  server = app.listen(); // Start the server before running tests
});

afterAll(() => {
  server.close(); // Clean up the server after all tests
});

describe("GET /invalid-route", () => {
  it("should return a 404 status for an invalid route", async () => {
    const res = await request(app).get("/invalid");
    expect(res.statusCode).toEqual(404);
    expect(res.text).toEqual(
      "Method GET is not implemented on path /invalid. See server/src/index.ts for details.",
    );
  });
});

describe("GET /transactions", () => {
  it("should return a list of transactions", async () => {
    const res = await request(app).get("/transactions");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("length");
    expect(Array.isArray(res.body.data)).toBe(true);
    res.body.data.forEach((transaction: any) => {
      expect(transaction).toHaveProperty("transactionId");
    });
  });
});

describe.skip("GET /transactions/:transactionId", () => {
  it("should return 200 and a specific transaction if found", async () => {});
  it("should return 404 and empty json if transaction not found", async () => {});
});
