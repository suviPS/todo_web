const DBHelper = require("../db/db.js");
const asyncHandler = require("express-async-handler");

exports.todoCreate = asyncHandler(async(req, res, next) => {
    try {
        const userId = req.user.userId;
        if (!userId) {
            res.status(401).send("Unautorised!");
            return
        }

        const content = req.bodyString("content");
        if (!content) {
            res.status(400).send("No content!");
            return
        }

        const todo = await DBHelper.createTodo(userId, content);
        res.status(201).send(todo);
    } catch (error) {
        res.status(500).send("Internal error: " + error);
        console.log(error);
    }
});

exports.todoComplete = asyncHandler(async(req, res, next) => {
    try {
        const userId = req.user.userId;
        if (!userId) {
            res.status(401).send("Unautorised!");
            return
        }

        const todoId = req.bodyString("id");
        if (!todoId) {
            res.status(400).send("No id!");
            return
        }

        const todo = await DBHelper.completeTodo(todoId);
        res.status(200).send("Completed");
    } catch (error) {
        res.status(500).send("Internal error: " + error);
        console.log(error);
    }
});

exports.todoDelete = asyncHandler(async(req, res, next) => {
    try {
        const userId = req.user.userId;
        if (!userId) {
            res.status(401).send("Unautorised!");
            return
        }

        const todoId = req.bodyString("id");
        if (!todoId) {
            res.status(400).send("No id!");
            return
        }

        const todo = await DBHelper.deleteTodo(todoId);
        res.status(200).send("Deleted");
    } catch (error) {
        res.status(500).send("Internal error: " + error);
        console.log(error);
    }
});

exports.findTodos = asyncHandler(async(req, res, next) => {
    try {
        const userId = req.user.userId;
        if (!userId) {
            res.status(401).send("Unautorised!");
            return
        }

        const todos = await DBHelper.findTodos(userId);
        res.status(200).send(todos);
    } catch (error) {
        res.status(500).send("Internal error: " + error);
        console.log(error);
    }
});