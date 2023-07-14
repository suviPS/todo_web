const DBHelper = require("../db/db.js");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.authRegister = asyncHandler(async(req, res, next) => {
    try {
        const email = req.bodyString("email");
        const password = req.bodyString("password");

        if (!(email && password)) {
            res.status(400).send("Missing input fields!");
            return
        }

        const user = await DBHelper.findUser(email.toLowerCase());
        if (user) {
            res.status(409).send("User already exists!");
            return
        }

        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS, 10));
        const encryptedPassword = await bcrypt.hash(password, salt);
        const newUser = await DBHelper.addUser(email, encryptedPassword);
        res.status(201).send("New user created!");
        console.log("New user created!")
    } catch (error) {
        res.status(500).send("Internal error: " + error);
        console.log(error);
    }
});

exports.authLogin = asyncHandler(async(req, res, next) => {
    try {
        const email = req.bodyString("email");
        const password = req.bodyString("password");
        if (!(email && password)) {
            res.status(400).send("Missing input fields!");
        }

        const user = await DBHelper.findUser(email.toLowerCase());
        if (!user) {
            res.status(401).send("Wrong login details!");
            return
        } else {
            const correctPassword = await bcrypt.compare(password, user.password);
            if (correctPassword) {
                const token = jwt.sign({ userId: user.id, time: Date.now() },
                    process.env.TOKEN_KEY, {
                        expiresIn: "48h",
                    }
                );
                await DBHelper.updateJwt(user, token);
                res.status(200).send({ token: token });
            } else {
                res.status(401).send("Wrong login details!");
            }
        }
    } catch (error) {
        res.status(500).send("Internal error: " + error);
        console.log(error);
    }
});