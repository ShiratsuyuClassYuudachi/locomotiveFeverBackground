"use strict";
const log = require("./log");
const person = require("./person");
module.exports = app => {
    let modelList = {
        Log: log(app),
        Person: person(app),
    };
    
    app.model = Object.assign(modelList, app.model);

    return app;
};
