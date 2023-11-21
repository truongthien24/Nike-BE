const express = require("express");
const { postCreateUser, loginUser, getAllUser } = require("../controllers/user.controller");

const router = express.Router();

/** 
 * @openapi
 * /create-user:
 *  post:
 *     tag: 
 *      -Create User
 *     summary: Create a user
 *     requestBody:
 *       required: true
 *       contents: 
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/LoginUserDto'
 */

router.post("/create-user", postCreateUser);

router.post("/login-user", loginUser);

router.get("/getAllUser", getAllUser)

module.exports = router;


// *     description: Responds
// *     responses: 
// *        200:
// *          description: App running