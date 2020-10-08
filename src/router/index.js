"use strict";
let Router = require("koa-router");
let route = new Router();
const config = require("../../config/config");
const user = require("./user");
route.use(config.baseURL + "user", user.routes(), user.allowedMethods());
// Put your route here

module.exports = route;
