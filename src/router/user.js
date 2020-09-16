"use strict";
const Router = require("koa-router");
const userController = require("../controller/user")
const route = new Router();
route.post("/login", userController.login);
route.put("/", userController.register);
route.post("/queryById", userController.queryById);
route.post("/addStudent", userController.addStudent);
route.post("/updateStatus", userController.updateStatus);
// This must be the last one
module.exports = route;
