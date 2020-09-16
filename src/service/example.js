"use strict";
const Service = require("../../lib/base_context");
class exampleService extends Service {
    constructor(ctx) {
        super(ctx);
        this.name = "example";
    }

    /**
     * @returns {string} return helloWorld!
     * @param {string} param1 param1
     */
    helloWord(param1) {
        console.log(this.name + "helloWorld" + param1);

        return "helloWorld";
    }
}
module.exports = exampleService;
