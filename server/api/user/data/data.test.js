const {
    findOneUser,
    createUser,
} = require("./data");
const {
    getDb,
    getClient,
    connectToMongoServer
} = require("../../../utils/mongoUtil");
const {MONGO_DB_TEST} = require("../../../configurations/config");

describe("Data Layer Tests", () => {
    beforeAll(async () => {
        await connectToMongoServer({
            url: global.__MONGO_URI__,
            db_name: MONGO_DB_TEST
        });
    });

    afterEach(async (done) => {
        await getDb().collection("users").deleteMany({});
        done();
    });

    afterAll(async (done) => {
        await getDb().dropDatabase();
        getClient().close();
        done();
    });

    test("user should be created successfully", async () => {
        // Given
        expect.assertions(2);
        await createUser({email: "helloWorld@gmail.com"});

        // When
        const user = await findOneUser({email: "helloWorld@gmail.com"});

        // Then
        expect(user).not.toBeNull();
        expect(user.email).toBe("helloWorld@gmail.com");
    });

    test("findOneUser should not return record if user not present", async () => {
        // Given
        expect.assertions(1);

        // When
        const user = await findOneUser({email: "helloWorld@gmail.com"});

        // Then
        expect(user).toBeNull();
    });

});