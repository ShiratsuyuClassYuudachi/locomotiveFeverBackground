/* eslint-disable no-unused-vars */
"use strict";
const Redis = require("ioredis");
const config = require("../../config/config");
const { Store } = require("koa-session2");
class RedisStore extends Store {
    constructor() {
        super();
        this.redis = new Redis(config.redisDB);
    }

    async get(sid, _ctx) {
        // eslint-disable-next-line newline-after-var
        let data = await this.redis.get(`SESSION:${sid}`);

        return JSON.parse(data);
    }

    async set(session, { sid = this.getID(24), maxAge = 172800 } = {}, _ctx) {
        try {
            // Use redis set EX to automatically drop expired sessions
            await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000);
            // eslint-disable-next-line no-empty
        } catch (err) {}

        return sid;
    }

    async destroy(sid, _ctx) {

        // eslint-disable-next-line no-return-await
        return await this.redis.del(`SESSION:${sid}`);
    }
}

module.exports = RedisStore;
