const createUserLogic = require("./logic");
const {
    findOneUser,
    createUser,
} = require("../data/data");

jest.mock("../data/data", () => ({
    findOneUser: jest.fn(),
    createUser: jest.fn(),
}));

describe("Test User Logic", () => {

    test("should throw bad request error if msising args", async () => {
        // Given
        expect.assertions(2);
        findOneUser.mockReturnValue({
            _id: "TheObjectId",
            email: "helloShubham@gmail.com"
        });
        createUser.mockReturnValue({});

        // When
        const result = await createUserLogic({
            email: "hello@gmail.com",
        });

        // Then
        expect(result).not.toBeNull();
        expect(result.message).toBe("Missing required arguments");
    });

    test("user should not be created if already present", async () => {
        // Given
        expect.assertions(2);
        findOneUser.mockReturnValue({
            _id: "TheObjectId",
            email: "helloShubham@gmail.com"
        });
        createUser.mockReturnValue({});

        // When
        const result = await createUserLogic({
            email: "hello@gmail.com",
            password: "password",
        });

        // Then
        expect(result).not.toBeNull();
        expect(result.message).toBe("User already exists!");
    });

    test("should create new user if not already present", async () => {
        // Given
        expect.assertions(2);
        findOneUser.mockReturnValue(null);
        createUser.mockReturnValue({});

        // When
        const result = await createUserLogic({
            email: "hello@gmail.com",
            password: "password",
        });

        // Then
        expect(result).not.toBeNull();
        expect(result.message).toBe("User created successfully!");
    });

});