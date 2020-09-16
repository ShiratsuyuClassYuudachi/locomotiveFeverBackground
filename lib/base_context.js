"use strict";

/**
 * @class
 */
class BaseContextClass {

    /**
     * @constructor
     * @param {Context} ctx - context instance
     * @since 1.0.0
     */
    constructor(ctx) {

        /**
         * @member {Context} BaseContextClass#ctx
         * @since 1.0.0
         */
        this.ctx = ctx;

        /**
         * @member {Application} BaseContextClass#app
         * @since 1.0.0
         */
        this.app = ctx.app;

        /**
         * @member {Config} BaseContextClass#config
         * @since 1.0.0
         */
        this.config = ctx.app.config;

        /**
         * @member {Model} BaseContextClass#model
         * @since 1.0.0
         */
        this.model = ctx.app.model;

        /**
         * @member {Database} BaseContextClass#datebase
         * @since 1.0.0
         */
        this.db = ctx.app.db;
    }
}
module.exports = BaseContextClass;
