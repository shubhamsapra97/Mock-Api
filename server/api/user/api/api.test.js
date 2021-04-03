const request = require("supertest");
const app = require("../../../app");
const createUserLogic = require("../logic/logic");
jest.mock("../logic/logic", () => jest.fn());

describe("Api User Tests", () => {

    test("should throw bad request error if missing args", async () => {
        // Given
        expect.assertions(2);

        // When
        const response = await request(app)
            .post("/createUser")
            .send({
                email: "hello@gmail.com"
            });

        // Then
        expect(response.body).not.toBeNull();
        expect(response.body[0].message).toBe("Missing required arguments");
    });

    test("should return response from logic layer correctly", async () => {
        // Given
        expect.assertions(2);
        createUserLogic.mockReturnValue({
            status: 201,
            message: "user created successfully",
        });

        // When
        const response = await request(app)
            .post("/createUser")
            .send({
                email: "hello@gmail.com",
                password: "password",
            });

        // Then
        expect(response.body).not.toBeNull();
        expect(response.body[0].message).toBe("user created successfully");
    });

});