"use strict";
let Auth = require("koa2-auth");
module.exports = () => {
    const auth = new Auth();
    auth.register("base", ctx => {
        if (!ctx.session.user) {
            ctx.throw(401, JSON.stringify({
                code: 419,
                msg: "令牌无效，请重新登录！"
            }))
        }
    });

    auth.register("Staff::base", ctx => {
        if (![
            "Merchant",
            "Admin",
            "System"
        ].includes(ctx.session.user.Role)) {
            ctx.throw(403, JSON.stringify({
                code: 403,
                msg: "Permission denied"
            }));
        }
    });

    auth.register("Student::base", ctx => {
        if (!ctx.session.user.Role) {
            ctx.throw(403, JSON.stringify({
                code: 403,
                msg: "Permission denied"
            }));
        }
    });

    auth.register("Student::Mutation", ctx => {
        if (![
            "Teacher",
            "Assist",
            "Sales",
            "Merchant",
            "Admin",
            "System"
        ].includes(ctx.session.user.Role)) {
            ctx.throw(403, JSON.stringify({
                code: 403,
                msg: "Permission denied"
            }));
        }
    });

    return auth;
}
