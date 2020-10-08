"use strict";
module.exports = app => {
    const {
        mongodb
    } = app.db;
    const {
        Schema
    } = mongodb;
    // eslint-disable-next-line newline-before-return
    return new Schema({
        Acc: Number,
        AllowRec: Boolean,
        Photo: [String]
    }, {
        discriminatorKey: 'kind'
    });
};
