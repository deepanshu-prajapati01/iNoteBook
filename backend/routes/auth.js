const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

// for using the env variable
require('dotenv').config();

// jwt secret from .env
const JWT_SECRET = process.env.JWT_SECRET


// create this user using post request instead of using the get request.
// if using get request all data will be taken to the system via the url.
// this authentication is responsible for every type of data checking

////////////////////////////////////////////////////////////////////////////////////////////////////

// ^ ROUTE 1 - USED FOR SIGN UP -> /api/auth/signup -> credentials required!
router.post("/signup", [
    body('email', "This email is already taken!").isEmail(),
    body('name', "Name must contain at least 3 characters").isLength({ min: 3 }),
    body('password', "Password must be contain at least 8 characters.").isLength({ min: 8 })
], async (req, res) => {
    // check for the errors and return the error code 400 - Bad Request for bad request with appropriate message!
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check whether the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        } else {
            const salt = await bcrypt.genSalt(10);
            const securePassword = await bcrypt.hash(req.body.password, salt);
            // creating the user with name, email and secure password (by hashing)
            let user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securePassword
            });
            // this one is responsible for getting the id of the (entry) or user
            const data = {
                user: {
                    id: user.id
                }
            }
            // giving authToken via jwt 
            const authToken = jwt.sign(data, JWT_SECRET)
            res.json({ authToken })
        }
    } catch (error) {
        res.status(500).send("Internal error occurred!")
    }
})


////////////////////////////////////////////////////////////////////////////////////////////////////

// ^ ROUTE 2: USED TO LOGIN THE USER - /api/auth/login -> credentials required
router.post("/login", [
    body('email', "Enter email correctly!").isEmail()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        // to check for email in database, this will help to prevent further load
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ "Error": "Please login with correct credentials!" })
        }
        // compare password via hashing the user's given password to the database!
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(400).json({ "Error": "Please login with correct credentials!" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        // giving authToken via jwt 
        const authToken = jwt.sign(data, JWT_SECRET)
        res.json({ authToken })
    } catch (error) {
        res.status(500).send("Internal server error!")
    }
})

////////////////////////////////////////////////////////////////////////////////////////////////////

// ^ROUTE 3: To make the user stay login by checking his auth token from the header -> 'auth-token'
// ^ This route is /api/auth/getuser -> needs auth-token to verify correct login
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        res.status(500).send("Internal server error!")
    }
})




////////////////////////////////////////////////////////////////////////////////////////////////////


module.exports = router;