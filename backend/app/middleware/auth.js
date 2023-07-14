const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["Authorization"] || req.headers["authorization"];

    if (!token) {
        console.log("No token")
        console.log(req.headers)
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
        console.log("Decoded:")
        console.log(decoded)
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
}

module.exports = verifyToken;