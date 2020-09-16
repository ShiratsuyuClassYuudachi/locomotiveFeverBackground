/* eslint-disable require-await */
"use strict";

// This load all service to the ctx

module.exports = async(ctx, next) => {
    const serviceFactory = ServiceName => new ServiceName(ctx);
    const serviceList = {
        example: serviceFactory(require("./example")),
        log: serviceFactory(require("./logger"))

        /* Put new Services here */
    };
    ctx.service = { ...serviceList };

    return next();
}
