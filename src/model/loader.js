"use strict";
const log = require("./log");
const person = require("./person");
module.exports = app => {
    let modelList = {
        Log: log(app),
        Person: person(app),
    };
    modelList = {
        Customer: modelList.Person.discriminator("customer", require("./customer")(app)),
        Staff: modelList.Person.discriminator("staff", require("./staff")(app)),
        Teacher: modelList.Person.discriminator("teacher", require("./teacher")(app)),
        Headmaster: modelList.Person.discriminator("headmaster", require("./headmaster")(app)),
        ...modelList
    };
    app.model = Object.assign(modelList, app.model);

    return app;
};
