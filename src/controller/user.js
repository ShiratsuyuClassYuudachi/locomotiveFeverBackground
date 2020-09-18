/* eslint-disable max-lines-per-function */
/* eslint-disable require-atomic-updates */
"use strict";
const uuidV4 = require("uuid/v4");

const register = async ctx => {
    const {
        email,
        name,
        secret
    } = ctx.request.body;
    if (name && secret && email) {
        // eslint-disable-next-line no-constant-condition
        if (true) {
            var myDate = new Date;
            const newPerson = new ctx.app.model.Person({
                Name: name,
                Role: "User",
                Secret: secret,              
                Time:myDate.toLocaleDateString()
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
    const { name, passwd } = ctx.request.body;
    if (name && passwd) {
        const result = await ctx.app.model.Person.findOne({
            Name: name,
            Secret: passwd
        });
        if (result) {
            ctx.response.status = 200;
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

const addStudent = async ctx => {
    await ctx.auth.must("base");
    let { name } = ctx.request.body;
    const currentUser = ctx.session.user.Name;
    const newStudent = new ctx.app.model.Customer({
        Role: "Customer",
        Secret: "1",
        Name: name,
        Leader: currentUser,
        Health: "Health",
        Position: "plain",
        Time: "plain"
    })
    try {
        await newStudent.save();
        ctx.response.status = 201;
    } catch (error) {
        ctx.response.status = 406;
    }

}

const queryById = async ctx => {
    await ctx.auth.must("base");
    let result = [];
    if (["Teacher"].includes(ctx.session.user.Role)) {
        result = await ctx.app.model.Customer.find(
            {
                "Role": "Customer",
                "Leader": ctx.session.user.Name
            },
            {
                Name: 1,
                Position: 1,
                Health: 1,
                Time: 1
            }
       )
    } else if ("Headmaster".includes(ctx.session.user.Role)) {
        result = await ctx.app.model.Customer.find(
            {
                "Role": "Teacher"
            },
            {
                Name: 1,
                Position: 1,
                Health: 1,
                Time: 1
            }
        )
    }
    if (result) {
        ctx.response.status = 200;
        ctx.response.body = JSON.stringify(result);
    }
};

const updateStatus = async ctx => {
    const {
        name,
        time,
        position,
        health
    } = ctx.request.body;
    try {
        const pos = ctx.app.model.Person.find({ Name: name }).Role;
        await ctx.app.model.Customer.findOneAndUpdate(
            {
                Name: name
            },
            {
                Time: time,
                Health: health,
                Position: position
            }
        )
        await ctx.app.model.Teacher.findOneAndUpdate(
            {
                Name: name
            },
            {
                Time: time,
                Health: health,
                Position: position
            }
        )
        ctx.response.status = 201;
    } catch (error) {
        ctx.response.status = 406;
    }
}
module.exports = {
    register,
    login,
    queryById,
    addStudent,
    updateStatus
};
