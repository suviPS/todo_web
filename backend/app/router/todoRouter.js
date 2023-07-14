const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const todoController = require("../controller/todoController.js");

router.post("/create", auth, todoController.todoCreate);
router.post("/complete", auth, todoController.todoComplete);
router.post("/delete", auth, todoController.todoDelete);
router.get("/all", auth, todoController.findTodos);

module.exports = router;