"use strict";
module.exports = app => {
    const {
        mongodb
    } = app.db;
    const {
        Schema
    } = mongodb;
    const personSchema = new Schema({
        Email: String,
        Secret: String,
        Name: String,
        UUID: String,
        Role: {
            type: String,
            enum: [
                "User",
                "Admin",
                "Owner"
            ]
        },
        Tag: [String],
        Images: [String],
        JoinDate: String
    }, {
        discriminatorKey: 'kind'
    });
    // eslint-disable-next-line newline-before-return
    return mongodb.model("person", personSchema);
};
