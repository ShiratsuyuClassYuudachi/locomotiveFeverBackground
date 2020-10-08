"use strict";
module.exports = {
    redisDB: global.process.env.CONFIG_REDIS_DB || "redis://127.0.0.1:6379/",
    debug: global.process.env.CONFIG_DEBUG || false,
    db: global.process.env.CONFIG_MONGODB_SERVER || "mongodb://127.0.0.1:27017/locomotivefever",
    baseURL: global.process.env.CONFIG_BASEURL || "/api/",
    host: global.process.env.CONFIG_HOST || "127.0.0.1",
    port: global.process.env.CONFIG_PORT || 10081,
    enableLog: global.process.env.CONFIG_ENABLELOG || true
};
