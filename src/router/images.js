"use strict";
const Router = require("koa-router");
const imageController = require("../controller/image")
const route = new Router();
route.post("/upload", imageController.upload);
route.post("/classify",imageController.classify);

module.exports = route;
