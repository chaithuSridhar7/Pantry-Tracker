const request = require("supertest");
const { app, pool } = require("../server");

afterAll(async () => {
  await pool.end();
});

describe("Pantry API", () => {

  it("GET /items should return all items", async () => {
    const res = await request(app).get("/items");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});