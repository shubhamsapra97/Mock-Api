const bcrypt = require('bcrypt');
const {
    BCRYPT_SALT_ROUNDS,
} = require("../../../configurations/config");
const {
    createUser,
    findOneUser,
} = require("../data/data");
const statusCode = require("../../../configurations/statusCodes");

const generatePasswordHash = async (password) => {
    return await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
}

const createUserLogic = async ({
    email,
    password,
}) => {

    if (!email || !password) {
        return {
            status: statusCode["UNSUCCESSFULL"],
            message: "Missing required arguments",
        }
    }

    try {
        const userDetails = await findOneUser({email});
        if (!userDetails) {
            const passwordHash = await generatePasswordHash(password);
            await createUser({
                email,
                password: passwordHash,
            });

            return {
                status: statusCode["CREATED"],
                message: "User created successfully!",
            }
        } else {
            return {
                status: statusCode["UNSUCCESSFULL"],
                message: "User already exists!",
            }
        }
    } catch {
        return {
            status: statusCode["INTERNAL_ERROR"],
            message: "Something went wrong!",
        }
    }
}

module.exports = createUserLogic;
