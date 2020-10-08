/* eslint-disable newline-after-var */
"use strict";
module.exports = app => {
    const {
        mongodb
    } = app.db;
    const {
        Schema
    } = mongodb;

    return new Schema({
        CtrlLevel: Number
    }, {
        discriminatorKey: 'kind'
    });
};
