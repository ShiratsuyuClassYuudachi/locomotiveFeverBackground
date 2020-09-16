"use strict";
const Service = require("../../lib/base_context");
const { curry } = require("lodash-fp");
class logger extends Service {

    /**
     * The writeLog function
     * @returns {void}
     * @param {String} level Log level, enum from "error", "info", "warning","debug".
     * @param {String} msg Log message
     */
    write(level, msg) {
        // Default log level
        this.app.model.Log.write(msg, level);
    }

    /* Following are some curry functions.*/
    writeWarning(msg) {
        return curry(this, this.write("warning", msg));
    }

    writeInfo(msg) {
        return curry(this, this.write("info", msg));
    }

    writeError(msg) {
        return curry(this, this.write("error", msg));
    }
}
module.exports = logger;
