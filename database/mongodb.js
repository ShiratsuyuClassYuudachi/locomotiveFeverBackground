"use strict";
const mongoose = require("mongoose");
module.exports = app => mongoose.connect(app.config.db, {
    autoIndex: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => {
    console.log("Can't connect to database.");
    console.error(`Details: ${err.message}`);
    global.process.exit(-1);
});
