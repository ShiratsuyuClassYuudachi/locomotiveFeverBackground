/* eslint-disable max-lines-per-function */
/* eslint-disable require-atomic-updates */
"use strict";
const uuidV4 = require("uuid/v4");

const register = async ctx => {
    const {
        name,
        email,
        secret
    } = ctx.request.body;
    if (name && secret) {
        // eslint-disable-next-line no-constant-condition
        if (true) {
            let now = new Date();
            const newPerson = new ctx.app.model.User({
                Username:name,
                Email: email,
                Secret: secret,
                UUID: uuidV4(),
                JoinDate: now,
                LastLogin: now
            });
            try {
                await newPerson.save();
                ctx.response.status = 201;
            } catch (error) {
                ctx.response.status = 406;
                ctx.response.body = JSON.stringify(error);
            }

            return;
        }
    }
    ctx.response.status = 406;

};

const login = async (ctx, next) => {
    const { email, passwd } = ctx.request.body;
    if (email && passwd) {
        const result = await ctx.app.model.Person.findOne({
            Email: email,
            Secret: passwd
        });
        if (result) {
            ctx.response.body = JSON.stringify({
                code: 200,
                msg: "用户名："+result.Username
            });
            ctx.session.user = result;
            return next();
        }
        ctx.response.status = 401;
        ctx.response.body = JSON.stringify({
            code: 401,
            msg: "用户名和密码无效"
        });

        return next();
    }
    ctx.response.status = 401;
    ctx.response.body = JSON.stringify({
        code: 401,
        msg: "用户名和密码无效"
    });

    return next();
};

module.exports = {
    register,
    login
};
