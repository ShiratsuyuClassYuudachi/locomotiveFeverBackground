"use strict";
let Router = require("koa-router");
let route = new Router();
const config = require("../../config/config");
const user = require("./user");
const images = require("./images");
route.use(config.baseURL + "user", user.routes(), user.allowedMethods());
route.use(config.baseURL + "images", images.routes(), user.allowedMethods());
// Put your route here

module.exports = route;
