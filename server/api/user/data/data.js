const {getDb} = require("../../../utils/mongoUtil");

const findOneUser = async (args) => {
    try {
        return await getDb().collection("users").findOne({...args});
    } catch {
        throw "error fetching user";
    }
}

const createUser = async ({email, password}) => {
    try {
        return await getDb().collection("users").insertOne({email, password});
    } catch {
        throw "error creating user";
    }
}

module.exports = {
    createUser,
    findOneUser,
};
