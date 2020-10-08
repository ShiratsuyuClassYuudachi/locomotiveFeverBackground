'use strict';
const mongodb = require('./mongodb')
module.exports = async app => {
    const dbList = {
        mongodb: await mongodb(app)
    };
    // eslint-disable-next-line require-atomic-updates
    app.db = Object.assign(dbList, app.db);

    return app;
};
