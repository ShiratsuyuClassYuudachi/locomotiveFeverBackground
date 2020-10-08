/* eslint-disable no-invalid-this */
"use strict";
module.exports = app => {
    const {
        mongodb
    } = app.db;
    const {
        Schema
    } = mongodb;
    const logSchema = new Schema({
        time: {
            type: Date,
            default: Date.now
        },
        level: {
            type: String,
            enum: [
                "info",
                "warning",
                "error",
                "debug",
                "unknown"
            ]
        },
        message: String
    });
    logSchema.static("write", function (msg, level) {
        // Default log level
        let logLevel = "unknown";
        if (level === "error" || level === "info" || level === "warning" || level === "debug") {
            logLevel = level;
        }
        const toWrite = new this({
            message: msg,
            level: logLevel
        })
        toWrite.save();
    });

    return mongodb.model("log", logSchema);
};
