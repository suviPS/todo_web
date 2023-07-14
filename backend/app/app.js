const express = require("express");
const bodyParser = require("body-parser");
const sanitize = require('sanitize');
const cors = require('cors');
require("dotenv").config();

const setRouter = require("./router/router.js");
const DBHelper = require("./db/db.js");

const app = express();
app.use(bodyParser.json());
app.use(sanitize.middleware);
app.use(cors({
    origin: "*"
}))
setRouter(app);

module.exports = app;