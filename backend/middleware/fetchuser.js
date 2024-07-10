const jwt = require("jsonwebtoken");
// for using the env variable
require('dotenv').config();

// jwt secret from .env
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
    const token = req.header("auth-token")

    if (!token) {
        res.status(401).send("Please authenticate using a valid token!")
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send("Please authenticate using a valid email!")

    }
}


module.exports = fetchuser; 