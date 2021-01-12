"use strict";
const log = require("./log");
const person = require("./person");
const result = require("./result")
module.exports = app => {
    let modelList = {
        Log: log(app),
        Person: person(app),
    };
    modelList = {
        User: modelList.Person.discriminator("user", require("./user")(app)),
        Admin: modelList.Person.discriminator("admin", require("./admin")(app)),
        Result: modelList.Result,
        ...modelList
    };
    app.model = Object.assign(modelList, app.model);

    return app;
};
