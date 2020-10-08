"use strict";
module.exports = app => {
    const {
        mongodb
    } = app.db;
    const {
        Schema
    } = mongodb;
    const personSchema = new Schema({
        Username: String,
        Email: String,
        Secret: String,
        UUID: String,
        JoinDate: Date,
        LastLogin: Date
    }, {
        discriminatorKey: 'kind'
    });
    // eslint-disable-next-line newline-before-return
    return mongodb.model("person", personSchema);
};
