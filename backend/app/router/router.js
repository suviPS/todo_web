const express = require("express");
const router = express.Router();

const auth = require("./authRouter.js");
const todo = require("./todoRouter.js");

const setRouter = function(app) {
    app.use("/api/auth", auth);
    app.use("/api/todo", todo);
}

module.exports = setRouter;