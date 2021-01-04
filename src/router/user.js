"use strict";
const Router = require("koa-router");
const userController = require("../controller/user")
const route = new Router();
route.post("/login", userController.login);
route.put("/", userController.register);
// This must be the last one
module.exports = route;
