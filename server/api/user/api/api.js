const _ = require('lodash');
const router = require('express').Router();
const createUserLogic = require("../logic/logic");
const statusCode = require("../../../configurations/statusCodes");

//@route POST /createUser
//@description creates new user
router.post('/createUser' , async (req, res) => {

    const {email, password} = _.pick(
        req.body,
        ["email", "password"]
    );

    if (!email || !password) {
        return res.status(statusCode["UNSUCCESSFULL"]).json([{
            "message": "Missing required arguments",
        }]);
    }

    const {status, message} = await createUserLogic({email, password});
    return res.status(status).json([{
        "message": message,
    }]);

});

module.exports = router;